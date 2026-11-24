// Independent, dependency-free labs. Each run function also works in Node.js.
window.lessons = [
  {
    title: "Agent fundamentals", level: "Beginner",
    intro: "Follow a goal from the first decision to a tool result and a final answer.",
    concept: "An agent combines a decision policy, a set of permitted actions and state that records what happened. A language model can supply the policy. Your application still executes the selected action, appends the observation and decides when to stop. This experiment substitutes a fixed policy so you can inspect every transition. Notice what happens when the glossary has no entry.",
    diagram: ["Read goal", "Choose lookup", "Observe result", "Answer or abstain"],
    exercise: "Run the lookup for checkpoint and then for glacier. Add a glossary entry for state. Which part of the loop changes when you run the new query?",
    solution: "Add state: 'The current facts and history for one run.' to the glossary. The lookup observation and final answer change. The policy still selects lookup and the two-step limit still applies.",
    quiz: "A tool repeatedly returns no result. What should bound the run?",
    choices: ["A larger context window", "An explicit stopping rule and step budget", "A more detailed tool name"], answer: 1,
    why: "The runner can stop after a fixed number of transitions or an unresolved observation, even if the model keeps proposing actions.",
    framework: "Start with this plain loop. Move to LangChain create_agent when you want a model to select among several tools and pass observations back across turns.",
    project: "Build a glossary tutor for five terms from your study repository. Save traces for a known term, a miss and a repeated request. Require the tutor to abstain on a miss.",
    ref: ["Anthropic · Building effective agents", "https://www.anthropic.com/research/building-effective-agents"],
    input: "checkpoint",
    run: function run(input) {
      const glossary = { checkpoint: "A saved snapshot used to resume a run.", tool: "A callable operation exposed to an agent." };
      const term = input.trim().toLowerCase();
      const trace = [];
      let observation;
      for (let step = 0; step < 2; step++) {
        if (step === 0) {
          observation = Object.hasOwn(glossary, term) ? glossary[term] : null;
          trace.push({ action: "lookup", term, observation });
        } else {
          trace.push({ action: observation ? "answer" : "abstain", text: observation ?? "No glossary entry." });
        }
      }
      return trace;
    }
  },
  {
    title: "Tool calling", level: "Beginner",
    intro: "Turn a proposed tool call into a checked operation with a predictable result.",
    concept: "A tool contract names an operation and describes its arguments. The application parses the proposal, validates types and allowed values, checks the caller’s permissions and only then invokes the handler. Return a structured failure that the agent can act on. This read-only example searches a tiny catalog and validates the page size before touching it.",
    diagram: ["Proposed call", "Validate arguments", "Run handler", "Return evidence"],
    exercise: "Set limit to the string '2', then to 0. Explain both failures. Add a term of your own to the catalog and request one result.",
    solution: "A quoted number fails the integer check and 0 falls outside the 1–3 range. Add 'retrieval' to the catalog and search for 'retr' with limit 1 to retrieve it.",
    quiz: "A generated tool call includes a valid query and limit: 1000. Where should the maximum be enforced?",
    choices: ["Only in the tool description", "After returning all rows", "At the application boundary before lookup"], answer: 2,
    why: "Runtime checks apply to every call, including arguments the model generated incorrectly.",
    framework: "LangChain exposes tools through typed functions. Describe when each tool helps, validate again where external effects occur, and retain the tool-call ID when returning a result to the model.",
    project: "Expose a search_notes tool over local Markdown titles. Add cases for an unknown tool, malformed JSON, unexpected fields and an empty result.",
    ref: ["LangChain · Agents and tools", "https://docs.langchain.com/oss/python/langchain/agents"],
    input: '{"name":"search","query":"agent","limit":2}',
    run: function run(input) {
      let call;
      try { call = JSON.parse(input); } catch { return { error: "Expected a JSON object." }; }
      if (!call || call.name !== "search") return { error: "Unknown tool." };
      if (Object.keys(call).some(key => !["name", "query", "limit"].includes(key))) return { error: "Unexpected argument." };
      if (typeof call.query !== "string" || !call.query.trim()) return { error: "Supply a nonempty query." };
      if (!Number.isInteger(call.limit) || call.limit < 1 || call.limit > 3) return { error: "limit must be an integer from 1 to 3." };
      const catalog = ["agent loop", "agent state", "agent handoff", "checkpoint"];
      return { results: catalog.filter(title => title.includes(call.query.trim().toLowerCase())).slice(0, call.limit) };
    }
  },
  {
    title: "Orchestration", level: "Intermediate",
    intro: "Route work with explicit state, checkpoints and a human approval boundary.",
    concept: "A graph assigns each operation to a node. An edge chooses the next node using state, such as whether a draft has approval. A checkpoint saves the state needed to continue. In production, a crash can occur after an external write and before the next checkpoint. Give writes stable operation IDs and make the destination handle duplicates.",
    diagram: ["Draft", "Checkpoint", "Await decision", "Publish or discard"],
    exercise: "Run a pending decision. Copy the returned checkpoint into the input and change decision to approve. Try reject on a fresh pending checkpoint.",
    solution: "The checkpoint carries the draft and its operation ID. Approve advances it to published. Reject advances it to discarded. A terminal checkpoint stays terminal when run again.",
    quiz: "A worker exits after publishing and before saving its checkpoint. What protects a resumed run from a duplicate write?",
    choices: ["An idempotency key enforced by the destination", "A longer prompt", "A larger step budget"], answer: 0,
    why: "Replaying the same operation ID allows the destination to return the previous outcome.",
    framework: "Use LangGraph StateGraph for explicit nodes and conditional edges. Add a persistent checkpointer and a stable thread ID for resumable runs. Use an interrupt for approval before an external write.",
    project: "Build a note-publishing graph. Persist checkpoints in SQLite, terminate the worker at each boundary, resume it and assert that only one note exists per operation ID.",
    ref: ["LangGraph · Graph execution and durable workflows", "https://docs.langchain.com/oss/python/langgraph/overview"],
    input: '{"id":"note-7","draft":"Explain checkpoints","stage":"review","decision":"pending"}',
    run: function run(input) {
      const state = JSON.parse(input);
      if (!state?.id || !state.draft) return { error: "Supply an id and a draft." };
      if (["published", "discarded"].includes(state.stage)) return { checkpoint: state, event: "Already complete" };
      if (state.stage !== "review") return { error: "Expected a review checkpoint." };
      const routes = { pending: "review", approve: "published", reject: "discarded" };
      if (!Object.hasOwn(routes, state.decision)) return { error: "Use pending, approve or reject." };
      return { checkpoint: { ...state, stage: routes[state.decision] }, operationId: state.id };
    }
  },
  {
    title: "Multi-agent systems", level: "Intermediate",
    intro: "Give a specialist a bounded assignment and pass its evidence to a reviewer.",
    concept: "A handoff transfers responsibility for the next turn. In a manager pattern, the manager retains responsibility and requests a specialist result. Define the handoff payload, the owner of each decision and the conditions for returning. The lab models a researcher and reviewer with fixed rules. Each handoff consumes a turn, including unsuccessful attempts.",
    diagram: ["Manager", "Researcher", "Reviewer", "Accept or request evidence"],
    exercise: "Remove source and run with budget 2. Increase the budget to 4. Why does extra coordination fail to produce evidence?",
    solution: "The researcher has no evidence source in either run. The reviewer returns the task until the budget expires. Attach a source or give the researcher a retrieval tool and record its result.",
    quiz: "Which payload gives a reviewer enough context to verify a claim?",
    choices: ["Only the previous agent’s name", "The claim, evidence and acceptance criteria", "The entire unrelated conversation"], answer: 1,
    why: "The reviewer needs the specific claim and evidence plus a shared definition of an acceptable result.",
    framework: "Use the OpenAI Agents SDK handoff when a specialist should own the conversation. Use a specialist as a tool when the manager needs to compare results before answering.",
    project: "Split a repo study assistant into a note finder and a citation reviewer. Compare one-agent and two-agent variants on ten questions using citation accuracy, turns and elapsed time.",
    ref: ["OpenAI Agents SDK · Handoffs", "https://openai.github.io/openai-agents-python/handoffs/"],
    input: '{"claim":"Checkpoints support resumption.","source":"notes/graphs.md#state","budget":3}',
    run: function run(input) {
      const { claim, source, budget } = JSON.parse(input);
      if (!claim || !Number.isInteger(budget) || budget < 1 || budget > 10) return { error: "Supply a claim and a turn budget from 1 to 10." };
      const trace = [];
      for (let turn = 0; turn < budget; turn++) {
        if (turn % 2 === 0) trace.push({ owner: "researcher", claim, source: source || null });
        else {
          trace.push({ owner: "reviewer", evidenceAttached: Boolean(source) });
          if (source) return { status: "ready for source verification", trace };
        }
      }
      return { status: "budget exhausted", trace };
    }
  },
  {
    title: "Retrieval-augmented generation", level: "Intermediate",
    intro: "Retrieve evidence from notes and carry its source into the answer.",
    concept: "Indexing turns documents into addressable chunks. At query time, a retriever selects candidate chunks and a generator uses them as context. Keep the document and chunk IDs through generation so readers can inspect evidence. This lab uses lexical overlap and an extractive answer to make retrieval visible. Try a paraphrase with no shared keywords and inspect the failure.",
    diagram: ["Chunk notes", "Rank candidates", "Select evidence", "Cite answer"],
    exercise: "Run 'resume snapshot', then 'restart saved workflow'. Inspect the matched words. Add the synonym restart to the relevant note and rerun.",
    solution: "The first query shares words with the checkpoint note. The second initially misses. Adding a meaningful synonym improves recall on this small case. Hold out other paraphrases to check that the improvement generalizes.",
    quiz: "A grounded answer omits a needed fact because the relevant chunk never reached the prompt. Which component should you inspect first?",
    choices: ["The retriever and its chunk index", "The font used for citations", "The final answer’s word limit"], answer: 0,
    why: "Inspect candidate chunks and their ranks to determine where the evidence disappeared.",
    framework: "LlamaIndex provides ingestion, index and query components for document applications. Start with one retriever and inspect its top results before adding reranking or an agentic query planner.",
    project: "Index three study-ai Markdown files by heading. Write six questions with expected section IDs. Record retrieval hits, citation correctness and abstention on a question outside the notes.",
    ref: ["LlamaIndex · Introduction to RAG", "https://developers.llamaindex.ai/python/framework/understanding/rag/"],
    input: "resume snapshot",
    run: function run(input) {
      const notes = [
        { id: "graphs#checkpoint", text: "A checkpoint stores a snapshot so a run can resume." },
        { id: "tools#schema", text: "A schema defines valid arguments for a tool." },
        { id: "eval#recall", text: "Recall measures the fraction of relevant items retrieved." }
      ];
      const tokens = text => new Set(text.toLowerCase().match(/[a-z]+/g) || []);
      const query = tokens(input);
      const ranked = notes.map(note => ({ ...note, matches: [...tokens(note.text)].filter(word => query.has(word)) }))
        .filter(note => note.matches.length).sort((a, b) => b.matches.length - a.matches.length);
      return { answer: ranked[0]?.text ?? "Insufficient evidence.", citation: ranked[0]?.id ?? null, ranked };
    }
  },
  {
    title: "Vector and non-vector databases", level: "Intermediate",
    intro: "Compare similarity search with exact lookup and metadata filtering.",
    concept: "Relational tables represent identities and constraints. An inverted index maps words to matching records. A vector index retrieves nearby points in an embedding space, which helps with paraphrases. These methods can coexist in one database. Apply hard constraints such as ownership before presenting candidates. The lab ranks hand-built two-dimensional vectors so the distances stay inspectable.",
    diagram: ["Filter records", "Compare vectors", "Rank neighbors", "Resolve source IDs"],
    exercise: "Change collection to ops, keeping vector [1,0]. Then change the vector to [0,1] with collection study. Predict the eligible records and the winning ID.",
    solution: "The ops filter leaves only deploy. With study and [0,1], retrieval scores 1 and graph scores 0. The collection filter restricts membership and cosine ranks the eligible rows.",
    quiz: "You need note ID 42 in a particular tenant. Which lookup is the best starting point?",
    choices: ["Nearest ten embeddings", "A full-text search over all tenants", "An indexed tenant and note-ID lookup"], answer: 2,
    why: "Identity and tenancy are exact conditions. A relational or key-based lookup can enforce both.",
    framework: "PostgreSQL with pgvector can combine relational predicates with vector search. Begin with exact search as a reference. Compare an approximate index against that baseline on recall and latency before adoption.",
    project: "Load twenty notes into SQLite for ID and keyword retrieval, then implement a vector baseline. Compare exact-ID, literal-token and paraphrase queries and document where hybrid ranking helps.",
    ref: ["pgvector · Exact and approximate search", "https://github.com/pgvector/pgvector"],
    input: '{"collection":"study","vector":[1,0]}',
    run: function run(input) {
      const { collection, vector } = JSON.parse(input);
      if (!Array.isArray(vector) || vector.length !== 2 || !vector.every(Number.isFinite) || !Math.hypot(...vector)) return { error: "Use a nonzero 2D vector." };
      const rows = [
        { id: "graph", group: "study", v: [1, 0] },
        { id: "retrieval", group: "study", v: [0, 1] },
        { id: "deploy", group: "ops", v: [0.8, 0.2] }
      ];
      return rows.filter(row => row.group === collection).map(row => ({
        id: row.id, cosine: (row.v[0] * vector[0] + row.v[1] * vector[1]) / (Math.hypot(...row.v) * Math.hypot(...vector))
      })).sort((a, b) => b.cosine - a.cosine);
    }
  },
  {
    title: "Evaluation", level: "Advanced",
    intro: "Measure retrieved evidence against labeled cases and inspect individual misses.",
    concept: "An evaluation case pairs an input with an expected behavior and a scorer. Recall@k measures the fraction of relevant documents retrieved in the first k distinct results. Hit rate measures whether any relevant result appeared. Score retrieval separately from answer correctness and citation support. Keep a held-out set and include cases where the right answer is to abstain.",
    diagram: ["Label cases", "Replay system", "Score outputs", "Inspect regressions"],
    exercise: "Run the two cases at k=1 and k=2. Work out the score for each query by hand. Add a third case with a correct result in position three.",
    solution: "At k=1 the first case retrieves one of two relevant IDs and the second retrieves none, giving macro recall 0.25. At k=2 both cases score 1. A third-position match stays invisible at k=2.",
    quiz: "A query has four relevant documents. The top two contain two of them. What is recall@2?",
    choices: ["1.0", "0.5", "0.25"], answer: 1,
    why: "Two retrieved relevant documents divided by four labeled relevant documents equals 0.5.",
    framework: "LangSmith datasets and experiments let you compare candidate systems on the same cases. Start with deterministic scorers for IDs and tool arguments. Calibrate subjective rubrics against human judgments.",
    project: "Create a JSONL evaluation set for your repository assistant. Record per-case retrieval recall, answer support, latency and cost for two configurations. Investigate every newly failing case.",
    ref: ["LangSmith · Evaluation", "https://docs.langchain.com/langsmith/evaluation"],
    input: '{"k":1,"cases":[{"expected":["a","b"],"got":["b","a"]},{"expected":["c"],"got":["d","c"]}]}',
    run: function run(input) {
      const { k, cases } = JSON.parse(input);
      if (!Number.isInteger(k) || k < 1 || !Array.isArray(cases) || !cases.length) return { error: "Supply a positive k and at least one case." };
      const scores = [];
      for (const entry of cases) {
        if (!Array.isArray(entry?.expected) || !entry.expected.length || !Array.isArray(entry.got)) return { error: "Each case needs a nonempty expected array and a got array." };
        const expected = [...new Set(entry.expected)];
        const got = [...new Set(entry.got)].slice(0, k);
        const missing = expected.filter(id => !got.includes(id));
        scores.push({ recall: 1 - missing.length / expected.length, missing });
      }
      return { macroRecall: scores.reduce((sum, row) => sum + row.recall, 0) / scores.length, scores };
    }
  },
  {
    title: "Deployment", level: "Advanced",
    intro: "Model a job worker that retries transient failures within a deadline.",
    concept: "Long agent runs can outlive an HTTP request. Return a job ID, enqueue the work and let a worker persist progress. Use bounded retries for transient failures and send permanent failures to a terminal state. Track total elapsed time across attempts. This simulation assigns each attempt 100 ms and doubles its backoff after a transient error.",
    diagram: ["Accept job", "Queue work", "Attempt within budget", "Complete or fail"],
    exercise: "Set deadlineMs to 250. Predict whether the second attempt can start and finish. Then change the first outcome to invalid.",
    solution: "The first attempt uses 100 ms and the first backoff uses 100 ms. The next 100 ms attempt would end at 300 ms, so the deadline check stops it. A permanent invalid result terminates immediately.",
    quiz: "A provider rejects a malformed payload. What should the worker do?",
    choices: ["Retry indefinitely", "Double the model context", "Record a permanent error and surface the invalid request"], answer: 2,
    why: "Repeating identical invalid input spends the job budget without changing its chance of success.",
    framework: "A framework’s graph handles decisions within a run. A deployed service also needs a job queue, persistent state and cancellation. Attach one trace ID to the request and its worker attempts so their timings can be reconstructed.",
    project: "Wrap the note assistant in a job API. Implement queued, running, succeeded and failed states. Test deadline expiry and duplicate submit, then inspect correlated traces across the queue boundary.",
    ref: ["OpenTelemetry · Traces and spans", "https://opentelemetry.io/docs/concepts/signals/traces/"],
    input: '{"outcomes":["busy","busy","ok"],"deadlineMs":1000}',
    run: function run(input) {
      const { outcomes, deadlineMs } = JSON.parse(input);
      if (!Array.isArray(outcomes) || !outcomes.length || !outcomes.every(x => ["busy", "invalid", "ok"].includes(x)) || !Number.isFinite(deadlineMs) || deadlineMs < 0) return { error: "Supply an outcome list and a nonnegative deadline." };
      let elapsed = 0;
      const attempts = [];
      for (const [index, outcome] of outcomes.slice(0, 3).entries()) {
        const delay = index ? 100 * 2 ** (index - 1) : 0;
        if (elapsed + delay + 100 > deadlineMs) return { state: "deadline", elapsed, attempts };
        elapsed += delay + 100;
        attempts.push({ outcome, elapsed });
        if (outcome !== "busy") return { state: outcome === "ok" ? "succeeded" : "permanent failure", elapsed, attempts };
      }
      return { state: "attempts exhausted", elapsed, attempts };
    }
  },
  {
    title: "Engineering best practices", level: "Advanced",
    intro: "Separate proposals from permissions and make side effects safe to replay.",
    concept: "Treat model output and retrieved documents as untrusted inputs. Enforce permissions in application code. Associate approval with the exact action and payload a human reviewed. Retries require idempotency, and operation IDs reused with different payloads should trigger a conflict. This lab keeps a ledger for one batch. A real service persists that ledger atomically with the write.",
    diagram: ["Inspect proposal", "Match approval", "Check operation ID", "Record effect"],
    exercise: "Change only the second event’s text while preserving its ID. Then change approvedText to match that edit. Observe both outcomes.",
    solution: "A changed payload first fails approval matching. Once the edited payload has matching approval, the existing ID conflicts with the earlier payload. A genuinely new approved action requires a new ID.",
    quiz: "Which stored record best supports safe replay of a previously approved write?",
    choices: ["The operation ID, canonical payload and result", "Only the model name", "Only the timestamp"], answer: 0,
    why: "The stored identity and payload distinguish an exact replay from a conflicting action and allow the original outcome to be returned.",
    framework: "Combine a LangGraph approval interrupt with application-side authorization. Pin dependencies, version tool schemas and evaluate changes on saved traces. Keep credentials in the server environment.",
    project: "Finish a repository tutor that proposes note edits with supporting citations. Require diff approval, store a versioned operation receipt and add regression cases for denial, exact replay and conflicting reuse.",
    ref: ["JSON Schema · Object contracts", "https://json-schema.org/understanding-json-schema/reference/object"],
    input: '[{"id":"n1","text":"Add citation","approvedText":"Add citation"},{"id":"n1","text":"Add citation","approvedText":"Add citation"}]',
    run: function run(input) {
      const events = JSON.parse(input);
      if (!Array.isArray(events)) return { error: "Supply a JSON array of proposed edits." };
      const receipts = new Map();
      return events.map(event => {
        if (!event?.id || typeof event.text !== "string") return "Invalid proposal";
        if (event.approvedText !== event.text) return "Needs matching approval";
        if (receipts.has(event.id)) return receipts.get(event.id) === event.text ? "Replayed prior receipt" : "Operation ID conflict";
        receipts.set(event.id, event.text);
        return "Recorded approved edit";
      });
    }
  }
].map(({ run, ...lesson }) => ({ ...lesson, code: run.toString() }));
