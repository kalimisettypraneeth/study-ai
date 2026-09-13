# Projects

End-to-end systems that combine concepts from multiple sections. Projects are where learning becomes engineering judgment.

Use [`docs/tooling-guide.md`](../docs/tooling-guide.md) to understand why each technology is selected. Every project should deliberately compare at least one alternative where the choice is meaningful.

## Capstone sequence

### 1. LLM CLI assistant

**Build:** terminal chat, prompt versioning, streaming, configuration, and tests.

**Suggested stack:** Python, provider SDK, Pydantic, pytest, `uv`.

**Compare:** raw SDK vs a small internal model adapter.

**Learn:** model APIs, prompts, context, error handling.

**Acceptance:** reproducible setup, typed configuration, graceful provider errors, and a small regression dataset.

### 2. Tool-using agent

**Build:** model loop + calculator/search/file tools + schema validation + permissions + budgets.

**Suggested progression:** from-scratch Python → OpenAI Agents SDK → PydanticAI or LangChain.

**Compare:** execution loop, tool validation, state, retries, guardrails, observability, and testing.

**Learn:** tools, agent state, stop conditions, retries, safety.

**Acceptance:** the agent cannot exceed turn/tool budgets and cannot call an unauthorized tool.

### 3. RAG assistant

**Build:** ingestion → chunking → embeddings → hybrid retrieval → reranking → cited answers.

**Suggested progression:** Python retrieval → PostgreSQL + pgvector → Qdrant/Weaviate/Pinecone comparison.

**Framework comparison:** LlamaIndex vs Haystack vs LangChain-based implementation.

**Learn:** retrieval quality, grounding, citations, evaluation.

**Acceptance:** a benchmark reports retrieval and answer metrics; unanswerable questions do not force unsupported answers.

### 4. Stateful research agent

**Build:** persistent state, memory, bounded research loop, source verification, and cited reports.

**Suggested stack:** LangGraph or Microsoft Agent Framework; OpenTelemetry + Langfuse/Phoenix; Ragas/DeepEval.

**Compare:** explicit graph state vs another agent runtime and a minimal custom implementation.

**Learn:** memory/state, agent planning, evaluation, observability.

**Acceptance:** restart/resume works and each final claim has inspectable evidence.

### 5. Workflow orchestrator

**Build:** explicit state machine/graph, parallel branches, retries, checkpoints, and human approval.

**Suggested progression:** plain Python → LangGraph → Microsoft Agent Framework/Haystack/CrewAI Flow → durable workflow platform when justified.

**Compare:** recovery guarantees, state ownership, idempotency, and operational complexity.

**Learn:** orchestration and durable execution.

**Acceptance:** injected crashes do not duplicate irreversible work.

### 6. Multi-agent research system

**Build:** supervisor/planner plus specialist workers and an evaluator/critic.

**Framework shootout:** CrewAI, LangGraph, OpenAI Agents SDK, Microsoft Agent Framework/AutoGen, plus a custom baseline.

**Compare:** single-agent baseline vs multi-agent architecture on quality, latency, cost, coordination failures, and maintainability.

**Learn:** delegation, shared/isolated state, coordination overhead, and when multi-agent design is not justified.

**Acceptance:** compare against a single-agent baseline and show evidence for any improvement.

### 7. Production-grade agent service

**Build:** API, auth, queues, persistence, RAG/tools, evaluation gate, tracing, metrics, cost controls, security controls, deployment, and incident runbooks.

**Suggested baseline stack:** FastAPI, Pydantic, PostgreSQL, optional pgvector, Redis only where justified, OpenTelemetry, Langfuse/Phoenix, pytest, DeepEval/Ragas, Docker.

**Add only when justified:** dedicated vector database, queue/worker system, durable workflow engine, Kubernetes.

**Learn:** full-system engineering.

**Acceptance:** documented SLOs, load test, failure drills, security tests, regression suite, and rollback/degraded-mode plan.

## Framework shootout project

Build one **cited research workflow** six ways:

```text
A. custom Python baseline
B. OpenAI Agents SDK
C. PydanticAI
D. LangChain + LangGraph
E. LlamaIndex or Haystack
F. CrewAI or Microsoft Agent Framework
```

Measure:

- task success
- citation quality
- retrieval quality
- tool-call correctness
- latency
- token usage
- estimated cost
- failure recovery
- developer effort
- dependency complexity
- observability quality
- migration/lock-in risk

The output is a technical report, not a popularity ranking.

## RAG database shootout project

Use one corpus and one fixed evaluation dataset to compare:

- pgvector
- Qdrant
- Weaviate
- Pinecone
- Elasticsearch when full-text search is already a platform requirement

Test:

- exact vs approximate search
- metadata filters
- hybrid search
- reranking
- recall@k
- latency
- ingestion time
- operational complexity
- estimated cost

## Evaluation-platform project

Build a small internal evaluation runner supporting:

- golden test cases
- deterministic assertions
- tool trajectory checks
- RAG retrieval metrics
- LLM-as-judge
- adversarial tests
- regression snapshots
- CI gating

Implement a baseline with pytest, then compare Ragas, DeepEval, and promptfoo.

## Observability-platform project

Instrument one agent with OpenTelemetry and connect it to at least one AI-native backend such as Langfuse or Phoenix.

Demonstrate that you can inspect:

- request/trace IDs
- model calls
- prompts/configuration versions
- tool calls
- retrieval events
- failures
- latency
- token usage
- cost

## Additional project ideas

- Codebase documentation agent
- Incident-response assistant over runbooks
- Internal knowledge search with citation inspection
- Contract/document extraction pipeline
- Meeting-to-action-item workflow
- Research benchmark/evaluation platform
- Safe browser/tool automation simulator
- Agent trace analysis dashboard
- MCP tool registry and policy gateway
- Model-routing gateway with cost/latency-aware fallback

## Required project documentation

Every project should contain:

```text
README.md
architecture.md
setup.md
implementation-notes.md
tests/
evals/
experiments/
report.md
```

The report should include architecture, setup, tests, evaluation results, failure modes, cost/latency notes, security decisions, trade-offs, alternative technologies considered, why the selected stack was chosen, and lessons learned.

## Standard project rule

A project is incomplete if it only demonstrates a working demo. It must also explain:

1. why the technology was selected;
2. what the simplest alternative was;
3. how the system behaves when the model/tool/retriever fails;
4. how quality is measured;
5. how the system is observed;
6. what would cause you to replace the chosen library or framework.
