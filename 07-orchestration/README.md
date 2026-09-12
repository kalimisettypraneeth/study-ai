# 07 — Orchestration

Move from one agent loop to reliable, inspectable workflows. Orchestration is where you decide which steps are deterministic code, which steps are model decisions, and how state moves between them.

## Learning path

1. Sequential workflows
2. State machines
3. Graph-based execution
4. Branching and conditional routing
5. Parallel execution and joins
6. Retries, timeouts, and cancellation
7. Checkpoints and resumability
8. Long-running jobs and queues
9. Human-in-the-loop pauses
10. Compensation/rollback for side effects

## Build sequence

### A. Deterministic workflow

Start with:

```text
ingest → classify → retrieve → generate → validate → publish
```

Implement it as ordinary Python functions. Make the data passed between stages explicit.

### B. Model decision node

Replace exactly one deterministic step with an LLM decision. Keep everything around it deterministic. This teaches where model uncertainty belongs in a workflow.

### C. State machine

Represent each state and transition explicitly:

```text
START → PLAN → EXECUTE → VERIFY
               ↘ RETRY ↗
VERIFY → DONE
VERIFY → HUMAN_APPROVAL → EXECUTE
```

Persist state before every irreversible transition.

### D. Parallel branches

Run independent retrieval/search tasks concurrently, then merge their results deterministically. Measure whether parallelism improves latency enough to justify complexity.

### E. Durable execution

Add checkpoints and a queue. Kill the worker at random points and verify the workflow can resume without duplicating side effects.

## Failure experiments

- Worker crashes after tool success but before checkpoint.
- Same job is delivered twice.
- A branch times out while others succeed.
- Human approval takes hours.
- Retry causes duplicate side effects.
- Workflow state schema changes between versions.
- One branch produces invalid output.

## Project suggestions

**Research Workflow** — plan research, execute parallel source searches, synthesize, fact-check, and produce a cited report.

**Approval Workflow** — automate low-risk actions and route high-risk actions to a durable human approval step.

**Agent Job Runner** — queue, execute, checkpoint, retry, resume, cancel, and inspect long-running AI jobs.

## References

- LangGraph docs — https://langchain-ai.github.io/langgraph/
- Temporal — https://docs.temporal.io/
- OpenAI Agents SDK — https://openai.github.io/openai-agents-python/
- Microsoft Agent Framework — https://learn.microsoft.com/en-us/agent-framework/

## Exit criteria

You can draw every workflow state and transition, identify which transitions are safe to retry, and resume a failed run from durable state without duplicating irreversible work.