# Frameworks: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Preserve a contract (20 minutes)

Run `python 11-frameworks/examples/adapter_contract.py`. Add a third fake adapter with different internal response keys and normalize it to the same result. Add an unsupported-capability error rather than silently dropping a requested feature.

**Pass criteria:** the application consumes one response shape; fake outputs are not called real framework measurements; unsupported behavior is explicit.

<details><summary>Solution approach</summary>

Translate provider/framework-specific fields inside an adapter. Keep output validation outside it as an application requirement too. The same fixture assertions should pass for every conforming adapter.

</details>

## Exercise 2 — Plan a fair comparison (30 minutes)

Choose plain Python and one framework from the lesson. Write a five-case dataset and a worksheet for versions, state persistence, malformed output, timeout, restart, and approval behavior. List which features are required and which are optional.

**Pass criteria:** both implementations solve the same problem; results remain blank until run; no universal winner is claimed from code size alone.

<details><summary>Reference answer</summary>

A useful result can be “the graph runtime simplified durable pause/resume but required more setup.” Another can be “the fixed pipeline gained little from a framework.” Support the conclusion with observed failure behavior and effort, not popularity.

</details>


## Quiz

Choose one answer per question.

### 1. Which is a protocol rather than an agent framework?

- **A.** MCP
- **B.** A custom agent loop
- **C.** A graph runtime

### 2. What should stay stable in a fair runtime comparison?

- **A.** Nothing
- **B.** Task contract and evaluation cases
- **C.** Only the project name

### 3. Does less code prove better recovery?

- **A.** Yes
- **B.** Only in Python
- **C.** No

### 4. Where should framework-specific objects be translated?

- **A.** Throughout every business function
- **B.** At an adapter boundary
- **C.** Inside the user prompt

### 5. Why use held-out data after DSPy-style optimization?

- **A.** To assess generalization beyond optimization examples
- **B.** To make the dataset larger automatically
- **C.** To eliminate model costs

<details>
<summary>Answers and explanations</summary>

1. **A.** MCP defines interoperability; the host still owns execution policy.

2. **B.** Different tasks cannot isolate runtime trade-offs.

3. **C.** Recovery must be tested under faults and restarts.

4. **B.** Boundary translation reduces coupling.

5. **A.** Optimizing and scoring only on the same examples can overfit.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
