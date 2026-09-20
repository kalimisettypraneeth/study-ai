# Domain 4 — Responsible AI

**Exam weight: 14%**

```text
Responsible AI
├── Fairness / bias
├── Transparency
├── Explainability
├── Privacy
├── Safety
├── Accountability
└── Human oversight
```

## Bias and fairness

Bias can arise from sampling, labels, historical decisions, measurement, features, or deployment context. Fairness asks whether outcomes are unjustifiably different across relevant groups.

## Transparency vs explainability

**Transparency:** relevant information about the system, purpose, limitations, data origins, and use.

**Explainability:** understandable reasons or evidence about model behavior.

## Human oversight

```text
AI recommendation → risk check → human review when required → decision/action
```

High-impact uses may need human review, escalation, or approval.

## Data lineage

```text
source → ingestion → transformation → training/retrieval → application
  └────────────── provenance / lineage ─────────────────────────────┘
```

Track origin, transformation, and use of data.

## Model documentation

Know the purpose of model cards: document intended use, limitations, evaluation information, and relevant metadata.

## Responsible AI checklist

- Is data appropriate and representative?
- Could outcomes introduce harmful bias?
- Are limitations understandable?
- Is human escalation available?
- Is sensitive data protected?
- Are outputs validated?
- Are logs and provenance available?
- Is the use case appropriate for automation?

## Exam trap

Responsible AI is broader than bias. Think fairness, transparency, explainability, privacy, safety, accountability, and human oversight.
