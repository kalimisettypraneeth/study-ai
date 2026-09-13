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
6. Exact nearest-neighbor search
7. Approximate nearest-neighbor search
8. Dense vs sparse retrieval
9. Vector indexes: HNSW and IVFFlat
10. Vector databases vs relational/document/search databases
11. Keyword/BM25 retrieval
12. Hybrid retrieval and reciprocal rank fusion
13. Filtering and reranking
14. Query rewriting/decomposition
15. Context construction
16. Citations and provenance
17. Agentic RAG
18. Retrieval/generation evaluation

## Database track

Read [`docs/databases-for-ai.md`](../docs/databases-for-ai.md) alongside this section. It covers:

- relational databases and SQL
- document databases
- key-value/in-memory systems
- inverted indexes and BM25
- embeddings and vector representations
- dense vs sparse vectors
- exact vs approximate nearest-neighbor search
- HNSW and IVFFlat
- metadata filtering
- hybrid retrieval
- reranking
- PostgreSQL + pgvector
- Elasticsearch/OpenSearch
- Qdrant, Weaviate, Pinecone
- MongoDB Vector Search
- Redis vector search
- database-selection trade-offs and benchmarks

The goal is to answer **why this datastore and retrieval strategy?** rather than assuming every AI application needs a dedicated vector database.

## Build sequence

### A. Local corpus search

Start with 20–100 text/Markdown files. Build:

```text
loader → parser → chunker → in-memory index → top-k retrieval
```

Implement cosine similarity yourself once so the retrieval math is not hidden.

### B. Add metadata

Store source, section, document ID, timestamps, tenant, permissions, and tags with every chunk. Support filters before or after similarity search and measure the difference.

### C. Compare non-vector retrieval

Implement lexical/BM25 search and create test queries for:

- exact IDs
- product names
- error codes
- policy phrases
- ordinary natural-language questions

Observe where lexical retrieval beats semantic retrieval.

### D. Add vector indexes

Compare exact search with ANN. With PostgreSQL + pgvector, implement both HNSW and IVFFlat and measure recall/latency/index-build trade-offs. HNSW and IVFFlat expose different speed, recall, memory, and build-time characteristics, so treat tuning as an experiment rather than a default setting.

### E. Add hybrid retrieval

Combine lexical search with dense embedding search. Test cases where exact identifiers matter and cases where semantic similarity matters. Learn reciprocal rank fusion (RRF) and compare it to score-weighted fusion.

### F. Add reranking and query rewriting

Compare:

```text
query → retrieve → generate
query → rewrite → retrieve → rerank → generate
query → lexical + dense → fuse → rerank → generate
```

Only keep the more complex pipeline if evaluation shows a meaningful improvement.

### G. Grounded answer generation

Require answers to include source IDs/citations. Add a “not enough evidence” behavior rather than forcing a guess.

## Database progression

Study the same RAG workload through these layers:

```text
PostgreSQL
   ↓
PostgreSQL + pgvector
   ↓
Elasticsearch/OpenSearch hybrid search
   ↓
Qdrant / Weaviate / Pinecone
   ↓
MongoDB Vector Search / Redis vector search
```

For each implementation compare:

- retrieval quality
- recall@k
- latency
- filtering
- metadata/query flexibility
- indexing/update behavior
- storage/memory
- operational complexity
- cost
- observability

See [`docs/databases-for-ai.md`](../docs/databases-for-ai.md) for the detailed curriculum and experiments.

## Evaluation checklist

Create a dataset with:

- answerable questions
- unanswerable questions
- questions requiring multiple sources
- exact identifier queries
- distractor documents
- conflicting documents
- permission/tenant filtering cases

Track retrieval recall/precision and answer correctness/groundedness separately.

## Experiments

- Chunk sizes: 200/500/1,000 tokens.
- Fixed-size vs sentence/section-aware chunking.
- Top-k 3/5/10/20.
- Exact vs ANN retrieval.
- HNSW vs IVFFlat.
- Dense vs lexical vs sparse retrieval.
- Dense vs keyword vs hybrid retrieval.
- RRF vs weighted score fusion.
- Metadata filtering before vs after retrieval.
- Reranker on/off.
- Query rewrite on/off.
- Full documents vs selected context.
- Citation-required vs citation-optional generation.
- PostgreSQL+pgvector vs Elasticsearch vs Qdrant on the same benchmark.

## Project suggestions

**RAG Assistant** — a cited assistant over a technical documentation corpus with ingestion, hybrid retrieval, reranking, evaluation, and source inspection.

**Knowledge Base Builder** — incremental ingestion pipeline with duplicate detection, document versioning, metadata filters, and re-indexing.

**RAG Benchmark** — a reproducible benchmark that measures retrieval recall, answer quality, citation correctness, latency, and cost across multiple retrieval strategies.

**Database Shootout** — implement the same RAG application using PostgreSQL+pgvector, Elasticsearch, and one dedicated vector database. Publish the trade-off report.

**Multi-Tenant RAG Store** — enforce tenant/document permissions during retrieval and test that unauthorized chunks can never reach the generation context.

## References

- Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* — https://arxiv.org/abs/2005.11401
- Sentence Transformers — https://www.sbert.net/
- FAISS — https://faiss.ai/
- PostgreSQL full-text search — https://www.postgresql.org/docs/current/textsearch.html
- pgvector — https://github.com/pgvector/pgvector
- Elasticsearch vector search — https://www.elastic.co/docs/solutions/search/vector
- Elasticsearch hybrid search — https://www.elastic.co/docs/solutions/search/hybrid-search
- Qdrant search and hybrid search — https://qdrant.tech/documentation/search/
- LlamaIndex documentation — https://docs.llamaindex.ai/
- MongoDB Vector Search — https://www.mongodb.com/docs/vector-search/
- Redis vector search — https://redis.io/docs/latest/develop/ai/search-and-query/query/vector-search/

## Exit criteria

You can explain retrieval failures separately from generation failures, inspect which chunks were retrieved for a question, explain exact vs ANN and dense vs sparse retrieval, choose between a conventional database and a vector-capable datastore, and prove with an evaluation set that a change improved the system rather than only producing nicer demos.