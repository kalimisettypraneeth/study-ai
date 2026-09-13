# Learning Roadmap

The roadmap teaches the underlying engineering primitive first, then introduces libraries and frameworks that implement or extend it. The current technology-selection guide lives in [`docs/tooling-guide.md`](docs/tooling-guide.md).

## How to study every phase

For each topic, follow this loop:

1. **Learn the concept** and draw the mental model.
2. **Build it from scratch** using Python and the standard library or minimal dependencies.
3. **Add tests** for normal behavior and failure modes.
4. **Run a focused experiment** and measure quality, latency, cost, or reliability.
5. **Implement the same idea with one framework**.
6. **Compare the framework version to the from-scratch version**.
7. **Document trade-offs, best practices, and when not to use the tool**.
8. **Turn the result into a reusable sample** under the relevant phase.

## Phase 0 — Foundations

Learn:

- Python for AI engineering
- HTTP/API fundamentals
- Async programming
- JSON, schemas, validation
- Git, Docker, testing
- ML and transformer fundamentals

### Build samples

- typed HTTP client with retries and timeouts
- async fan-out/fan-in API caller
- Pydantic request/response contract
- pytest fixture library for LLM applications
- Dockerized FastAPI service
- tokenizer and attention visualizer

### Core tools

`python`, `typing`, `asyncio`, `httpx`, `pydantic`, `pytest`, `ruff`, `uv`, Docker, PostgreSQL.

## Phase 1 — LLM Engineering

Learn:

- Tokens and context
- Prompt design
- Structured outputs
- Function/tool calling
- Streaming
- Model selection, routing, retries
- Failure modes and safety

### Build samples

- streaming chat CLI
- structured information extractor
- model router based on task/cost
- retry/backoff wrapper
- token/cost calculator
- prompt regression test suite

### Compare tools

Start with provider SDKs and raw HTTP. Then compare:

- OpenAI SDK
- Anthropic SDK
- Google GenAI SDK
- LiteLLM or an internal provider adapter when portability is required

## Phase 2 — Agent Fundamentals

Learn:

- Agent loop from scratch
- Tool execution
- State and context
- Planning
- Memory
- Reflection
- Stop conditions
- Human approval

### Build samples

- calculator/search/file tool agent
- bounded ReAct-style loop
- agent with token/tool/time budgets
- approval gate before a side-effecting tool
- tool failure recovery experiment

### Framework progression

1. **No framework:** implement the loop yourself.
2. **OpenAI Agents SDK:** small Python-first agent runtime with tools, handoffs, guardrails, sessions, human-in-the-loop, and tracing.
3. **PydanticAI:** typed agent/tool/output patterns.
4. **LangChain:** compare higher-level integrations and abstractions.
5. **smolagents:** compare a deliberately small agent abstraction.

See [`docs/tooling-guide.md`](docs/tooling-guide.md) for the selection rules.

## Phase 3 — RAG

Learn:

- Data ingestion
- Parsing and cleaning
- Chunking
- Embeddings
- Vector stores
- Keyword + hybrid retrieval
- Reranking
- Query rewriting
- Context construction
- Agentic RAG
- RAG evaluation

### Build samples

- pure Python keyword retriever
- dense vector search with NumPy
- citation-aware RAG CLI
- hybrid BM25 + vector search
- metadata-filtered retrieval
- reranking experiment
- query-rewrite benchmark

### Technology progression

1. in-memory Python implementation
2. PostgreSQL + pgvector
3. Qdrant
4. Weaviate
5. Pinecone
6. Elasticsearch when full-text search is already a core platform capability

### Framework progression

- LlamaIndex for retrieval/data-centric experiments
- Haystack for explicit search/LLM pipelines
- LangChain/LangGraph when RAG must become part of a broader agent/workflow system

## Phase 4 — Orchestration

Learn:

- Deterministic workflows
- State machines
- Graph execution
- Branching and parallelism
- Retries and timeouts
- Checkpointing
- Long-running workflows
- Human-in-the-loop

### Build samples

- sequential research workflow
- conditional router
- parallel researcher nodes
- checkpoint/resume implementation
- approval workflow
- compensation/idempotency exercise
- worker crash recovery simulation

### Framework progression

1. plain Python/state machine
2. LangGraph
3. Microsoft Agent Framework or Haystack workflows/pipelines
4. CrewAI Flows for a comparison of structured flow + agent collaboration
5. introduce a durable workflow engine only when persistence/recovery requirements justify it

## Phase 5 — Multi-Agent Systems

Learn:

- Supervisor pattern
- Planner/executor
- Delegation
- Specialist agents
- Debate/critic patterns
- Shared vs isolated state
- When not to use multi-agent systems

### Build samples

