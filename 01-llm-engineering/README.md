# 01 — LLM Engineering

Treat an LLM as an engineering primitive before treating it as an agent. Learn how prompts, context, sampling, structured output, tools, and reliability controls interact.

## Learning path

1. **Tokens and context** — tokenization, context limits, long-context trade-offs, truncation, and context packing.
2. **Prompting** — instructions, role/context separation, examples, delimiters, decomposition, output constraints, and prompt versioning.
3. **Structured outputs** — JSON Schema, typed outputs, validation, refusal/error handling, and repair strategies.
4. **Tool calling** — tool schemas, arguments, dispatch, tool results, parallel calls, and tool errors.
5. **Streaming** — incremental output, partial state, cancellation, and user-facing progress.
6. **Sampling and decoding** — temperature, top-p, deterministic settings, repetition effects, and why model behavior varies.
7. **Model selection/routing** — capability, latency, context, cost, reliability, and task-based routing.
8. **Retries and failures** — transient vs permanent errors, exponential backoff, timeouts, malformed outputs, and fallbacks.
9. **Safety/security** — prompt injection, untrusted content, data leakage, unsafe tool use, permissions, and human approval.

## Mental model

Think of a model call as:

```text
inputs + instructions + available context
                ↓
          model inference
                ↓
       text / structured output
                ↓
 validation → business logic → next action
```

The model is probabilistic. Your application should provide the deterministic boundaries around it.

## Build steps

### A. Minimal model wrapper

Create a provider-neutral interface such as:

```python
class LLM:
    async def generate(self, request: Request) -> Response: ...
```

Implement one provider first. Then separate provider-specific code from your application code.

### B. Prompt experiment harness

Create a CLI that runs the same input through multiple prompt versions and stores:

```text
case_id, prompt_version, model, parameters, output, latency_ms, token_usage
```

Start with 20 examples. Change one variable at a time.

### C. Structured extraction

Ask the model to extract a typed object such as:

```json
{
  "title": "...",
  "priority": "high",
  "owners": ["..."]
}
```

Validate it. Add cases for missing fields, invalid enum values, extra fields, refusal, and malformed responses. Compare native structured-output support with a repair-and-retry approach.

### D. Tool-calling loop

Implement the loop without an agent framework:

```text
user request
   ↓
model chooses tool?
   ├─ no → final response
   └─ yes → validate args → execute tool → return result to model → repeat
```

Add a maximum number of tool turns and explicit tool permissions.

## Failure experiments

- Send a very long context and measure accuracy/latency.
- Remove important instructions and observe failure modes.
- Compare zero-shot vs few-shot prompts.
- Inject malicious instructions inside retrieved text.
- Return invalid tool arguments from the model.
- Make a tool slow or unavailable.
- Compare temperature 0 vs a higher temperature on the same test set.
- Compare direct answer vs tool-assisted answer.
- Measure the cost of retrying malformed structured output.

## Project suggestions

**LLM Project 1 — Prompt Lab**

A versioned prompt-evaluation harness with a small golden dataset, side-by-side output comparison, latency/token metrics, and regression detection.

**LLM Project 2 — Typed Extraction Service**

An API that converts messy text into validated domain objects and reports confidence/failure reasons rather than silently returning bad data.

**LLM Project 3 — Model Router**

Route requests between a fast/cheap model and a stronger model using task type, expected complexity, latency budget, and observed success rate.

**LLM Project 4 — Safe Tool Runtime**

A minimal runtime that lets a model call approved functions while enforcing schemas, permissions, timeouts, budgets, and audit logs.

## References

- OpenAI developer documentation — https://platform.openai.com/docs
- OpenAI Agents SDK — https://openai.github.io/openai-agents-python/
- Anthropic prompt engineering — https://docs.anthropic.com/
- Hugging Face transformers/course — https://huggingface.co/learn
- JSON Schema — https://json-schema.org/
- Vaswani et al., *Attention Is All You Need* — https://arxiv.org/abs/1706.03762

## Exit criteria

You should be able to explain why a model sometimes fails, reproduce the failure with a small test case, and add an application-level control rather than simply changing the model or prompt until it works.