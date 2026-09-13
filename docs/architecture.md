# Repository Architecture

This repository keeps section-specific knowledge next to the implementation and experiments it explains. The `docs/` folder is reserved for cross-cutting material such as architecture, tooling selection, and database strategy.

## Section structure

Every numbered section follows this pattern:

```text
<01-section>/
├── README.md
├── STUDY-GUIDE.md
├── topics/            # optional deeper topic pages
├── examples/
├── experiments/
├── tests/
├── report.md
└── projects/          # optional section-specific projects
```

### README.md
Navigation, prerequisites, build sequence, labs, projects, and exit criteria.

### STUDY-GUIDE.md
Read-first material: mental models, Mermaid diagrams, plain-English explanations, worked examples, best practices, references, and key takeaways for the section's topics.

### topics/
Use this when one concept needs its own mini-chapter. A topic page should explain the concept, show a diagram, provide a small example, list failure modes, and finish with references and an exit check.

### examples/ and experiments/
Examples should be small and runnable. Experiments should isolate one engineering question and record the configuration, measurements, and interpretation.

## Cross-cutting docs

```text
docs/
├── architecture.md
├── tooling-guide.md
└── databases-for-ai.md
```

These documents span multiple numbered sections and therefore remain outside the section folders.

## Learning workflow

```text
concept → mental model → diagram → worked example
       → from-scratch build → tests → experiment
       → failure modes → framework comparison
       → production pattern → project
```

## Design rule

If a framework hides an important behavior, reproduce the behavior with a minimal implementation first. Then use the framework and compare the abstraction, control, failure behavior, and operational cost.

## Source rule

Prefer primary sources: official documentation, original papers, standards/protocol specifications, and source code. For fast-moving APIs, record the package/framework/model version and the date used in each experiment.
