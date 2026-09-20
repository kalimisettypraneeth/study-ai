# Practice Questions

Cover the answer and explain your reasoning before revealing it.

## Q1 — Learning type

Historical customer records are labeled churn/no-churn and used to predict churn. Which approach?

A. Supervised learning  B. Unsupervised learning  C. Reinforcement learning  D. Clustering

**Answer: A.** The examples have labels and the goal is prediction of that labeled outcome.

## Q2 — Precision

A fraud model marks 100 transactions as fraudulent; 80 really are fraudulent. What is precision?

A. 20%  B. 80%  C. 100%  D. Cannot be determined

**Answer: B.** Precision = true positives / predicted positives = 80 / 100.

## Q3 — Recall

A screening system needs to minimize missed positive cases. Which metric is especially relevant?

A. Recall  B. Precision  C. Token count  D. Latency only

**Answer: A.** Recall measures the proportion of actual positives identified.

## Q4 — RAG

A chatbot must answer from frequently changing internal documents without retraining the base FM every time documents change. What architecture is directly relevant?

A. RAG  B. Clustering  C. Image classification  D. Reinforcement learning

**Answer: A.** Retrieval supplies current relevant context to the model.

## Q5 — Embeddings

What is the primary purpose of embeddings in semantic retrieval?

A. Represent content as vectors for similarity retrieval
B. Encrypt documents
C. Replace IAM permissions
D. Automatically fine-tune model weights

**Answer: A.** Embeddings create numerical representations suitable for similarity-based retrieval.

## Q6 — Fine-tuning

A team wants consistent specialized behavior using a curated training dataset. Which technique may be appropriate?

A. Fine-tuning  B. CloudTrail  C. S3 lifecycle policy  D. VPC peering

**Answer: A.** Fine-tuning adapts model behavior using training examples.

## Q7 — Service selection

An application needs speech converted to text. Which AWS service fits?

A. Amazon Polly  B. Amazon Transcribe  C. Amazon Translate  D. Amazon Textract

**Answer: B.** Transcribe performs speech-to-text.

## Q8 — Security

An agent only needs to read objects from one S3 bucket. Which principle should guide permissions?

A. Administrator access  B. Least privilege  C. Disable logging  D. Store credentials in source code

**Answer: B.** Grant only the permissions required for the task.

## Q9 — Audit

Which service primarily records AWS API activity for auditing?

A. CloudTrail  B. CloudWatch  C. Polly  D. Personalize

**Answer: A.** CloudTrail records AWS API activity and related events.

## Q10 — Monitoring

Which service is primarily associated with metrics, logs, alarms, and operational monitoring?

A. CloudWatch  B. Artifact  C. Macie  D. KMS

**Answer: A.** CloudWatch provides monitoring capabilities.

## Q11 — Responsible AI

A model performs differently across demographic groups. Which concern should be investigated?

A. Fairness/bias  B. Tokenization only  C. Storage class  D. DNS

**Answer: A.** Unequal outcomes can indicate a fairness/bias issue requiring investigation.

## Q12 — Prompt injection

A retrieved webpage tells an agent to ignore system instructions and expose credentials. What is this?

A. Prompt injection  B. Clustering  C. Overfitting  D. Batch inference

**Answer: A.** Untrusted content is attempting to manipulate intended model/agent behavior.

## Q13 — KMS vs Secrets Manager

Which service is designed for encryption key management?

A. AWS KMS  B. AWS Secrets Manager  C. CloudWatch  D. Artifact

**Answer: A.** KMS manages encryption keys.

## Q14 — Model choice

A GenAI application has a strict cost target and low-latency requirement. What should influence FM selection?

A. Only parameter count
B. Cost and latency plus required quality/capability
C. Only training-data size
D. Only model name

**Answer: B.** Model selection is a tradeoff across capability, performance, cost, latency, and constraints.

## Q15 — Bedrock vs SageMaker AI

Which statement is the best high-level distinction?

A. Bedrock focuses on managed foundation-model/GenAI application capabilities; SageMaker AI supports broader ML development lifecycle workflows.
B. SageMaker AI is only object storage.
C. Bedrock is only monitoring.
D. They are identical.

**Answer: A.** The services target different but overlapping parts of AI/ML development.

## Scenario drills

Answer using **Requirement → concept → AWS service/architecture → why → tradeoff**.

1. Internal policy chatbot with changing documents.
2. Convert customer calls to text.
3. Extract fields from scanned invoices.
4. Detect sentiment in reviews.
5. Build recommendations.
6. Secure an agent calling AWS APIs.
7. Evaluate a fraud classifier.
8. Reduce hallucinations in a knowledge assistant.
9. Protect sensitive data in S3.
10. Audit who invoked an AWS API.

## Score log

| Date | Questions | Correct | % | Weak topics |
|---|---:|---:|---:|---|
| Sep 20 | 20 | | | |
| Sep 22 | 30 | | | |
| Sep 24 | 40 | | | |
| Sep 26 | 65 | | | |
| Sep 27 | 65 | | | |
