# Domain 3 — Foundation Models, Prompting, RAG and Evaluation

**Exam weight: 28% — largest domain**

## Application architecture

```text
User → Application → context/prompt → Foundation Model → validated output
                         ↙       ↘
                       RAG       tools
```

## Prompt engineering

A useful prompt often contains:

```text
Role/behavior + Task + Context + Constraints + Output format + Examples
```

- **Zero-shot:** no examples.
- **One-shot:** one example.
- **Few-shot:** multiple examples.
- **Structured output:** specify a machine-readable format when downstream software consumes the response.

Example:

```text
Summarize the incident report for an engineering manager.
Return: impact, root cause, customer impact, corrective action.
Keep it under 150 words. Use only information in the report.
```

## Prompt injection

Untrusted input can attempt to override intended instructions.

```text
Trusted instructions + untrusted content → LLM → potentially unsafe action
```

Controls include treating external content as untrusted, least-privilege tools, authorization outside the model, output validation, guardrails, human approval, logging, and monitoring. A prompt should not be the only security boundary.

## RAG in depth

```text
Documents → chunk → embed → index
                         ↑
Query → retrieve → optional rerank → context → model → answer
```

Chunking tradeoff:
- too small → lose context
- too large → noisy/expensive retrieval

## Fine-tuning vs RAG vs prompting

| Need | Common approach |
|---|---|
| Better instructions/format | Prompt engineering |
| Current/private knowledge | RAG |
| Change behavior/style with training examples | Fine-tuning |
| External actions | Tools/agents |
| Factual grounding | RAG + validation |

These approaches can be combined.

## Foundation model lifecycle

```text
Data selection → model selection → pre-training/existing FM
       → adaptation → evaluation → deployment → monitoring/feedback ↺
```

## Evaluation

Evaluate according to the task: factuality, relevance, groundedness, safety/toxicity, latency, cost, task success, and human judgment where appropriate.

## Model-selection questions

1. Required modality?
2. Required quality?
3. Acceptable latency?
4. Context size?
5. Language requirements?
6. Customization needs?
7. Cost target?
8. Compliance/security requirements?

## Exam traps

- Fine-tuning is not the default solution for fresh company knowledge.
- RAG does not permanently change model parameters.
- Prompt engineering does not retrain a model.
- Tool authorization should not be delegated solely to an LLM.
- Fluent output can still be incorrect.
