# 06 — RAG

> **Read first:** [Visual Study Guide](../docs/sections/06-rag.md)

Build retrieval-augmented generation from first principles and learn where retrieval systems fail. RAG is a data pipeline plus a generation step, not simply “put documents in a vector database.”

## Core pipeline

```text
source → parse → clean → chunk → metadata → embed/index
                                      ↓
query → rewrite → retrieve → filter/rerank → context → generate → cite
```

## Core concepts

Ingestion, chunking, metadata, embeddings, exact nearest-neighbor search, ANN, HNSW, IVFFlat, dense vs sparse retrieval, BM25, hybrid retrieval, RRF, reranking, query rewriting, citations, agentic RAG, and evaluation.

## Database track

Read [`docs/databases-for-ai.md`](../docs/databases-for-ai.md) for relational, document, key-value, full-text, vector, and hybrid database concepts and benchmarks.

## Build next

1. Local corpus search.
2. Metadata-aware retrieval.
3. Lexical/BM25 baseline.
4. Dense vector search.
5. Hybrid retrieval.
6. Reranking.
7. Grounded cited answers.
8. Database shootout.
9. RAG evaluation benchmark.
