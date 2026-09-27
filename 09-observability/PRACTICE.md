# Observability: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Read a trace (20 minutes)

Using the 4-second walkthrough, calculate the fraction spent in queue plus backoff. Run `python 09-observability/examples/trace_summary.py` and explain its percentile convention. Add one slow synthetic request and observe the p95 change.

**Pass criteria:** queue plus backoff is 1.5/4 = 37.5%; you can explain why five samples are insufficient for a stable tail estimate.

<details><summary>Solution approach</summary>

Keep queue, retry wait, and provider time separate. Use `ceil(p*n)-1` as the zero-based index for nearest-rank percentiles. Document sample size and do not average host percentiles.

</details>

## Exercise 2 — Design safe telemetry (20 minutes)

Given fields `trace_id`, `duration_ms`, `prompt`, `api_key`, `tool_name`, and `status`, create an allowlist for a metadata-only trace. Decide where a per-request ID belongs.

**Pass criteria:** prompts and keys are excluded; request IDs do not become metric labels; missing usage remains unknown rather than zero.

<details><summary>Reference answer</summary>

Allow trace ID, duration, tool name, and status after validating their values. Keep IDs in trace/log records. A strict allowlist is safer than assuming all unknown keys are harmless; even allowed string fields need bounded values.

</details>


## Quiz

Choose one answer per question.

### 1. Which connects related operations for one request?

- **A.** A trace
- **B.** A random metric count
- **C.** Only a screenshot

### 2. Why avoid request IDs as metric labels?

- **A.** They are always secret
- **B.** They create unbounded cardinality
- **C.** They prevent logs

### 3. Can you average host p95s to get global p95?

- **A.** Always
- **B.** Only with a dashboard
- **C.** Generally no

### 4. What does unknown usage mean?

- **A.** Zero billed tokens
- **B.** Usage was not established
- **C.** No request was made

### 5. Why can child span durations exceed parent duration when added?

- **A.** The trace is necessarily corrupt
- **B.** Children can overlap
- **C.** All clocks stop

<details>
<summary>Answers and explanations</summary>

1. **A.** Spans and propagated identifiers form the operation history.

2. **B.** Unique values produce too many time series.

3. **C.** Percentiles are not additive; combine distributions or samples.

4. **B.** Absence of a usage record is not proof of free execution.

5. **B.** Parallel work overlaps in wall-clock time.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
