# LLM engineering: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Separate syntax from truth (20 minutes)

Run `python 01-llm-engineering/examples/validate_ticket.py`. Add a structurally valid record with a made-up account ID. Explain why the validator accepts its shape and which source check must still reject it. Add one missing-field and one extra-field case.

**Pass criteria:** distinguish parsing, schema, and evidence failures; keep absent facts null; never authorize a refund from the classification alone.

<details><summary>Solution approach</summary>

Shape validation can establish that an account ID is a string or null. It cannot establish that the string belongs to the customer. Compare it with authenticated account data or explicit source evidence. An unknown field should fail the closed schema used by the example.

</details>

## Exercise 2 — Build a prompt experiment (30 minutes)

Write six ticket fixtures: two billing, two technical, one ambiguous, one with hostile instructions. Draft a zero-shot prompt and a few-shot prompt. Before any live calls, create a results table for expected label, predicted label, schema validity, and unsupported claims. Reserve two additional unseen tickets for a final check.

**Pass criteria:** identical input cases and output contract for both prompts; no invented benchmark results; clearly mark fixture-only preparation versus real model observations.

<details><summary>Expected reasoning</summary>

Few-shot examples may improve label interpretation but can also anchor the model to their wording. Change only the examples first. Judge labels against a rubric and inspect unsupported claims separately; a correctly labeled hallucination is still a failure.

</details>


## Quiz

Choose one answer per question.

### 1. What does valid JSON prove?

- **A.** The facts are true
- **B.** The user authorized an action
- **C.** The output follows JSON syntax

### 2. What is the evidence allowance in the fictional budget above?

- **A.** 5,000 tokens before overhead
- **B.** 8,000 words
- **C.** 7,000 characters

### 3. When should streamed tool arguments execute?

- **A.** On the first fragment
- **B.** After completion, validation, and authorization
- **C.** Whenever a brace appears

### 4. Does temperature zero guarantee truth?

- **A.** Yes
- **B.** Only for billing
- **C.** No

### 5. Which comparison isolates the value of few-shot examples?

- **A.** Change model, dataset, and schema too
- **B.** Keep other conditions fixed and change examples
- **C.** Use different questions for each prompt

<details>
<summary>Answers and explanations</summary>

1. **C.** Schema, factual support, and authorization require further checks.

2. **A.** Subtract all reservations from 8,000; tokens are neither words nor characters.

3. **B.** A partial JSON fragment is not a complete authorized action.

4. **C.** Sampling settings do not establish factual support.

5. **B.** Changing multiple factors prevents attributing the outcome to examples.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
