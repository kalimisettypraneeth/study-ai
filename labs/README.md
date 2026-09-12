# Labs

Labs are small, focused experiments designed to answer one engineering question at a time. A lab should be cheap to run, easy to reproduce, and specific enough that you can explain the result.

## Standard lab format

```text
labs/<name>/
├── README.md
├── experiment.py
├── data/
├── results/
└── report.md
```

Each lab README should state:

- **Question** — what are we trying to learn?
- **Hypothesis** — what do we expect?
- **Variables** — what changes and what stays fixed?
- **Method** — exact commands/configuration.
- **Metrics** — what is measured?
- **Result** — raw observations.
- **Interpretation** — what the result means.
- **Limitations** — what the experiment cannot prove.
- **Next step** — what to investigate next.

## Suggested lab catalog

### LLMs

- Prompt version A/B test.
- Structured-output failure and repair.
- Sampling parameter sensitivity.
- Long-context distraction.
- Model routing by task type.

### Tools/agents

- Tool schema strictness vs tool success.
- Maximum-turn safety limits.
- Retry strategy comparison.
- Reactive vs plan-first agents.
- Human approval interruption/resume.

### RAG

- Chunk-size sweep.
- Dense vs keyword vs hybrid retrieval.
- Reranking impact.
- Query rewriting impact.
- Citation correctness benchmark.

### Production

- Concurrency vs tail latency.
- Retry storm simulation.
- Cache hit-rate impact.
- Cost budget enforcement.
- Provider outage/fallback drill.

## Rules

Change one important variable at a time. Store the exact model/provider/version, prompt version, dataset version, and configuration. Never rely on screenshots as the only record of a result.

## Project-scale labs

Before a capstone, run small labs to reduce uncertainty: benchmark the retriever, test the tool registry, measure model latency, and intentionally break the workflow before combining everything.