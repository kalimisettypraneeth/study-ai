# AI Agents Engineering — Study, Build, Experiment

A hands-on knowledge base for an engineer who wants to learn how to design, build, evaluate, and operate AI systems powered by LLMs.

**Learning progression:** LLMs → prompting → structured outputs → tools → agents → memory → RAG → orchestration → multi-agent systems → evaluation → observability → production.

## Philosophy

- Understand the primitive before the framework.
- Code every major concept from scratch.
- Run experiments and document trade-offs.
- Treat evaluation, reliability, cost, security, and observability as first-class engineering concerns.
- Learn frameworks as implementations of durable patterns, not as the patterns themselves.

## How to use this repository

For every major section, follow this loop:

```text
1. Read the section guide
2. Build the smallest implementation
3. Run the suggested experiments
4. Intentionally break it
5. Add tests/evaluation
6. Compare with a framework implementation
7. Write a short report of trade-offs
8. Build the section project
```

The section READMEs now include documentation topics, build sequences, example experiments, project ideas, exit criteria, and primary references. `03-tools/` also contains an expanded [`GUIDE.md`](03-tools/GUIDE.md).

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
├── resources/
└── scripts/
```

Each major topic should aim for: **concept → mental model → from-scratch implementation → experiment → failure modes → framework implementation → evaluation → production pattern**.

## Capstone sequence

1. LLM CLI assistant
2. Tool-using agent
3. RAG assistant
4. Stateful research agent
5. Workflow orchestrator
6. Multi-agent research system
7. Production-grade agent service

See [`ROADMAP.md`](ROADMAP.md) for the curriculum and [`resources/README.md`](resources/README.md) for the curated study list.