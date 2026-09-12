# 10 — Production

Turn prototypes into reliable AI services. Production engineering starts when the system has real users, real data, real permissions, and real failure costs.

## Learning path

1. Service architecture and boundaries
2. Deployment and configuration
3. Resilience and retries
4. Queues and concurrency
5. Caching and rate limits
6. Security and prompt injection defense
7. Secrets and permissions
8. Sandboxing
9. Cost/latency controls
10. Governance, incident response, and change management

## Build sequence

### A. Service boundary

Expose the AI application through an API. Keep model access, tools, retrieval, and persistence behind clear interfaces.

### B. Resilience

Add:

- request deadlines
- bounded retries
- circuit-breaker behavior where appropriate
- queue-based background work
- cancellation
- graceful degradation
- health/readiness checks

### C. Security

Use least privilege. Treat user input, web content, retrieved documents, and tool outputs as untrusted. Keep secrets out of prompts and model-visible tool results unless explicitly required.

Create policies for:

```text
identity → authorization → tool permissions → data access → audit
```

### D. Prompt-injection exercise

Create a benchmark containing malicious instructions embedded in retrieved documents. Verify that the model can summarize the content without treating the content as higher-priority system instructions.

### E. Production controls

Add hard limits for:

- request rate
- model turns
- tool calls
- execution time
- token/cost budget
- maximum context size

### F. Incident response

Write a runbook for provider outage, runaway agent loop, data leak, unsafe tool execution, queue backlog, and cost spike. Practice restoring service with a degraded mode.

## Project suggestions

**Production Agent Service** — API, queue, persistent state, tools, RAG, evaluation gate, tracing, metrics, auth, rate limits, and deployment.

**Secure Tool Gateway** — centralized policy enforcement for tool calls with identity, authorization, audit logs, budgets, and sandbox boundaries.

**AI Incident Simulator** — inject failures such as provider outage, tool compromise, prompt injection, latency spike, or runaway loops and document recovery.

## References

- OWASP Top 10 for LLM Applications — https://owasp.org/www-project-top-10-for-large-language-model-applications/
- OpenTelemetry — https://opentelemetry.io/docs/
- Docker — https://docs.docker.com/
- Kubernetes documentation — https://kubernetes.io/docs/
- Model Context Protocol — https://modelcontextprotocol.io/

## Exit criteria

You can deploy the system, observe it, enforce security boundaries, control cost and concurrency, recover from major failure modes, and explain what happens when an AI component is unavailable.