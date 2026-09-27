# RAG: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Compute retrieval metrics (20 minutes)

Relevant IDs are `{A,C,D}` and a ranked result is `[B,A,C]`. Compute precision@3 and recall@3. Then run `python 06-rag/examples/hybrid_search.py` and identify which documents are excluded by tenant scope.

**Pass criteria:** both manual metrics equal 2/3 for this fixture; protected documents never enter the output; absent documents receive no RRF contribution.

<details><summary>Solution</summary>

Two of three results are relevant, and two of the three relevant items were found. The numerators match here, but the denominators mean different things. If five results had been returned with the same two hits, precision would be 2/5 while recall remained 2/3.

</details>

## Exercise 2 — Chunk a policy (30 minutes)

Create three short synthetic paragraphs: return deadline, exceptions, and contact process. Include a heading and a dated policy version. Compare fixed-size chunks with paragraph chunks for “Can I return a sale item after 30 days?” Add an unanswerable question about a nonexistent warranty.

**Pass criteria:** exception text remains attached to the rule or retrievable alongside it; source/version metadata survives; missing warranty evidence produces abstention rather than invention.

<details><summary>Expected reasoning</summary>

A deadline chunk without an exception can cause a confident wrong answer. Retrieve and pack both relevant passages, then cite them. Measure retrieval failure separately from generation failure; adding a larger model does not repair a missing exception.

</details>


## Quiz

Choose one answer per question.

### 1. Does RAG normally update model weights?

- **A.** Yes
- **B.** No, it supplies inference-time evidence
- **C.** Only with keyword search

### 2. What can a reranker do?

- **A.** Recover every missing document
- **B.** Grant permission
- **C.** Reorder the supplied candidates

### 3. Why use rank fusion instead of averaging arbitrary scores?

- **A.** Rank avoids directly mixing incompatible score scales
- **B.** It guarantees truth
- **C.** It removes authorization checks

### 4. When must private evidence be filtered?

- **A.** Only after displaying the answer
- **B.** Before exposure to the model or unauthorized services
- **C.** Only if the score is low

### 5. Two relevant hits from five results, with four relevant items total: recall?

- **A.** 2/5
- **B.** 4/5
- **C.** 2/4

<details>
<summary>Answers and explanations</summary>

1. **B.** Fine-tuning changes weights; retrieval supplies context.

2. **C.** Candidate recall limits downstream reranking.

3. **A.** RRF combines ranks, but still needs evaluation and security controls.

4. **B.** A later filter cannot undo a prior disclosure.

5. **C.** Recall divides retrieved relevant items by all relevant items; 2/5 is precision.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
