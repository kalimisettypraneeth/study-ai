# Learn, explain, build, and check

Start with a section's **DEEP-DIVE.md**, then use its **PRACTICE.md**. Existing STUDY-GUIDE and CONCEPTS pages remain available as shorter summaries. Each core section now has a runnable offline example and expected output, two exercises with solution guidance, and five multiple-choice questions with rationales.

## A manageable study session

1. Read one lesson subsection and explain its idea in your own words.
2. Redraw its diagram and identify where a failure or rejection goes.
3. Predict the example's output, then run it.
4. Complete the exercises before revealing solutions.
5. Take the quiz; record the concept behind each mistake.
6. Return the next day and explain a changed scenario without notes.

Allow roughly 60–90 minutes per core section initially, then revisit deeper topics. This is a flexible estimate, not a deadline. No paid accounts are needed for the included Python examples.

## Core curriculum

| Section | Detailed explanations | Exercises and quiz | Offline example |
|---|---|---|---|
| 00 — Foundations | [Lesson](00-foundations/DEEP-DIVE.md) | [Practice + 5 questions](00-foundations/PRACTICE.md) | [Run](00-foundations/examples/README.md) |
| 01 — LLM Engineering | [Lesson](01-llm-engineering/DEEP-DIVE.md) | [Practice + 5 questions](01-llm-engineering/PRACTICE.md) | [Run](01-llm-engineering/examples/README.md) |
| 02 — Model APIs | [Lesson](02-model-apis/DEEP-DIVE.md) | [Practice + 5 questions](02-model-apis/PRACTICE.md) | [Run](02-model-apis/examples/README.md) |
| 03 — Tools | [Lesson](03-tools/DEEP-DIVE.md) | [Practice + 5 questions](03-tools/PRACTICE.md) | [Run](03-tools/examples/README.md) |
| 04 — Agents | [Lesson](04-agents/DEEP-DIVE.md) | [Practice + 5 questions](04-agents/PRACTICE.md) | [Run](04-agents/examples/README.md) |
| 05 — Memory | [Lesson](05-memory/DEEP-DIVE.md) | [Practice + 5 questions](05-memory/PRACTICE.md) | [Run](05-memory/examples/README.md) |
| 06 — RAG | [Lesson](06-rag/DEEP-DIVE.md) | [Practice + 5 questions](06-rag/PRACTICE.md) | [Run](06-rag/examples/README.md) |
| 07 — Orchestration | [Lesson](07-orchestration/DEEP-DIVE.md) | [Practice + 5 questions](07-orchestration/PRACTICE.md) | [Run](07-orchestration/examples/README.md) |
| 08 — Evaluation | [Lesson](08-evaluation/DEEP-DIVE.md) | [Practice + 5 questions](08-evaluation/PRACTICE.md) | [Run](08-evaluation/examples/README.md) |
| 09 — Observability | [Lesson](09-observability/DEEP-DIVE.md) | [Practice + 5 questions](09-observability/PRACTICE.md) | [Run](09-observability/examples/README.md) |
| 10 — Production | [Lesson](10-production/DEEP-DIVE.md) | [Practice + 5 questions](10-production/PRACTICE.md) | [Run](10-production/examples/README.md) |
| 11 — Frameworks | [Lesson](11-frameworks/DEEP-DIVE.md) | [Practice + 5 questions](11-frameworks/PRACTICE.md) | [Run](11-frameworks/examples/README.md) |

## Supporting tracks

| Track | Material and practice |
|---|---|
| Architecture, tools, and databases | [Applied workbook](docs/PRACTICE.md) |
| Controlled experiments | [Lab exercises](labs/PRACTICE.md) |
| Seven capstones | [Project acceptance criteria](projects/PRACTICE.md) |
| Personal n8n assistant | [Workflow walkthrough, exercises, quiz](projects/personal-ai-assistant-n8n/LEARNING-WALKTHROUGH.md) |
| AWS AIF-C01 | [Five domain lessons](certifications/aif-c01/README.md) and [25 domain questions](certifications/aif-c01/DOMAIN-QUIZZES.md) |
| Reading technical sources | [Source-card exercise](resources/PRACTICE.md) |
| Running and maintaining examples | [Script exercise](scripts/PRACTICE.md) |

## Run the examples

Requires Python 3.11 or newer, with no additional packages:

```bash
python scripts/run_learning_examples.py
```

Expected final line: `12/12 examples passed`. The examples use synthetic fixtures and do not contact providers, send messages, create cloud resources, or measure real model performance. The workflow recovery example uses and cleans up a temporary SQLite database.

## Progress record

| Section | Explained without notes | Example changed and rerun | Exercise completed | Quiz / 5 | Misconception to revisit |
|---|---|---|---|---:|---|
| 00 | | | | | |
| 01 | | | | | |
| 02 | | | | | |
| 03 | | | | | |
| 04 | | | | | |
| 05 | | | | | |
| 06 | | | | | |
| 07 | | | | | |
| 08 | | | | | |
| 09 | | | | | |
| 10 | | | | | |
| 11 | | | | | |

Aim for at least 4/5, but also complete the failure exercise. Knowing an answer letter is weaker evidence of understanding than explaining why the other options fail.

## Reading diagrams

In flowcharts, arrows show data/control movement, diamonds show decisions, and cylinders indicate stores. Follow both success and failure branches. In state diagrams, labels on arrows explain events or conditions that permit a transition. A diagram is a mental model, not executable enforcement; connect each safety boundary to actual code or storage behavior.
