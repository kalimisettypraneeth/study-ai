# Projects

End-to-end systems that combine concepts from multiple sections. Projects are where learning becomes engineering judgment.

## Capstone sequence

### 1. LLM CLI assistant

**Build:** terminal chat, prompt versioning, streaming, configuration, and tests.

**Learn:** model APIs, prompts, context, error handling.

**Acceptance:** reproducible setup, typed configuration, graceful provider errors, and a small regression dataset.

### 2. Tool-using agent

**Build:** model loop + calculator/search/file tools + schema validation + permissions + budgets.

**Learn:** tools, agent state, stop conditions, retries, safety.

**Acceptance:** the agent cannot exceed turn/tool budgets and cannot call an unauthorized tool.

### 3. RAG assistant

**Build:** ingestion → chunking → embeddings → hybrid retrieval → reranking → cited answers.

**Learn:** retrieval quality, grounding, citations, evaluation.

**Acceptance:** a benchmark reports retrieval and answer metrics; unanswerable questions do not force unsupported answers.

### 4. Stateful research agent

**Build:** persistent state, memory, bounded research loop, source verification, and cited reports.

**Learn:** memory/state, agent planning, evaluation, observability.

**Acceptance:** restart/resume works and each final claim has inspectable evidence.

### 5. Workflow orchestrator

**Build:** explicit state machine/graph, parallel branches, retries, checkpoints, and human approval.

**Learn:** orchestration and durable execution.

**Acceptance:** injected crashes do not duplicate irreversible work.

### 6. Multi-agent research system

**Build:** supervisor/planner plus specialist workers and an evaluator/critic.

**Learn:** delegation, shared/isolated state, coordination overhead, and when multi-agent design is not justified.

**Acceptance:** compare against a single-agent baseline and show evidence for any improvement.

### 7. Production-grade agent service

**Build:** API, auth, queues, persistence, RAG/tools, evaluation gate, tracing, metrics, cost controls, security controls, deployment, and incident runbooks.

**Learn:** full-system engineering.

**Acceptance:** documented SLOs, load test, failure drills, security tests, regression suite, and rollback/degraded-mode plan.

## Additional project ideas

- Codebase documentation agent
- Incident-response assistant over runbooks
- Internal knowledge search with citation inspection
- Contract/document extraction pipeline
- Meeting-to-action-item workflow
- Research benchmark/evaluation platform
- Safe browser/tool automation simulator
- Agent trace analysis dashboard

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

The report should include architecture, setup, tests, evaluation results, failure modes, cost/latency notes, security decisions, trade-offs, and lessons learned.