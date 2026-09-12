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

Use [`docs/topic-template.md`](topic-template.md) when adding a new topic. Not every topic needs every file; prefer small, executable examples over large notebooks.

## Learning workflow

Every topic should progress through:

```text
concept → mental model → from-scratch build → runnable example
       → tests → experiment → failure modes
       → framework comparison → production pattern → project
```

Keep the experiment configuration and result interpretation with the code so results can be reproduced later.

## Design rule

If a framework hides an important behavior, first reproduce the behavior with a minimal implementation. Then use the framework and compare the abstractions.

## Source rule

Prefer primary sources: official documentation, original papers, standards/protocol specifications, and source code. For fast-moving APIs, record the version/date used in the experiment.