- researcher + writer + reviewer
- planner + executor
- supervisor + specialists
- agents-as-tools
- message-based agents
- shared-state vs isolated-state benchmark

### Framework comparison

- OpenAI Agents SDK: agents-as-tools and handoffs
- LangGraph: explicit graph/state control
- CrewAI: crews vs flows
- Microsoft Agent Framework / AutoGen: message-oriented and workflow-oriented patterns
- LlamaIndex: agent workflows and RAG-centric multi-agent examples

Do not build a multi-agent system until a single-agent or deterministic workflow demonstrably cannot meet the requirement.

## Phase 6 — Evaluation

Learn:

- Golden datasets
- Task-level evaluation
- LLM-as-judge
- Trace evaluation
- Tool-call evaluation
- RAG evaluation
- Regression suites
- Red teaming

### Build samples

- golden dataset runner
- deterministic output tests
- tool-call trajectory scorer
- RAG retrieval benchmark
- judge calibration experiment
- adversarial prompt suite
- CI regression gate for agent behavior

### Tools

- pytest as the baseline
- Ragas for RAG/agent metrics
- DeepEval for component + end-to-end LLM evaluation
- promptfoo for adversarial/regression testing
- framework-native evaluators where useful

Never use an LLM judge as the only test.

## Phase 7 — Production

Learn:

- Observability and tracing
- Cost and latency
- Reliability engineering
- Security and prompt injection
- Secrets and permissions
- Sandboxing
- Deployment
- Governance

### Build samples

- structured trace pipeline
- token/cost attribution dashboard
- per-tool timeout and retry policy
- prompt-injection attack lab
- least-privilege tool sandbox
- rate-limit middleware
- incident replay tool
- production readiness checklist

### Recommended baseline stack

- FastAPI
- Pydantic
- PostgreSQL
- optional pgvector
- Redis only where justified
- OpenTelemetry
- Langfuse or Phoenix for AI application observability/evaluation
- pytest + DeepEval/Ragas
- Docker

OpenTelemetry should be learned as the vendor-neutral telemetry foundation before learning any vendor-specific AI tracing platform.

## Phase 8 — Frameworks

Study frameworks as implementations of the underlying patterns.

### Primary framework track

1. OpenAI Agents SDK
2. LangChain
3. LangGraph
4. LlamaIndex
5. PydanticAI
6. Haystack
7. CrewAI
8. Microsoft Agent Framework
9. AutoGen
10. smolagents
11. DSPy

### For every framework, build the same sample set

- hello-world model call
- structured extractor
- tool-using agent
- RAG assistant
- stateful workflow
- multi-agent workflow
- traced/evaluated version

### Compare

For each framework record:

- core abstractions
- execution model
- state model
- tool model
- memory
- retrieval
- multi-agent support
- observability
- evaluation
- deployment
- failure recovery
- extensibility
- ecosystem/integrations
- vendor coupling
- testing ergonomics
- when not to use it

## Cross-phase technology labs

The following labs should be repeated as the implementation stack changes:

### Lab 1 — Same agent, four runtimes

Implement the same tool-using agent with:

- from-scratch Python
- OpenAI Agents SDK
- PydanticAI
- LangChain/LangGraph

Compare code size, latency, testability, state handling, guardrails, and observability.

### Lab 2 — Same RAG corpus, four stores

Use the same corpus and evaluation set with:

- pgvector
- Qdrant
- Weaviate
- Pinecone

Measure recall, answer quality, latency, operational effort, and cost.

### Lab 3 — Same workflow, multiple orchestrators

Implement the same research workflow with:

- plain Python
- LangGraph
- Microsoft Agent Framework or Haystack
- CrewAI Flow

Inject worker crashes, duplicate delivery, timeouts, and human approval delays.

### Lab 4 — Observability portability

Instrument one application with OpenTelemetry and connect it to at least one AI-native observability platform. Verify that traces contain enough information to debug model calls, tools, retrieval, and failures.

### Lab 5 — Evaluation portability

Run the same dataset through pytest assertions, Ragas/DeepEval metrics, and one LLM judge. Compare disagreement between evaluation methods and record false positives/negatives.

## Study-plan rule for examples

Every framework topic should have three artifacts:

1. **Minimal example** — the smallest working program.
2. **Production-shaped example** — configuration, tests, retries, logging, security, and failure handling.
3. **Comparison experiment** — the same behavior implemented another way.

Every important sample should also document:

- prerequisites
- installation
- environment variables
- how to run
- expected output
- tests
- failure modes
- observability
- evaluation method
- cost/latency considerations
- why this tool was chosen
- reasonable alternatives
- when not to use the tool

See [`docs/tooling-guide.md`](docs/tooling-guide.md) for the detailed package/framework decision matrix and reference links.
