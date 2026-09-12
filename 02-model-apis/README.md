# 02 — Model APIs

Build a reliable boundary between your application and model providers. The durable skill here is not memorizing one SDK; it is designing contracts that survive provider and model changes.

## Learning path

1. Client construction and authentication
2. Request/response contracts
3. Streaming responses
4. Timeouts and cancellation
5. Retries and exponential backoff
6. Rate limits and concurrency control
7. Fallbacks and model routing
8. Caching and deduplication
9. Token/cost accounting
10. Provider abstraction and portability

## Build sequence

### 1. Single-provider client

Create a typed wrapper with:

```text
Application
   ↓
LLM interface
   ↓
Provider adapter
   ↓
HTTP/SDK
```

Keep provider-specific message formats and error types inside the adapter.

### 2. Reliability layer

Add:

- connect/read/request timeouts
- bounded retries
- exponential backoff + jitter
- retry classification
- rate-limit handling
- cancellation
- structured error objects

Never retry validation errors, permission errors, or other known permanent failures by default.

### 3. Streaming adapter

Expose a common event model such as:

```text
text_delta | tool_call_delta | usage | completed | failed
```

Write a small terminal UI that renders streaming text and logs non-text events.

### 4. Routing layer

Implement a policy function:

```python
def choose_model(task, latency_budget, cost_budget, quality_history):
    ...
```

Start with deterministic rules. Later compare rules with an LLM-based router and evaluate whether the added complexity improves outcomes.

### 5. Usage ledger

Store per request:

```text
request_id
model
input_tokens
output_tokens
latency_ms
status
estimated_cost
retry_count
```

This becomes the raw material for cost and performance experiments in later sections.

## Example exercises

- Build the same chat client against two providers.
- Simulate 429, 500, timeout, and malformed-response failures.
- Measure throughput as concurrency increases.
- Compare cached vs uncached repeated requests.
- Implement a fallback model and measure recovery rate.
- Replay a fixed workload and compare cost/latency/quality across models.

## Project suggestions

**Provider Gateway** — one internal API for several LLM providers with common request types, streaming events, retries, usage accounting, and routing.

**LLM Load Tester** — replay a workload at controlled concurrency and produce latency percentiles, error rates, token usage, and cost estimates.

**Cost Guardrail Service** — enforce per-user/request budgets and stop or downgrade work when the budget is exceeded.

## References

- OpenAI developer docs — https://platform.openai.com/docs
- Anthropic developer docs — https://docs.anthropic.com/
- Google AI for developers — https://ai.google.dev/gemini-api/docs
- HTTP semantics — https://developer.mozilla.org/en-US/docs/Web/HTTP
- Python `httpx` — https://www.python-httpx.org/

## Exit criteria

You can swap the underlying provider adapter without rewriting the rest of the application, and you can show how retries, concurrency, caching, and routing change measurable system behavior.