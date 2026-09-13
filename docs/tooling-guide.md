# AI Engineering Tooling & Framework Decision Guide

This guide is the technology-selection companion to the learning roadmap. The goal is not to memorize libraries. The goal is to understand the underlying problem first, then choose the smallest tool that solves it well.

> **Rule:** learn the primitive without a framework first; add a framework when it removes meaningful boilerplate, improves reliability, or gives you capabilities that would be expensive to maintain yourself.

## 1. Recommended learning stack

Use one primary language and one comparison language only after the Python path is comfortable.

### Primary language: Python

Python should be the default language for this repository because the major agent, RAG, evaluation, and model SDK ecosystems have strong Python support.

Learn deeply:

- `python`
- `typing`
- `asyncio`
- `httpx`
- `pydantic`
- `pytest`
- `ruff`
- `uv`
- `FastAPI`

Add later:

- SQL/PostgreSQL
- Docker
- Redis
- a queue/workflow engine
- one vector database

### Secondary language: TypeScript

Study TypeScript after the Python fundamentals when you want to build web-facing AI products, streaming UIs, or Node-based services.

Recommended baseline:

- TypeScript
- `zod` for runtime schemas
- `fetch` / native HTTP clients
- a frontend stack such as Next.js when building product interfaces
- Vercel AI SDK when the application is primarily a web/streaming experience

### Systems language: Go

Learn Go later for high-throughput services, infrastructure components, workers, CLIs, and systems where operational simplicity is more important than Python ecosystem breadth.

Do not make Go a prerequisite for the core AI-agent curriculum.

---

## 2. The package map by problem

| Problem | Start with | Add when needed | Main alternatives | What to learn |
|---|---|---|---|---|
| Direct model calls | Provider SDK + `httpx` | small internal model adapter | OpenAI SDK, Anthropic SDK, Google GenAI SDK, LiteLLM | request/response contracts, retries, streaming |
| Typed structured output | `pydantic` | schema validation helpers | Zod/TypeScript, JSON Schema | contracts before parsing model text |
| Simple single agent | provider SDK or OpenAI Agents SDK | PydanticAI | smolagents, LangChain | loop, tools, state, stop conditions |
| General LLM application integrations | LangChain | LangGraph | LlamaIndex, Haystack | model/tool/retriever abstractions |
| Stateful graph workflows | LangGraph | durable workflow engine | Microsoft Agent Framework, Haystack pipelines, CrewAI Flows | state, edges, checkpoints, recovery |
| OpenAI-first agent runtime | OpenAI Agents SDK | custom runtime code | PydanticAI, LangChain | agents, tools, handoffs, guardrails, tracing |
| Typed Python agent development | PydanticAI | custom runtime | OpenAI Agents SDK, LangChain | dependencies, typed outputs, tool schemas |
| RAG/data-heavy applications | LlamaIndex | custom retrieval components | Haystack, LangChain | ingestion, indexing, retrievers, response synthesis |
| Search-heavy pipelines | Haystack | custom components | LlamaIndex, LangChain | components, pipelines, branching, retrieval |
| Multi-agent role/team systems | CrewAI | explicit workflow around crews | AutoGen, Microsoft Agent Framework, LangGraph | delegation, collaboration, control vs autonomy |
| Multi-agent messaging/research | Microsoft Agent Framework / AutoGen | explicit workflow | CrewAI, LangGraph | message passing, workflows, state |
| Prompt/program optimization | DSPy | evaluation-driven optimization | hand-tuned prompts | signatures, metrics, optimizers |
| Small/transparent agent experiments | smolagents | custom code | PydanticAI, OpenAI Agents SDK | minimal agent loop, tool execution |
| Vector retrieval | PostgreSQL + pgvector | dedicated vector DB | Qdrant, Weaviate, Pinecone | similarity, ANN, filters, recall |
| Hybrid search | Postgres FTS + pgvector | Qdrant/Weaviate/Elastic | Pinecone, Elasticsearch | BM25 + dense retrieval + fusion |
| Reranking | Sentence Transformers / provider reranker | specialized reranker API | Cohere/Voyage/etc. | first-stage retrieval vs second-stage ranking |
| Evaluation | pytest + custom datasets | DeepEval/Ragas/promptfoo | OpenAI Evals, framework-native evals | golden data, metrics, regressions |
| Agent/RAG observability | structured logs + OpenTelemetry | Langfuse/Phoenix/Weave | vendor-native tracing | traces, spans, token/cost attribution |
| Durable execution | ordinary async code first | Temporal / workflow platform | framework checkpoints | retries, idempotency, recovery |
| API service | FastAPI | async workers/queues | Flask, Node/TS service | auth, timeouts, rate limits, health checks |
| Local model experiments | Ollama + provider-compatible API | vLLM / local serving | llama.cpp ecosystem | model serving, latency, quantization |
| Tool interoperability | function tools | MCP | custom RPC/API | schemas, discovery, auth, lifecycle |

