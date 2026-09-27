# Model APIs: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Count attempts (15 minutes)

Run `python 02-model-apis/examples/retry_policy.py`. Predict outcomes for `[503, 429, 200]`, `[401, 200]`, and `[503, 503, 503, 200]` with a three-attempt budget. Add assertions for a first-attempt success.

**Pass criteria:** a permanent failure stops immediately; the fourth status is never consumed with a three-attempt budget; simulated delays are clearly separated from real waiting.

<details><summary>Expected results</summary>

The sequences yield success on attempt 3, permanent failure on attempt 1, and exhaustion on attempt 3. A maximum of three attempts means an initial call plus at most two retries.

</details>

## Exercise 2 — Design a stream adapter (25 minutes)

On paper process `text('hel')`, `text('lo')`, `failed('disconnect')`. Define the user-visible state and usage value. Then process a completed stream with usage. Calculate the fictional 1,500/300-token example from the lesson and double it for two identical attempts.

**Pass criteria:** the first output is an incomplete draft, unknown usage is not zero, and two attempts cost $0.0108 under the stated fictional rates.

<details><summary>Solution approach</summary>

Store accumulated text `hello`, terminal status `failed`, and usage `unknown`. A second request gets a separate attempt record. Only an actual completion signal marks a completed response; displayed text alone is insufficient.

</details>


## Quiz

Choose one answer per question.

### 1. Three maximum attempts allow how many retries?

- **A.** Three
- **B.** Two
- **C.** Unlimited

### 2. Why add jitter?

- **A.** Spread retry load over time
- **B.** Guarantee success
- **C.** Validate JSON

### 3. A stream disconnects after text. What is its state?

- **A.** Complete
- **B.** Free of cost
- **C.** Partial failure

### 4. Why expose adapter capabilities?

- **A.** To hide errors
- **B.** To avoid silently discarding requested features
- **C.** To make all models identical

### 5. Which bounds the total of attempts and backoff?

- **A.** Overall deadline
- **B.** Per-attempt read timeout alone
- **C.** Temperature

<details>
<summary>Answers and explanations</summary>

1. **B.** The initial call already consumes one attempt.

2. **A.** Jitter reduces synchronized bursts; it does not repair bad input.

3. **C.** Visible text does not establish completion or billing outcome.

4. **B.** Normalization must preserve meaningful differences.

5. **A.** Individual timeouts can add up beyond a user-facing limit.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
