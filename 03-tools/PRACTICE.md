# Tools: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Trace four requests (20 minutes)

Run `python 03-tools/examples/tool_gateway.py`. Explain the difference between invalid arguments, missing approval, a duplicate key with the same payload, and a duplicate key with a changed payload. Add another user and confirm a key does not leak the first user's result.

**Pass criteria:** no operation before approval; same action has one stored result; changed action cannot reuse approval or a dedupe result.

<details><summary>Solution approach</summary>

Validate first, check server-provided identity and approval, then use a key scoped to user and operation. Compare the payload fingerprint before returning a prior result. An in-memory dictionary demonstrates the idea but is lost on restart and does not solve distributed races.

</details>

## Exercise 2 — Design a narrow invoice tool (25 minutes)

Write the contract for `lookup_invoice(invoice_id)`: inputs, outputs, identity source, permission rule, timeout, and three errors. Give the model a fake invoice ID from another tenant. Explain where rejection happens.

**Pass criteria:** tenant comes from authenticated context; query includes tenant scope; inaccessible objects do not expose private details; the LLM cannot override authorization.

<details><summary>Reference design</summary>

Use `(authenticated_tenant, invoice_id)` in the lookup. Return a minimal approved field set. Define invalid input, unavailable, and not-accessible errors. A model-supplied tenant field is either rejected or ignored in favor of trusted server identity, according to a documented closed contract.

</details>


## Quiz

Choose one answer per question.

### 1. A tool call from a model is what?

- **A.** Authorization
- **B.** A proposal requiring application checks
- **C.** Proof of user approval

### 2. Where should tenant identity come from?

- **A.** Authenticated server context
- **B.** Retrieved document text
- **C.** Model-generated arguments

### 3. Same idempotency key, different payload: what now?

- **A.** Return old success silently
- **B.** Execute again
- **C.** Reject a conflict

### 4. Does MCP replace authorization?

- **A.** Yes
- **B.** No
- **C.** Only for writes

### 5. A remote write times out. What is known?

- **A.** Nothing happened
- **B.** The outcome may be unknown
- **C.** Retry is always safe

<details>
<summary>Answers and explanations</summary>

1. **B.** The runtime must validate and authorize it.

2. **A.** Untrusted content cannot establish identity.

3. **C.** A key must identify one logical operation.

4. **B.** Interoperability and permission enforcement are separate concerns.

5. **B.** The receiver may have acted before the response was lost.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
