# 08 — Evaluation

Agents and LLM applications are probabilistic, so “the code passed” is not enough. Evaluation should measure whether the system solves the intended task safely, consistently, efficiently, and with acceptable cost.

## Learning path

1. Define the task and success criteria
2. Build small golden datasets
3. Unit/integration tests around deterministic code
4. Model-output evaluation
5. Tool-call evaluation
6. Retrieval evaluation
7. Trace-level evaluation
8. LLM-as-judge with calibration
9. Regression testing
10. Adversarial testing and red teaming

## Build sequence

### A. Golden dataset

Create 25–100 representative cases with:

```text
input
expected properties
expected tool behavior
reference answer (when practical)
metadata/tags
```

Start with edge cases, not only happy paths.

### B. Deterministic metrics

Examples:

- exact match
- JSON/schema validity
- required-field completeness
- tool name/argument correctness
- retrieval recall@k
- citation presence
- latency/cost thresholds

### C. Semantic evaluation

Use reference answers or a judge model for qualities that are difficult to score exactly. Calibrate the judge against human labels and inspect disagreements.

### D. Trace evaluation

Evaluate a whole run, not only its final text. Examples:

```text
did it use the right tool?
did it retrieve sufficient evidence?
did it exceed turn/budget limits?
did it expose sensitive data?
did it recover from a failed tool?
```

### E. Regression gate

Run the same suite whenever prompts, models, tools, retrieval settings, or orchestration logic change. Store results with version identifiers.

## Example evaluation report

```text
model: ...
prompt_version: ...
dataset_version: ...
pass_rate: ...
tool_success_rate: ...
retrieval_recall@5: ...
median_latency_ms: ...
p95_latency_ms: ...
estimated_cost: ...
safety_failures: ...
```

## Adversarial cases

Test prompt injection, conflicting instructions, malformed tool arguments, tool poisoning, long-context distraction, data exfiltration attempts, repeated tool loops, and budget exhaustion.

## Project suggestions

**Eval Harness** — CLI/API that runs a fixed dataset against multiple model/prompt versions and emits a comparison report.

**Agent Regression Suite** — trace-based tests for tool selection, safety policy, termination, and output quality.

**RAG Evaluation Lab** — separately measure retrieval quality, grounding, citation correctness, and final-answer quality.

## References

- OpenAI evaluation guidance — https://platform.openai.com/docs
- Anthropic docs — https://docs.anthropic.com/
- RAG evaluation concepts — https://docs.llamaindex.ai/
- OWASP LLM security resources — https://owasp.org/www-project-top-10-for-large-language-model-applications/

## Exit criteria

You have a reproducible dataset, objective metrics where possible, calibrated subjective metrics where necessary, and a regression process that detects when a change improves one dimension while harming another.