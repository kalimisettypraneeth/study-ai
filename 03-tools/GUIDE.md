# 03 — Tools: Learning Guide

This guide expands the section README with the build sequence, experiments, references, and project ideas.

## Core model

```text
model decision
     ↓
select tool → validate arguments → authorize → execute
                                      ↓
                              tool result/error
                                      ↓
                                  model loop
```

The model should not directly own privileged capabilities. The runtime owns validation, authorization, timeouts, budgets, execution, and auditability.

## Learning path

1. Tool schemas and argument contracts
2. Tool registration and discovery
3. Argument validation and normalization
4. Execution and result serialization
5. Tool errors and retry policy
6. Idempotency and side effects
7. Authorization and least privilege
8. Sandboxing untrusted execution
9. Audit logging and traceability
10. Remote tools/protocols such as MCP

## Build sequence

### A. Function tool registry

Define a typed registry with name, description, input schema, handler, and permissions. Start with `calculator`, `search`, and `get_time`.

### B. Dispatcher

Implement:

```text
lookup → validate JSON → authorize → check budget/deadline → execute → serialize result
```

Return structured errors. Never expose raw stack traces or secrets to the model.

### C. Safe side effects

Build a mock `send_email` or `create_ticket` tool. Require approval for side effects and attach idempotency keys so retries cannot silently duplicate work.

### D. Sandbox experiment

Run a toy code-execution tool inside a constrained container. Document what the sandbox protects and what it does not protect. Treat it as a learning exercise, not a production security boundary.

### E. Protocol experiment

Build a tiny MCP client/server and compare the protocol boundary with your local function registry. Identify which concerns the protocol solves and which remain application responsibilities.

## Failure experiments

- invalid and missing arguments
- malformed tool output
- timeout/hanging tool
- unavailable dependency
- repeated tool calls
- unauthorized privileged call
- prompt injection in tool output
- side-effect retry after partial success

## Project suggestions

**Tool Runtime** — registry, schemas, dispatcher, permissions, timeouts, retries, audit logs, and idempotency.

**Personal Automation Toolbox** — safe local tools with explicit permissions and an approval step for writes.

**MCP Learning Server** — expose read-only domain tools through MCP and compare it with local function calling.

## References

- Model Context Protocol — https://modelcontextprotocol.io/
- OpenAI Agents SDK tools — https://openai.github.io/openai-agents-python/tools/
- JSON Schema — https://json-schema.org/
- OWASP Top 10 for LLM Applications — https://owasp.org/www-project-top-10-for-large-language-model-applications/

## Exit criteria

You can explain exactly where a tool request becomes a real side effect, which policy checks happen before execution, and how the system behaves when execution fails halfway through.