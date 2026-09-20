# Domain 2 — Fundamentals of Generative AI

**Exam weight: 24%**

## GenAI mental model

```text
prompt/input → foundation model → generated output
```

Outputs may include text, code, images, audio, or video.

## Tokens

LLMs process text as tokens rather than whole words. Token counts affect context limits, latency, inference cost, and throughput. Do not assume one token equals one word.

```text
Text → tokenizer → tokens → model processing → output tokens
```

## Transformers and attention

```text
Input tokens
    ↓
Embeddings
    ↓
Positional information
    ↓
Self-attention
    ↓
Feed-forward layers
    ↓
Repeated transformer blocks
    ↓
Output probabilities
    ↓
Generated token
```

Attention lets the model weigh relationships between tokens in context. AIF-C01 does not require transformer mathematics; understand the vocabulary and purpose.

## Foundation models

A foundation model is broadly trained and can be adapted for many tasks.

Selection factors:
- modality
- quality/performance
- model size
- latency
- context/input-output limits
- languages
- customization
- cost
- compliance
- availability
- prompt caching where relevant

## Embeddings

An embedding converts content such as text into a numerical vector representing semantic characteristics.

```text
“How do I reset my password?”
              ↓
          embedding
              ↓
       [0.12, -0.44, ...]
              ↓
      similarity retrieval
```

## RAG mental model

```text
Documents → chunking → embeddings → index
                                      ↓
Query → retrieve relevant chunks → prompt + context
                                      ↓
                               foundation model
                                      ↓
                                   answer
```

RAG is useful when the model needs external or changing knowledge without retraining the base model.

## Hallucinations

A hallucination is generated content that is unsupported, fabricated, or factually wrong. Controls include RAG grounding, better prompts, retrieval quality, output validation, confidence/verification, and human review where appropriate.

## GenAI strengths

- adaptability
- conversational interaction
- content generation
- summarization/transformation
- coding assistance
- search and assistants

## GenAI limitations

- hallucinations
- nondeterminism
- latency
- cost
- context limits
- bias
- explainability limits
- privacy/security risks
- prompt injection

## Context engineering

```text
Goal + instructions + retrieved knowledge + state + tools + memory
                              ↓
                         model context
                              ↓
                       response/action
```

## Agentic AI awareness

```text
User goal → Agent → LLM
                 ↙  ↓  ↘
              tools memory orchestration
                 ↓
          external systems
```

Know tools, memory, orchestration, multi-agent patterns, MCP, and agent communication at the exam-guide level.

## Exam traps

- Embeddings are not generated answers.
- Vector search is not model training.
- RAG is not fine-tuning.
- Larger model does not automatically mean better business choice.
- More context can increase cost and latency.
