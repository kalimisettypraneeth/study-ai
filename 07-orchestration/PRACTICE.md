# Orchestration: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Resume a committed step (20 minutes)

Run `python 07-orchestration/examples/checkpoint_resume.py`. Observe the intermediate state after the injected failure and the final state after restart. Add a second resume after completion.

**Pass criteria:** completed local steps do not repeat; a second completed resume is a no-op; state survives opening a new database connection.

<details><summary>Expected reasoning</summary>

The transaction commits the intermediate state before the simulated crash. Restart reads it and executes the remaining local step. This proves only the demonstrated local persistence behavior, not atomicity with a remote service.

</details>

## Exercise 2 — Find the duplicate-send window (25 minutes)

Draw `send email → save sent status` and inject a crash between those operations. Propose a recovery policy when the send API has no documented idempotency key. Include duplicate human callbacks and an edited draft.

**Pass criteria:** no claim of exactly-once delivery from a local flag; unknown outcome leads to reconciliation or manual review; approval binds to the draft version.

<details><summary>Reference answer</summary>

Persist intent and a stable operation ID before sending; claim it atomically. After an ambiguous failure, query available remote status or identifiers, and pause for review if the outcome cannot be established safely. A second callback sees an existing pending/sending/sent state rather than starting an independent send.

</details>


## Quiz

Choose one answer per question.

### 1. Which work can safely run in parallel by dependency alone?

- **A.** B needs A’s result
- **B.** Independent A and B
- **C.** A edits B’s unprotected state

### 2. Does a checkpoint guarantee exactly-once remote effects?

- **A.** Yes
- **B.** Only if JSON
- **C.** No

### 3. What is compensation?

- **A.** A business action attempting to undo an effect
- **B.** A database backup
- **C.** An unlimited retry

### 4. What should survive a human pause?

- **A.** Only an open Python stack
- **B.** A durable versioned pending action
- **C.** Only a model’s prediction

### 5. What does at-least-once delivery allow?

- **A.** No deliveries
- **B.** Possible duplicate deliveries
- **C.** Exactly one delivery in all failures

<details>
<summary>Answers and explanations</summary>

1. **B.** Independence permits parallel scheduling, though quotas still apply.

2. **C.** The remote write and local checkpoint can have a crash gap.

3. **A.** It is not guaranteed to be perfect or successful.

4. **B.** Process memory is insufficient for restart recovery.

5. **B.** Consumers must handle duplicates appropriately.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
