# Foundations: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Follow the data (15 minutes)

A service accepts `{"count": 3}`. Decide what should happen for `{"count": "3"}`, `{"count": -1}`, and malformed JSON. Write a validator that requires an integer from 1 through 10; explicitly reject booleans, which are subclasses of `int` in Python.

**Pass criteria:** valid input succeeds; each invalid case has a clear failure; no work is scheduled before validation.

<details><summary>Solution approach</summary>

Parse with `json.loads`; require an object; check `type(value) is int` and `1 <= value <= 10`. A string is a type failure; -1 is a range failure; malformed JSON fails before field checks. Coercion is a design choice, but this exercise deliberately uses strict validation.

</details>

## Exercise 2 — Predict concurrency (20 minutes)

Run `python 00-foundations/examples/bounded_async.py`. It runs six simulated I/O jobs with a limit of two. Change the limit to one and then three. Write down the peak active count and explain why exact elapsed times vary. Add one job that raises an exception and decide whether other work should be cancelled or collected.

**Pass criteria:** peak activity never exceeds the configured bound; failures are visible; you can distinguish a semaphore from a bounded queue.

<details><summary>Expected reasoning</summary>

The original peak is two. Ideal waves are 6, 3, and 2 at limits 1, 2, and 3. Actual timings depend on scheduling. A semaphore controls active work; it does not limit the number of already-created tasks. A large input stream needs bounded admission too.

</details>


## Quiz

Choose one answer per question.

### 1. Does a Python annotation validate incoming JSON?

- **A.** Yes, always
- **B.** No, runtime validation is separate
- **C.** Only when using async

### 2. Which response usually needs credentials fixed rather than repeated?

- **A.** 503
- **B.** 429
- **C.** 401

### 3. What does a semaphore directly bound?

- **A.** Active operations holding permits
- **B.** Total queued input bytes
- **C.** Total cost forever

### 4. Why reserve a test split?

- **A.** To tune every prompt on it
- **B.** To estimate generalization after choices are made
- **C.** To guarantee perfect accuracy

### 5. Attention weights 0.25 and 0.75 mix values 2 and 10 into what?

- **A.** 12
- **B.** 6
- **C.** 8

<details>
<summary>Answers and explanations</summary>

1. **B.** Annotations describe expected types; they do not enforce input values. Async is unrelated.

2. **C.** Authentication failure usually needs intervention. Temporary unavailability and rate limits may allow bounded retries.

3. **A.** Queue capacity and cost accounting need separate controls.

4. **B.** Repeated tuning on test results leaks information into your choices.

5. **C.** The weighted sum is 0.5 + 7.5 = 8, not a plain sum or unweighted mean.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
