# 09 — Observability

Make agent behavior inspectable. The goal is to answer: **what happened, why did it happen, how long did it take, what did it cost, and what should we change?**

## Learning path

1. Structured logs
2. Request/response correlation IDs
3. Traces and spans
4. Agent/tool/model events
5. Metrics and latency percentiles
6. Token and cost accounting
7. Error taxonomy
8. Trace sampling and retention
9. Debugging workflows
10. Privacy and redaction

## Build sequence

### A. Event schema

Create a common event envelope:

```json
{
  "trace_id": "...",
  "run_id": "...",
  "timestamp": "...",
  "component": "agent|tool|retriever|model",
  "event": "start|finish|error",
  "duration_ms": 123,
  "metadata": {}
}
```

### B. Trace an agent run

Capture at least:

```text
agent run
 ├─ model call
 ├─ tool call
 ├─ tool result
 ├─ model call
 └─ final output
```

Connect events with the same trace/run identifiers.

### C. Metrics

Track:

- success/failure rate
- tool error rate
- p50/p95/p99 latency
- model latency
- queue wait time
- input/output tokens
- estimated cost
- retries
- agent turns
- retrieval counts

### D. Failure analysis

Build a report that groups failures by category rather than only by stack trace. Example categories: timeout, provider error, validation, tool permission, retrieval miss, model quality, safety policy.

### E. Privacy-aware telemetry

Redact secrets and avoid blindly storing user prompts or tool results. Define retention rules before turning observability on in production.

## Experiments

- Compare traces for successful vs failed runs.
- Measure p95 latency before and after parallel tool calls.
- Attribute cost by user/project/tool.
- Sample 100% of errors but only a fraction of successful runs.
- Test whether a trace is sufficient to reproduce a failure without exposing sensitive payloads.

## Project suggestions

**Agent Trace Viewer** — ingest local JSON traces and render a timeline of model calls, tools, retries, state transitions, latency, and cost.

**AI Service SLO Dashboard** — define success, latency, cost, and safety objectives and generate periodic reports from trace data.

## References

- OpenTelemetry — https://opentelemetry.io/docs/
- OpenAI Agents SDK tracing — https://openai.github.io/openai-agents-python/
- W3C Trace Context — https://www.w3.org/TR/trace-context/

## Exit criteria

Given one failed run, you can reconstruct the sequence of model decisions, tool calls, state changes, timing, cost, and failure cause without reading application source code line by line.