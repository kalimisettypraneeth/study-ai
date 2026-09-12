# 06 — RAG

Build retrieval-augmented generation from first principles and learn where retrieval systems fail. RAG is a data pipeline plus a generation step, not simply “put documents in a vector database.”

## Pipeline

```text
source → parse → clean → chunk → metadata → embed/index
                                      ↓
query → rewrite → retrieve → filter/rerank → context → generate → cite
```

## Learning path

1. Document ingestion and parsing
2. Cleaning and normalization
3. Chunking strategies
4. Metadata design
5. Embeddings and similarity
6. Vector retrieval
7. Keyword/BM25 retrieval
8. Hybrid retrieval
9. Filtering and reranking
10. Query rewriting/decomposition
11. Context construction
12. Citations and provenance
13. Agentic RAG
14. Retrieval/generation evaluation

## Build sequence

### A. Local corpus search

Start with 20–100 text/Markdown files. Build:

```text
loader → parser → chunker → in-memory index → top-k retrieval
```

Implement cosine similarity yourself once so the retrieval math is not hidden.

### B. Add metadata

Store source, section, document ID, timestamps, and tags with every chunk. Support filters before or after similarity search and measure the difference.

### C. Add hybrid retrieval

Combine lexical search with embedding search. Test cases where exact identifiers matter and cases where semantic similarity matters.

### D. Add reranking and query rewriting

Compare:

```text
query → retrieve → generate
query → rewrite → retrieve → rerank → generate
```

Only keep the more complex pipeline if evaluation shows a meaningful improvement.

### E. Grounded answer generation

Require answers to include source IDs/citations. Add a “not enough evidence” behavior rather than forcing a guess.

## Evaluation checklist

Create a dataset with:

- answerable questions
- unanswerable questions
- questions requiring multiple sources
- exact identifier queries
- distractor documents
- conflicting documents

Track retrieval recall/precision and answer correctness/groundedness separately.

## Experiments

- Chunk sizes: 200/500/1,000 tokens.
- Fixed-size vs sentence/section-aware chunking.
- Top-k 3/5/10/20.
- Dense vs keyword vs hybrid retrieval.
- Metadata filtering before vs after retrieval.
- Reranker on/off.
- Query rewrite on/off.
- Full documents vs selected context.
- Citation-required vs citation-optional generation.

## Project suggestions

**RAG Assistant** — a cited assistant over a technical documentation corpus with ingestion, hybrid retrieval, reranking, evaluation, and source inspection.

**Knowledge Base Builder** — incremental ingestion pipeline with duplicate detection, document versioning, metadata filters, and re-indexing.

**RAG Benchmark** — a reproducible benchmark that measures retrieval recall, answer quality, citation correctness, latency, and cost across multiple retrieval strategies.

## References

- Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* — https://arxiv.org/abs/2005.11401
- Sentence Transformers — https://www.sbert.net/
- FAISS — https://faiss.ai/
- LlamaIndex documentation — https://docs.llamaindex.ai/
- Elasticsearch relevance/search docs — https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html
- OpenAI developer documentation — https://platform.openai.com/docs

## Exit criteria

You can explain retrieval failures separately from generation failures, inspect which chunks were retrieved for a question, and prove with an evaluation set that a change improved the system rather than only producing nicer demos.