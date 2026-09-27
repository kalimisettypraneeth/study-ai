# Memory: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Scope and expiration (20 minutes)

Run `python 05-memory/examples/scoped_memory.py`. Add a record that expires exactly at the simulated current time. Decide whether it should be retrieved. Add a record for another user with identical content.

**Pass criteria:** expiration at `now` is excluded; matching content never bypasses user scope; deletion affects the next read.

<details><summary>Expected reasoning</summary>

Use `expires_at is None or expires_at > now`. Query within the authenticated scope before constructing context. A semantic match is not a permission grant.

</details>

## Exercise 2 — Resolve a correction (25 minutes)

Design records for “prefer short answers” and “for certification lessons, explain in depth.” Decide whether the second replaces the first or adds a scoped preference. Then list every storage location affected by deleting the source conversation.

**Pass criteria:** scope is explicit; provenance is retained where appropriate; the deletion plan includes derived memories, embeddings, and caches.

<details><summary>Reference answer</summary>

The second can be a certification-specific override while the first remains a global default. If deletion should remove derived preferences, track their source IDs so you can locate them. Backup retention must be stated separately.

</details>


## Quiz

Choose one answer per question.

### 1. Which is run state?

- **A.** A general writing preference
- **B.** The next workflow node to execute
- **C.** A historical vacation note

### 2. Can similarity grant access to another user’s memory?

- **A.** Yes at high scores
- **B.** Only in a vector database
- **C.** No

### 3. What does provenance provide?

- **A.** A traceable source for the record
- **B.** Guaranteed truth
- **C.** Unlimited retention

### 4. A TTL has elapsed. What should retrieval do?

- **A.** Use it if similar
- **B.** Exclude it even before cleanup
- **C.** Increase its confidence

### 5. Why track derived summaries during deletion?

- **A.** They may retain deleted information
- **B.** They are always harmless
- **C.** They never contain facts

<details>
<summary>Answers and explanations</summary>

1. **B.** It is necessary to resume current execution.

2. **C.** Authorization is independent of ranking.

3. **A.** Sources can still be wrong, but can be inspected and corrected.

4. **B.** Logical expiration must not depend on cleanup timing.

5. **A.** Deleting only the original row can leave the same information elsewhere.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
