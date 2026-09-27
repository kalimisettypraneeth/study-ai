# AIF-C01 domain quizzes

Original study questions, not official exam questions or exam dumps. Take each five-question set after its domain lesson; reveal answers only afterward. These short sets do not reproduce the length or weighting of a full exam.

The [official exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) remains authoritative. Scope references checked on 2026-09-27; service interfaces can change.

## Domain 1

[Review the lesson](01-FOUNDATIONS.md). Record your choice and explain why the other choices fail.

**1. Predicting a numeric delivery time is usually which task?**

A. Clustering; B. Regression; C. Classification

**2. What distinguishes supervised learning?**

A. Labeled target examples; B. No training data; C. Only neural networks

**3. Which metric emphasizes finding actual positives?**

A. Precision; B. Storage size; C. Recall

**4. Training accuracy is high but held-out accuracy is poor. What is a likely issue?**

A. Overfitting; B. Guaranteed robustness; C. Perfect generalization

**5. Which is inference?**

A. Adjusting weights; B. Predicting on a new example; C. Labeling training data

<details><summary>Answers and rationales</summary>

1. B — the target is a number. Clustering groups inputs and classification chooses a category.

2. A — labels supply target outcomes; many model families can use them.

3. C — recall is TP/(TP+FN), so missed positives reduce it.

4. A — the model may capture training-specific details; investigate leakage and distribution differences too.

5. B — inference uses the trained model; training changes it.

</details>

## Domain 2

[Review the lesson](02-GENAI.md). Record your choice and explain why the other choices fail.

**1. What does an embedding produce?**

A. A guaranteed answer; B. Authorization; C. A numerical representation

**2. Is one token always one word?**

A. No; B. Yes; C. Only in a database

**3. What does a context window describe?**

A. Permanent training memory; B. Input/context capacity under model limits; C. Database retention

**4. Which change alone proves a statement true?**

A. Lower temperature; B. Longer output; C. Neither

**5. Which is a useful business evaluation?**

A. Correctly resolved requests and cost; B. Only response length; C. Only model size

<details><summary>Answers and rationales</summary>

1. C — embeddings support comparison and downstream tasks, not factual guarantees.

2. A — tokenization varies by model and language.

3. B — exact input/output accounting depends on the provider; it is not durable memory.

4. C — factual support requires evidence or verification.

5. A — it relates quality and resources to the intended outcome.

</details>

## Domain 3

[Review the lesson](03-FM-PROMPT-RAG.md). Record your choice and explain why the other choices fail.

**1. Which is a strong first option for changing internal policies?**

A. Daily pre-training from scratch; B. RAG with current sources; C. Remove all context

**2. What changes model parameters?**

A. Fine-tuning; B. Adding a passage to a prompt; C. Retrieving a document

**3. A few-shot prompt contains what?**

A. No examples; B. Only a model name; C. Several task examples

**4. Does reference word overlap alone prove factuality?**

A. Yes; B. No; C. Only for long answers

**5. What is distillation intended to transfer?**

A. Useful teacher behavior to a student model; B. User permissions into text; C. All training data into a cache

<details><summary>Answers and rationales</summary>

1. B — retrieval supplies current evidence without retraining weights each time.

2. A — the other options change inference-time context.

3. C — examples illustrate expected behavior but still need evaluation.

4. B — overlap-based metrics are useful signals, not a complete factuality test.

5. A — it can produce a smaller model with different quality/cost trade-offs.

</details>

## Domain 4

[Review the lesson](04-RESPONSIBLE-AI.md). Record your choice and explain why the other choices fail.

**1. Which reveals an issue hidden by overall accuracy?**

A. More generated words; B. A larger logo; C. Metrics by relevant group or slice

**2. Which describes transparency?**

A. Explaining purpose, limitations, and data origins; B. Encrypting a disk only; C. Hiding evaluation results

**3. Does removing a sensitive column eliminate all bias?**

A. Yes; B. No, proxies and other causes can remain; C. Only for text

**4. What makes human review meaningful?**

A. Approving automatically; B. Hiding evidence; C. Evidence, time, authority to reject, and escalation

**5. Who should own investigation and correction of harms?**

A. An accountable designated owner; B. Nobody; C. Only the generated answer

<details><summary>Answers and rationales</summary>

1. C — averages can hide unequal errors.

2. A — transparency provides relevant information about the system.

3. B — sampling, labels, proxies, and deployment choices can still create disparities.

4. C — oversight must be operationally usable.

5. A — accountability requires a real responsibility and correction process.

</details>

## Domain 5

[Review the lesson](05-SECURITY-GOVERNANCE.md). Record your choice and explain why the other choices fail.

**1. Which primarily manages encryption keys?**

A. CloudWatch; B. KMS; C. Artifact

**2. Which primarily supports operational metrics and alarms?**

A. CloudWatch; B. Artifact; C. An embedding

**3. Where can you inspect relevant AWS API activity for audit?**

A. Only a prompt; B. A tokenizer; C. CloudTrail

**4. Do content guardrails replace authorization?**

A. Yes; B. No; C. Only for private data

**5. What does shared responsibility imply?**

A. AWS owns every application setting; B. Customers own no data policy; C. Responsibilities vary by service and customers retain important controls

<details><summary>Answers and rationales</summary>

1. B — KMS manages cryptographic keys; monitoring and reports have different roles.

2. A — CloudWatch supports operational monitoring.

3. C — CloudTrail records supported activity; logging configuration and coverage still matter.

4. B — identity and resource access must be independently enforced.

5. C — managed infrastructure does not remove customer responsibility for identities, data, and configuration.

</details>

## Review log

| Domain | Score / 5 | Missed concept | Your corrected explanation | Retest date |
|---|---:|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

Aim for at least 4/5 in each set, then explain one new scenario without notes. A quiz score is not a guarantee of exam performance.
