# 00 — Foundations

The engineering foundation for everything later in this repository. The goal is not to become a Python language expert first; it is to become comfortable enough with software systems that LLM behavior is the interesting variable in your experiments.

## Learning path

1. **Python for AI engineering** — modules, packages, virtual environments, typing, dataclasses, iterators, exceptions, logging, files, and CLI applications.
2. **HTTP and API fundamentals** — HTTP methods, headers, status codes, JSON, authentication, pagination, retries, and idempotency.
3. **Async and concurrency** — `asyncio`, tasks, timeouts, bounded concurrency, backpressure, and cancellation.
4. **JSON, typing, and schemas** — JSON Schema, Pydantic-style validation, serialization, enums, unions, and explicit contracts.
5. **Testing** — unit tests, integration tests, fixtures, mocks, contract tests, property-based tests, and deterministic test data.
6. **Docker** — images, containers, environment variables, networking, volumes, health checks, and local multi-service development.
7. **ML fundamentals** — vectors, matrices, probability, optimization, train/validation/test splits, loss functions, overfitting, and embeddings.
8. **Transformer fundamentals** — tokens, embeddings, attention, positional information, encoder/decoder patterns, autoregression, and inference.

## How to study each topic

Use the repository learning loop:

```text
concept → mental model → tiny implementation → experiment → failure test → notes
```

For every topic, write down:

- what problem the primitive solves
- the simplest implementation you can make yourself
- what breaks when scale or concurrency increases
- what a production library gives you beyond your implementation

## Build steps

### A. API client from scratch

Build a small Python client with:

1. `httpx` or the standard library HTTP stack
2. typed request/response objects
3. timeout handling
4. retry policy for transient failures
5. structured logs
6. tests with a fake server

Then add pagination, rate-limit handling, and idempotency keys.

### B. Async worker pool

Build a queue that consumes 100 tasks with a configurable concurrency limit. Add:

```python
sem = asyncio.Semaphore(10)

async def bounded_call(item):
    async with sem:
        return await process(item)
```

Experiment with concurrency of 1, 5, 10, 50 and record latency, failures, and throughput.

### C. Typed command service

Build a CLI that accepts JSON input and validates it against a typed model before executing a command. Deliberately feed invalid JSON, missing fields, wrong types, and unknown fields.

### D. Transformer notebook

Implement a tiny attention mechanism with NumPy. You do not need to train a useful language model. The goal is to understand how queries, keys, values, attention scores, and weighted sums fit together.

## Example labs

- Compare synchronous vs asynchronous API calls.
- Measure the effect of timeouts on tail latency.
- Build a retry policy and show why retrying every error is dangerous.
- Compare handwritten validation with JSON Schema/Pydantic-style validation.
- Implement scaled dot-product attention in under 50 lines.
- Containerize a tiny FastAPI service and add a health endpoint.

## Project suggestions

**Foundation Project 1 — API Reliability Kit**

A reusable Python package containing an HTTP client, retries, timeouts, rate-limit handling, typed schemas, logging, and tests.

**Foundation Project 2 — Async Job Runner**

A local task queue with bounded concurrency, cancellation, retries, dead-letter handling, and metrics.

**Foundation Project 3 — Mini Transformer**

A notebook/project implementing token embeddings, self-attention, a tiny transformer block, and greedy next-token generation over toy text.

## References

- Python documentation — https://docs.python.org/3/
- `asyncio` — https://docs.python.org/3/library/asyncio.html
- Python typing — https://docs.python.org/3/library/typing.html
- pytest — https://docs.pytest.org/
- Docker documentation — https://docs.docker.com/
- JSON Schema — https://json-schema.org/
- Hugging Face NLP course — https://huggingface.co/learn/nlp-course/
- Vaswani et al., *Attention Is All You Need* — https://arxiv.org/abs/1706.03762

## Exit criteria

Do not move on until you can build a small typed, tested, asynchronous API service without copying an architecture from a framework.