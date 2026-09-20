# Hands-on Demos

These demos are small on purpose. The objective is to make concepts memorable.

## Demo 1 — Classification metrics

Create a tiny fraud dataset and calculate TP, FP, FN, TN, accuracy, precision, recall, and F1.

```text
Transactions → Classifier → confusion matrix → precision/recall/F1
```

Create a case where false negatives are more costly than false positives and explain the metric implication.

## Demo 2 — AWS AI service mapping

Map these requirements:
- meeting audio → transcription
- customer message → translation
- scanned invoice → document extraction
- review text → sentiment/entities
- text response → speech

Then explain why the chosen service fits.

## Demo 3 — Tokens and embeddings

Using any local tokenizer/embedding library:
1. Count tokens for a paragraph.
2. Change wording and compare token counts.
3. Embed five short sentences.
4. Compare semantic similarity.
5. Explain keyword matching vs semantic retrieval.

## Demo 4 — Prompt engineering

Run one task with zero-shot, few-shot, and structured-output prompts. Record accuracy, consistency, format compliance, and latency/cost observations.

## Demo 5 — Mini RAG

```text
Documents → chunk → embed → vector index
                           ↓
Question → retrieve → context → model → answer + sources
```

Test a question that is present, absent, and ambiguous. Observe retrieval failure and hallucination risk.

## Demo 6 — Bedrock architecture walkthrough

```text
User → Application → Amazon Bedrock
                       ├─ foundation model
                       ├─ guardrails
                       ├─ knowledge/RAG
                       └─ agent/tool capabilities
                              ↓
                           response
```

Explain what each component contributes.

## Demo 7 — Secure agent

Design an agent that reads one S3 location and creates a ticket. Apply IAM least privilege, scoped tool permissions, input/output validation, CloudTrail, CloudWatch, and human approval for destructive actions.

## Demo 8 — Model choice

Create three hypothetical models with different cost, latency, quality, context size, and modality. Select one for an FAQ bot, one for long-document analysis, and one for low-latency classification. Explain tradeoffs.

## Completion rule

For each demo write:

**What I built → what I observed → concept it proves → exam question it could answer.**
