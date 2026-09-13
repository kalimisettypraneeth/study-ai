# AI Agents Engineering — Study, Build, Experiment

A hands-on knowledge base for an engineer who wants to learn how to design, build, evaluate, and operate AI systems powered by LLMs.

**Learning progression:** LLMs → prompting → structured outputs → tools → agents → memory → RAG → orchestration → multi-agent systems → evaluation → observability → production.

## Read this first

Start with the [Visual Section Guides](docs/sections/README.md). Each page is designed to teach the concept through diagrams, mental models, plain-English explanations, worked examples, best practices, and references before you start coding.

## Philosophy

- Understand the primitive before the framework.
- Code every major concept from scratch.
- Run experiments and document trade-offs.
- Treat evaluation, reliability, cost, security, and observability as first-class engineering concerns.
- Learn frameworks as implementations of durable patterns, not as the patterns themselves.

## How to use this repository

For every major section, follow this loop:

```text
1. Read the visual section guide
2. Read the section README
3. Build the smallest implementation
4. Run the suggested experiments
5. Intentionally break it
6. Add tests/evaluation
7. Compare with a framework implementation
8. Write a short trade-off report
9. Build the section project
```

## Repository structure

```text
study-ai/
├── 00-foundations/
├── 01-llm-engineering/
├── 02-model-apis/
├── 03-tools/
├── 04-agents/
├── 05-memory/
├── 06-rag/
├── 07-orchestration/
├── 08-evaluation/
├── 09-observability/
├── 10-production/
├── 11-frameworks/
├── labs/
├── projects/
├── docs/
│   ├── sections/
│   ├── tooling-guide.md
│   └── databases-for-ai.md
├── resources/
└── scripts/
```

## Capstone sequence

1. LLM CLI assistant
2. Tool-using agent
3. RAG assistant
4. Stateful research agent
5. Workflow orchestrator
6. Multi-agent research system
7. Production-grade agent service

See [`ROADMAP.md`](ROADMAP.md) for the curriculum, [`docs/tooling-guide.md`](docs/tooling-guide.md) for technology selection, and [`docs/databases-for-ai.md`](docs/databases-for-ai.md) for database/retrieval concepts.