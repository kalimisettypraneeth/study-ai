# Production: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Reserve before calling (20 minutes)

Run `python 10-production/examples/admission_budget.py`. Starting from 100 units, reserve 60, attempt to reserve 50, reconcile the first request to 40, and try 50 again. Explain what to do if the first request's usage is unknown.

**Pass criteria:** the second reservation initially fails; reconciliation releases 20; the later reservation succeeds; unknown usage is not treated as zero.

<details><summary>Solution</summary>

After reserving 60, only 40 remain. Settling at 40 spent restores 20 unused units, leaving 60 available. A new 50-unit reservation leaves 10 available. Unknown usage needs a conservative pending reservation and reconciliation policy. Distributed implementations need atomic shared state.

</details>

## Exercise 2 — Write an incident drill (30 minutes)

A policy assistant's retriever fails while its model remains healthy. Write the expected response, alert, trace fields, recovery check, and rollback condition. Then inject a document asking for credential disclosure.

**Pass criteria:** unavailable evidence produces an explicit degraded response; secrets never enter context; a forbidden tool action is blocked in code; recovery is verified before normal traffic resumes.

<details><summary>Reference answer</summary>

Return an evidence-unavailable status, record a retrieval error and correlation ID, and alert on the defined error-rate threshold. Restore retrieval, verify scoped sample queries, and use a staged recovery. A prompt-injection test must inspect actual tool execution, not just final wording.

</details>


## Quiz

Choose one answer per question.

### 1. What does a bounded queue provide?

- **A.** Infinite throughput
- **B.** Temporary buffering with explicit capacity
- **C.** Automatic authorization

### 2. Where should permissions be enforced?

- **A.** Only in the system prompt
- **B.** Only in a diagram
- **C.** At the server/tool/data boundaries

### 3. What does readiness mean?

- **A.** Able to accept work under its contract
- **B.** The process has a PID
- **C.** The last answer was fluent

### 4. At 99% success over 10,000 eligible requests, allowed failures?

- **A.** 10
- **B.** 100
- **C.** 1,000

### 5. What should a shared response cache include in its isolation design?

- **A.** Only question text
- **B.** Tenant and relevant version/config scope
- **C.** Only output length

<details>
<summary>Answers and explanations</summary>

1. **B.** It cannot make an overloaded system infinitely scalable.

2. **C.** Untrusted model decisions cannot enforce their own authority.

3. **A.** Liveness and readiness answer different operational questions.

4. **B.** One percent of 10,000 is 100 under the stated simplified window.

5. **B.** Otherwise one user or outdated configuration can contaminate another response.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