---

## 3. Agent framework decision tree

### Use no framework when

- the agent loop is fewer than a few dozen lines;
- you are learning the primitive;
- you need complete control over state and tool dispatch;
- framework behavior would hide the concept you are trying to understand.

**Study sample:** `04-agents/01-agent-loop-from-scratch/`

### Use OpenAI Agents SDK when

- Python is the primary language;
- you want a small set of agent primitives;
- tools, handoffs, guardrails, sessions, human approval, and tracing are useful;
- you primarily use OpenAI models and want a straightforward runtime.

The current SDK provides agents, tools, agents-as-tools/handoffs, guardrails, sessions, human-in-the-loop, MCP integration, sandbox agents, and built-in tracing. It explicitly distinguishes using the SDK from owning the loop directly with the Responses API. See the [official docs](https://openai.github.io/openai-agents-python/). 

### Use PydanticAI when

- you strongly prefer typed Python;
- structured input/output contracts are central;
- dependency injection and testability matter;
- you want a lightweight abstraction instead of a large framework.

PydanticAI models agents around instructions, tools/toolsets, structured output types, dependencies, and model configuration. See [PydanticAI agent concepts](https://ai.pydantic.dev/).

### Use LangChain when

- you need many model/tool/data integrations;
- you want higher-level agent building blocks;
- portability across providers is important;
- the application benefits from its ecosystem.

LangChain currently describes itself as an agent framework with integrations for models and tools, while LangGraph is its lower-level orchestration layer. See [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview).

### Use LangGraph when

- execution is stateful and multi-step;
- you need explicit graph control;
- you need branching, loops, persistence, interrupts, or resumability;
- deterministic workflow logic and agentic behavior must coexist.

LangGraph is positioned as a low-level orchestration framework/runtime for long-running, stateful agents and does not require LangChain. See [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview).

### Use LlamaIndex when

- retrieval and private data are central to the application;
- ingestion, indexing, retrievers, query engines, and agentic RAG are the main problem;
- you want to experiment quickly with multiple data-access patterns.

Prefer its current workflow/agent abstractions rather than building new curriculum around older `QueryPipeline` APIs; the current docs flag `QueryPipeline` as feature-frozen/deprecation-oriented and point users toward workflows. See [LlamaIndex query pipeline](https://docs.llamaindex.ai/en/stable/module_guides/querying/pipeline/) and [structured agent output](https://docs.llamaindex.ai/en/latest/understanding/agent/structured_output/).

### Use Haystack when

- your system is naturally expressed as a search/LLM pipeline;
- you need explicit components, branches, loops, and pipeline composition;
- retrieval engineering is more important than agent abstraction.

Haystack pipelines are directed multigraphs and support branching, loops, tool use, chat agents, and agentic RAG. See [Haystack pipelines](https://docs.haystack.deepset.ai/docs/pipelines).

### Use CrewAI when

- the problem naturally maps to collaborating specialist agents;
- you want an explicit distinction between autonomous crews and deterministic flows;
- multi-agent role-based collaboration is part of the product requirement.

CrewAI currently separates **Crews** for collaborative/autonomous agent teams from **Flows** for structured, stateful, controlled execution. See [CrewAI concepts](https://docs.crewai.com/) and [Agents/Crew/Flow overview](https://docs.crewai.com/core-concepts/Agents).

### Study Microsoft Agent Framework / AutoGen when

- you want to understand message-oriented multi-agent systems;
- you are working in a Microsoft/Azure ecosystem;
- you need workflows, executors, orchestration, or cross-service agent patterns.

Microsoft Agent Framework currently teaches agents, tools, sessions, memory, workflows, harnesses, and hosting, and includes migration guidance from AutoGen and Semantic Kernel. See [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/).

AutoGen remains useful as a reference for message-oriented multi-agent architecture and independently deployable agents. See [AutoGen multi-agent concepts](https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/core-concepts/agent-and-multi-agent-application.html).

### Use smolagents when

- you want a small, readable Python agent framework;
- the learning objective is understanding agent/tool execution without a large abstraction stack;
- you want examples that include code execution, RAG, multi-agent, async, and human-in-the-loop patterns.

See [smolagents](https://huggingface.co/docs/smolagents/index).

### Use DSPy when

- you have repeatable tasks and an evaluation metric;
- prompt/program optimization is becoming more important than manually editing prompts;
- you want to express behavior as signatures/modules and optimize against a metric.

DSPy currently emphasizes signatures, composable modules, tools/ReAct, metrics, and optimizers including GEPA. See [DSPy](https://dspy.ai/).

---

## 4. RAG technology choices

### Default learning path

1. Python list/dict retrieval for the mental model.
2. TF-IDF / BM25 for lexical search.
3. Dense embeddings with a small embedding model.
4. Exact vector similarity in Python/NumPy.
5. PostgreSQL + pgvector.
6. Hybrid retrieval.
7. Reranking.
8. Query rewriting.
9. Evaluation.
10. Only then compare dedicated vector databases.

### PostgreSQL + pgvector

Use this first for production-style learning when relational data is already in Postgres or the corpus is moderate.

pgvector supports exact and approximate nearest-neighbor search, multiple distance functions, HNSW/IVFFlat, filtering through normal SQL, and hybrid search with Postgres full-text search. See [pgvector](https://github.com/pgvector/pgvector).

### Qdrant

Use Qdrant when retrieval is a primary system capability and you want flexible vector, sparse, hybrid, filtering, and multi-stage retrieval behavior.

Qdrant documents hybrid queries combining dense and sparse retrieval and multi-stage prefetch/reranking patterns. See [Qdrant hybrid search](https://qdrant.tech/documentation/search/text-search/hybrid-search/).

### Weaviate

Use Weaviate when you want a search-oriented vector database with integrated hybrid retrieval, filters, reranking, and broader AI search capabilities.

Weaviate combines vector search with BM25 keyword search and supports configurable fusion strategies. See [Weaviate hybrid search](https://docs.weaviate.io/weaviate/concepts/search/hybrid-search).

### Pinecone

Use Pinecone when you want a managed vector service and do not want to operate the database yourself.

Pinecone supports dense semantic search and sparse/lexical retrieval and provides managed indexing/search workflows. See [Pinecone semantic search](https://docs.pinecone.io/guides/search/semantic-search).

### Elasticsearch

Use Elasticsearch when search is already an organizational platform or when full-text search, vector search, filtering, and aggregations must coexist.

Elastic recommends hybrid search using reciprocal rank fusion for combining lexical and vector rankings. See [Elastic hybrid search](https://www.elastic.co/docs/solutions/search/hybrid-search).

---

## 5. Evaluation stack

Treat evaluation as an engineering layer, not as an optional analytics feature.

### Base layer

- `pytest`
- JSON/YAML golden datasets
- deterministic assertions
- exact-match / semantic similarity where appropriate
- latency and cost measurements

### RAG evaluation

Use **Ragas** when the main need is RAG/agent evaluation metrics such as context precision, context recall, faithfulness, response relevancy, and tool-call/agent metrics. See [Ragas metrics](https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/).

### Agent/component evaluation

Use **DeepEval** when you want pytest-style LLM evaluation with end-to-end and component-level evaluation of agents, tools, retrievers, and RAG pipelines. See [DeepEval agent evaluation](https://deepeval.com/docs/getting-started-agents).

### Security/prompt testing

Add **promptfoo** to the study plan for adversarial prompt testing, regression tests, and red-team style experiments.

### Rule

Do not let an LLM judge be the only test. Pair model-based metrics with deterministic checks, curated examples, and regression tests.

---

## 6. Observability stack

### Learn the primitive first

Implement a small event/trace model:

```text
trace
 ├── request
 ├── model_call
 ├── tool_call
 ├── retrieval
 ├── model_call
 └── response
```

Record at minimum:

- trace ID
- span ID
- model/provider
- input/output token counts when available
- latency
- tool name
- tool arguments/result status
- retrieval query and document IDs
- error type
- estimated cost

### Production-oriented stack

Start with **OpenTelemetry** as the vendor-neutral instrumentation foundation. OpenTelemetry supports traces, metrics, logs, and context/baggage and can export to many backends. See [OpenTelemetry](https://opentelemetry.io/docs/).

Then compare:

- **Langfuse** — prompt management, traces, datasets, evaluation, production monitoring.
- **Arize Phoenix** — LLM/RAG observability and evaluation.
- **W&B Weave** — tracing/evaluation/experiment workflows.
- provider/framework-native tracing when it is sufficient.

Langfuse currently emphasizes traces, sessions, prompts, datasets, online monitoring, and offline evaluation and has integrations for OpenAI, LangChain, and LlamaIndex. See [Langfuse docs](https://langfuse.com/docs).

---

## 7. Tool interoperability

### Function tools first

Learn plain functions and JSON schemas before learning MCP.

Build a tool abstraction with:

```python
class Tool:
    name: str
    description: str
    input_schema: dict

    async def execute(self, arguments: dict) -> dict:
        ...
```

Then add:

- validation
- authorization
- timeouts
- idempotency
- audit logging
- human approval
- retries
- sandboxing

### MCP second

MCP should be studied as a protocol for tool/resource interoperability, not as a replacement for understanding tool calling.

Study:

1. local function tool
2. remote API tool
3. MCP server
4. MCP client
5. authentication/authorization
6. tool discovery
7. error handling
8. security boundaries

Use the current MCP specification and official SDKs rather than copying old examples because the protocol evolves. See [Model Context Protocol](https://modelcontextprotocol.io/).

---

## 8. Production service stack

### Recommended baseline

```text
Python
├── FastAPI                 # HTTP API
├── Pydantic                # contracts/config
├── httpx                   # outbound APIs
├── asyncio                 # concurrency
├── pytest                  # tests/evals
├── ruff                    # lint/format
├── uv                      # package/environment management
├── PostgreSQL              # application state
├── pgvector                # vectors when appropriate
├── Redis                   # cache/coordination when appropriate
├── OpenTelemetry           # instrumentation
└── Docker                  # reproducible runtime
```

Add only when the architecture demands it:

- queue/worker system
- durable workflow engine
- object storage
- dedicated vector database
- Kubernetes
- service mesh

Do not start with Kubernetes, five databases, or a multi-agent framework for a one-process prototype.

---

## 9. Best-practice rules for every example

Every learning example in this repository should try to demonstrate the following:

### Contracts

- use typed inputs/outputs;
- validate external input;
- never assume model output is valid JSON merely because you asked for JSON;
- keep tool schemas explicit.

### Reliability

- set timeouts;
- distinguish retryable from non-retryable errors;
- cap retries and loops;
- make side-effecting tools idempotent where possible;
- use budgets for tokens, time, tool calls, and money.

### Security

- treat model output as untrusted;
- separate instructions from retrieved data;
- enforce authorization outside the prompt;
- validate tool inputs before execution;
- log security-relevant events without leaking secrets;
- use least-privilege tool access.

### Evaluation

Every meaningful sample should have at least:

- a happy-path test;
- an edge case;
- a failure case;
- an evaluation dataset once behavior becomes probabilistic;
- a regression test for bugs discovered during experiments.

### Observability

Each example should expose enough information to answer:

- what model ran?
- what tools ran?
- what documents were retrieved?
- how long did each step take?
- what failed?
- how much did it cost?

### Reproducibility

Pin dependencies for projects, record model versions/configuration, capture prompts/configuration changes, and keep benchmark datasets versioned.

---

## 10. Sample-driven study plan

Do not study a library only by reading its API reference. Rebuild the same system with progressively stronger tooling.

### Sample A — LLM CLI

Build the same application three ways:

1. raw provider SDK
2. an internal provider adapter
3. one high-level framework

Measure:

- lines of code
- latency
- portability
- testability
- debugging experience

### Sample B — Tool-using agent

Implement:

1. manual agent loop
2. OpenAI Agents SDK version
3. PydanticAI version
4. LangChain version

Compare:

- tool schema generation
- state handling
- retries
- guardrails
- tracing
- test strategy

### Sample C — RAG assistant

Implement:

1. keyword retrieval
2. dense retrieval
3. hybrid retrieval
4. reranked retrieval
5. citation-aware answer generation

Compare:

- recall
- precision
- answer faithfulness
- latency
- index cost

Then implement the same application using:

- pgvector
- Qdrant
- one managed vector service

### Sample D — Workflow system

Implement a research workflow as:

1. plain Python functions
2. LangGraph
3. Microsoft Agent Framework or Haystack
4. a durable workflow engine when recovery requirements justify it

Test the same failure scenarios:

- tool timeout
- provider timeout
- worker crash
- duplicate execution
- human approval delay
- partial completion

### Sample E — Multi-agent research

Compare:

- supervisor
- planner/executor
- agents-as-tools
- CrewAI crew/flow
- message-oriented multi-agent implementation

Measure whether the multi-agent design actually improves quality enough to justify extra latency, cost, coordination, and failure modes.

---

## 11. Capstone technology progression

### Project 1 — LLM CLI assistant

**Tools:** Python, provider SDK, Pydantic, pytest.

Learn contracts, streaming, configuration, errors, and testing.

### Project 2 — Tool-using agent

**Tools:** manual loop first, then OpenAI Agents SDK or PydanticAI.

Learn tool schemas, state, budgets, retries, approvals, and safety.

### Project 3 — RAG assistant

**Tools:** Python retrieval first, then Postgres + pgvector, then compare Qdrant/Weaviate/Pinecone.

Learn ingestion, chunking, embeddings, hybrid retrieval, reranking, citations, and retrieval evaluation.

### Project 4 — Stateful research agent

**Tools:** LangGraph or equivalent stateful runtime + Langfuse/OpenTelemetry + evaluation suite.

Learn state persistence, branching, recovery, tracing, and long-running execution.

### Project 5 — Workflow orchestrator

**Tools:** LangGraph / Microsoft Agent Framework / Haystack; compare with a durable workflow engine when requirements justify it.

Learn explicit workflow design, idempotency, compensation, checkpoints, and human approval.

### Project 6 — Multi-agent research system

**Tools:** compare CrewAI, LangGraph, OpenAI Agents SDK, Microsoft Agent Framework/AutoGen, and a from-scratch message-based implementation.

Learn delegation, specialist boundaries, shared state, communication, and the cost of coordination.

### Project 7 — Production-grade agent service

**Tools:** FastAPI, Pydantic, PostgreSQL, optional pgvector, Redis where useful, OpenTelemetry, Langfuse/Phoenix, pytest, DeepEval/Ragas, Docker.

Learn API design, authentication, rate limits, observability, evaluations, incident handling, deployment, and governance.

---

## 12. Framework comparison worksheet

For every framework studied in `11-frameworks/`, answer the same questions:

1. What problem does it solve?
2. What abstractions does it introduce?
3. Can the same behavior be implemented with plain Python?
4. How is state represented?
5. How are tools defined and validated?
6. How are retries and failures handled?
7. How are loops stopped?
8. How is human approval represented?
9. How are multi-agent handoffs represented?
10. How is memory represented?
11. How is RAG integrated?
12. How are traces emitted?
13. How are evaluations integrated?
14. What happens during process restart?
15. What is vendor/platform coupling?
16. What are the major extension points?
17. What is the testing strategy?
18. What are the operational costs?
19. What does the framework make easier?
20. What does the framework make harder or hide?

The repository should maintain one small equivalent application across several frameworks so the comparison stays concrete.

---

## 13. Current framework/reference set

Primary documentation should be re-checked before upgrading dependencies because the AI tooling ecosystem changes quickly.

- [LangChain](https://docs.langchain.com/oss/python/langchain/overview)
- [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)
- [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)
- [PydanticAI](https://ai.pydantic.dev/)
- [LlamaIndex](https://docs.llamaindex.ai/)
- [Haystack](https://docs.haystack.deepset.ai/)
- [CrewAI](https://docs.crewai.com/)
- [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/)
- [AutoGen](https://microsoft.github.io/autogen/stable/)
- [smolagents](https://huggingface.co/docs/smolagents/index)
- [DSPy](https://dspy.ai/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [pgvector](https://github.com/pgvector/pgvector)
- [Qdrant](https://qdrant.tech/documentation/)
- [Weaviate](https://docs.weaviate.io/)
- [Pinecone](https://docs.pinecone.io/)
- [Elasticsearch](https://www.elastic.co/docs/solutions/search)
- [Ragas](https://docs.ragas.io/)
- [DeepEval](https://deepeval.com/docs/introduction)
- [OpenTelemetry](https://opentelemetry.io/docs/)
- [Langfuse](https://langfuse.com/docs)

This list is a study map, not an endorsement ranking.
