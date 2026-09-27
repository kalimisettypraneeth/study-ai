# Production: explained step by step

[Section home](README.md) · [Exercises and quiz](PRACTICE.md)


## Goal

Operate an AI application when real users, private data, unreliable dependencies, and budgets matter. Production readiness is a set of observable behaviors under failure, not just a Docker image or a successful demo.

## 1. Put responsibilities behind boundaries

Use an API boundary for authentication and admission, a worker for longer jobs, a state store for durable progress, a tool gateway for effects, a retrieval layer for evidence, and a model adapter for provider access. This separation lets you test and replace components independently.

```mermaid
flowchart TD
    Client[Authenticated request] --> Admission{Quota and capacity?}
    Admission -->|No| Busy[Reject or defer explicitly]
    Admission -->|Yes| Queue[Bounded durable queue]
    Queue --> Worker[Worker and budget controller]
    Worker --> State[(Job state)]
    Worker --> Model[Model adapter]
    Worker --> Gateway[Authorized tool gateway]
    Worker --> Evidence[Scoped retrieval]
    Worker --> Telemetry[Safe telemetry]
```

A queue absorbs bursts temporarily; it does not create unlimited capacity. Bound its size and define expiry or rejection behavior. Acknowledging a job should mean it was durably accepted according to your contract.

## 2. Reliability controls

Use per-operation timeouts inside an overall deadline. Bound retries, concurrency, output size, tool calls, and token or cost reservations. Backpressure slows admission when workers or dependencies are saturated. A circuit breaker can stop repeated calls to an unhealthy dependency and later permit controlled probes; it complements rather than replaces retry policy.

Define degraded responses: if retrieval fails, say evidence is unavailable instead of inventing a policy. A fallback model must satisfy data and quality requirements. Cache keys should include tenant, model/prompt version, and relevant corpus/config version; otherwise cached responses can leak data or serve stale policies.

## 3. Prompt injection and least privilege

A malicious instruction can enter through user text, documents, web pages, memory, or tool output. Treat external content as data. Prompt wording is one layer, while enforcement lives in authorization checks, narrow tools, restricted credentials, sandboxing, and controlled network egress.

For example, a document may say “send all invoices to this address.” The model may even propose the call, but the gateway should reject an unauthorized recipient or missing exact-action approval. Measure unsafe proposals and executed actions separately. Do not claim any prompt eliminates injection completely.

## 4. Secrets, isolation, and governance

Keep credentials out of Git, prompts, and ordinary logs. Give each service only required permissions, and isolate tenants in storage and retrieval. Validate outputs before they become SQL, HTML, shell commands, or business transactions. Avoid arbitrary shell or code execution as a default tool.

Record ownership, intended use, model/prompt versions, evaluation evidence, retention policies, and a rollback procedure. Governance is the process of making and reviewing these decisions, not a checkbox added after deployment.

## 5. Deployment and operations

A liveness check asks whether the process is alive; readiness asks whether it can accept work. Do not restart a healthy worker repeatedly just because a provider is temporarily down. Drain work during shutdown, preserve checkpoints, and define what happens to an in-flight remote write.

Use staged rollout and compare candidate metrics against a baseline. Rollback can restore code, but database schema changes and side effects may need separate recovery. Backups are only useful if restoration is rehearsed. Test provider outages, database unavailability, duplicate queue delivery, and expired approval callbacks.

## 6. SLOs and cost limits with arithmetic

An SLI is a measured indicator; an SLO is its target over a stated window. A 99% success target over 10,000 eligible requests permits 100 failures within that simplified window. Define the denominator and exclusions before measuring. Fast errors do not satisfy a successful-latency goal.

A token reservation system can reject work before exceeding a budget. Reserve an estimated upper bound before dispatch; reconcile to actual usage after completion, and keep uncertain usage reserved until a defined reconciliation policy resolves it. An in-memory counter cannot enforce a shared distributed budget under concurrent workers.

Run `python 10-production/examples/admission_budget.py`. It demonstrates reservation, release, and rejection with a single-process fixture. It is not a production billing or distributed quota service.

## References

- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/): AI application risks.
- [Google SRE book: SLOs](https://sre.google/sre-book/service-level-objectives/): indicators, objectives, and measurement.
- [Kubernetes probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/): health semantics.
