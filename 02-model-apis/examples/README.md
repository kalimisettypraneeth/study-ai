# Offline example: 02 — Model APIs

[Detailed explanation](../DEEP-DIVE.md) · [Exercises and solutions](../PRACTICE.md)

Requires Python 3.11 or newer. Uses only the standard library. No keys, installation, network access, paid provider, or cloud account is needed.

From the repository root:

```bash
python 02-model-apis/examples/retry_policy.py
```

**Expected behavior:** Success on attempt 3; permanent failure on attempt 1; exhaustion on attempt 3.

Read the code, predict the output, run it, then change one fixture using the section exercise. Assertions check the demonstrated invariants and make failures visible.

**Scope:** this is a small educational fixture, not a production service or a model-quality benchmark. Any timing or cost values are simulated/illustrative unless explicitly described otherwise. Read the lesson for the controls omitted from the minimal example.

Run every section example with `python scripts/run_learning_examples.py`.
