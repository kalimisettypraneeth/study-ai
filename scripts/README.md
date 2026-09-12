# Scripts

Small utilities used to run, evaluate, benchmark, validate, or maintain the learning projects. Scripts should stay boring, composable, and easy to inspect.

## Suggested layout

```text
scripts/
├── run_lab.py
├── run_eval.py
├── benchmark.py
├── seed_data.py
├── validate_configs.py
├── inspect_traces.py
└── export_results.py
```

## Build these first

### `run_lab.py`

Standardize how labs are launched:

```bash
python scripts/run_lab.py labs/chunking --config configs/chunking.yaml
```

Record command-line arguments and environment/config metadata with results.

### `run_eval.py`

Accept a dataset and system configuration, run cases, and write machine-readable results plus a human-readable summary.

### `benchmark.py`

Run controlled workloads at multiple concurrency levels and report p50/p95/p99 latency, throughput, errors, token use, and estimated cost.

### `seed_data.py`

Populate local databases/indexes with deterministic fixture data used by labs and tests.

### `inspect_traces.py`

Read JSON trace files and print a compact run timeline. Later, use the same schema for a UI.

## Engineering rules

- Prefer deterministic fixtures.
- Avoid embedding API keys in scripts.
- Read configuration from environment/config files.
- Make network calls explicit.
- Return non-zero exit codes on failure.
- Keep scripts small; reusable logic belongs in library modules.
- Store experiment outputs outside source files and record the exact configuration used.

## Project suggestions

**Experiment CLI** — one command to run labs, save metadata, compare results, and generate Markdown reports.

**Eval CLI** — one command to run a dataset against several model/prompt configurations and produce a regression report.

**Trace CLI** — inspect one agent run from the terminal, including model calls, tools, state transitions, latency, retries, and estimated cost.