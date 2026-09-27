# Agents: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Stop a loop (20 minutes)

Run `python 04-agents/examples/bounded_agent.py`. Change the repeated-call case from three turns to one. Add a scripted unsupported tool proposal and ensure it becomes a structured observation or terminal failure, never arbitrary execution.

**Pass criteria:** exactly one terminal status; no call after exhaustion; failure does not replenish the budget; output distinguishes a completed answer from partial work.

<details><summary>Solution approach</summary>

Count attempts in runtime code, not in model instructions. Dispatch through a fixed tool registry. Save each observation and return `budget_exhausted` when the loop limit is reached without a final answer.

</details>

## Exercise 2 — Design an approval pause (25 minutes)

An agent drafts a reply, pauses, then restarts after the user edits it. Define the persisted fields and state transitions. Decide whether approval of version 1 permits sending version 2.

**Pass criteria:** the edited draft needs a new approval; rejection and expiration stop sending; resuming does not rerun already completed writes blindly.

<details><summary>Reference answer</summary>

Store action ID, owner, draft ID, payload hash/version, creation/expiry times, and status. Compare the approved version against the current draft. A mismatch returns to pending review rather than carrying old consent forward.

</details>


## Quiz

Choose one answer per question.

### 1. What must enforce max turns?

- **A.** A prompt sentence alone
- **B.** Runtime code
- **C.** The retrieved document

### 2. Three turns with five tools per turn can use how many tools?

- **A.** At most three
- **B.** Always five
- **C.** Up to fifteen without another limit

### 3. When is a deterministic workflow a good choice?

- **A.** The steps and branches are known
- **B.** Never in AI systems
- **C.** Only with many agents

### 4. Does writer/critic agreement prove correctness?

- **A.** Yes
- **B.** No; shared biases can remain
- **C.** Yes if temperature is low

### 5. What should an expired approval do?

- **A.** Permit sending once
- **B.** Stop or request fresh approval
- **C.** Reset the tool budget

<details>
<summary>Answers and explanations</summary>

1. **B.** The component executing the loop must impose the bound.

2. **C.** Turn and tool-call budgets are independent.

3. **A.** Model autonomy is unnecessary for fixed logic.

4. **B.** Review needs evidence and calibrated criteria.

5. **B.** Expiration invalidates the action authorization, not merely its display.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
