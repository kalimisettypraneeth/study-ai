# Evaluation: practice and self-check

[Lesson](DEEP-DIVE.md) · [Section home](README.md)

Work without the answers first. Suggested pace: 30–60 minutes for exercises, then 10 minutes for the quiz. These are original learning questions, not certification exam questions.


## Exercise 1 — Explain misleading accuracy (20 minutes)

Run `python 08-evaluation/examples/score_predictions.py`. Recompute precision, recall, and F1 by hand for TP=8, FP=2, FN=4, TN=86. Describe one task where missing a positive is expensive and one where false alarms are expensive.

**Pass criteria:** accuracy 94%, precision 80%, recall about 66.7%, F1 about 72.7%; metric choice is tied to the application rather than whichever number looks largest.

<details><summary>Solution approach</summary>

Precision measures how often positive predictions are correct; recall measures how many actual positives were found. Costs and review capacity determine the operating threshold. Do not treat a small synthetic example as evidence for a real deployment.

</details>

## Exercise 2 — Write a release gate (25 minutes)

Create eight cases: two normal, two ambiguous, two unanswerable, and two adversarial. Define expected behavior before trying prompts. Compare a hypothetical 7/8 candidate with one unsafe action against a 6/8 safe baseline.

**Pass criteria:** safety failures are reported separately; each case has a rubric; results are labeled hypothetical until executed; the candidate fails a zero-unsafe-actions gate.

<details><summary>Reference answer</summary>

Maintain per-case outcomes, aggregate task success, and a separate unsafe-execution count. Reject on any observed unsafe execution under this gate. Investigate whether the failure came from policy enforcement or a mislabeled case instead of averaging it away.

</details>


## Quiz

Choose one answer per question.

### 1. Precision divides true positives by what?

- **A.** All actual positives
- **B.** All positive predictions
- **C.** All negative predictions

### 2. Why report slices?

- **A.** They reveal failures hidden by averages
- **B.** They guarantee significance
- **C.** They eliminate labels

### 3. Should a judge override a forbidden tool execution?

- **A.** Yes if prose is fluent
- **B.** Yes if the model is large
- **C.** No

### 4. What happens if you repeatedly tune on the test set?

- **A.** It becomes development feedback
- **B.** It remains untouched evidence
- **C.** Accuracy becomes guaranteed

### 5. Zero failures in ten tests proves what?

- **A.** The system is always safe
- **B.** No failures were observed in those ten tests
- **C.** The failure probability is exactly zero

<details>
<summary>Answers and explanations</summary>

1. **B.** TP/(TP+FP); recall uses TP/(TP+FN).

2. **A.** Aggregate success can hide weakness on rare or hard cases.

3. **C.** Subjective quality does not cancel a deterministic safety violation.

4. **A.** You need fresh held-out evaluation for an independent estimate.

5. **B.** Small samples cannot establish universal safety.

</details>

## Mastery check

Explain one failure mode aloud, draw the control flow from memory, and rerun the exercise with a changed input. Aim for at least 4/5 on the quiz; revisit the explanation for every missed answer. A score alone does not replace the exercise.
