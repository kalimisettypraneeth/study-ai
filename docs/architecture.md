# Repository Architecture

This repository separates durable knowledge from implementation details.

## Layers

- **Foundations:** prerequisites and mental models.
- **Primitives:** LLM calls, structured output, tools, retrieval, state.
- **Systems:** agents, RAG pipelines, workflows, multi-agent systems.
- **Quality:** evaluation and observability.
- **Operations:** security, reliability, deployment, cost, governance.
- **Frameworks:** concrete SDK implementations and comparisons.
- **Labs:** experiments that isolate variables.
- **Projects:** integrated systems.

## Standard topic template

```text
<topic>/
├── README.md
├── notes.md
├── examples/
├── experiments/
├── tests/
└── report.md
```

Not every topic needs every file. Prefer small, executable examples over large notebooks.

## Design rule

If a framework hides an important behavior, first reproduce the behavior with a minimal implementation. Then use the framework and compare the abstractions.
