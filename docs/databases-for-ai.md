# Databases for AI Systems — Vector, Non-Vector, and Hybrid Search

AI applications need more than a vector database. The correct data layer depends on the workload: transactions, relationships, exact lookup, filtering, analytics, lexical search, semantic search, or a combination.

## 1. The core mental model

Think in layers:

```text
Application
    |
    +-- transactional state ------------> relational / document DB
    |
    +-- exact lookup / cache -----------> key-value / relational
    |
    +-- lexical retrieval --------------> inverted index / full-text search
    |
    +-- semantic retrieval -------------> dense/sparse vector index
    |
    +-- hybrid retrieval ---------------> lexical + vector + reranking
    |
    +-- analytics / events -------------> analytical / time-series systems
```

A vector database is not a replacement for a relational database. It solves a different retrieval problem.

## 2. Non-vector databases: learn these first

### Relational databases

Learn SQL, tables, primary/foreign keys, constraints, transactions, isolation, indexes, joins, query plans, and migrations.

**Best fit:** system-of-record data, user accounts, permissions, billing, workflow state, agent sessions, metadata, audit logs, and strongly consistent application state.

**Study technology:** PostgreSQL.

### Document databases

Learn document modeling, nested data, indexing, aggregation, and schema evolution.

**Best fit:** flexible application records, content with changing shape, document-centric applications.

**Study technology:** MongoDB.

### Key-value / in-memory stores

Learn TTL, eviction, atomic operations, streams, pub/sub, and distributed caching patterns.

**Best fit:** caching, rate limiting, short-lived state, queues/streams, session acceleration, feature/state lookup.

**Study technology:** Redis.

### Search engines / inverted indexes

Learn tokenization, analyzers, stemming, stop words, inverted indexes, BM25, filters, facets, relevance scoring, and ranking.

**Best fit:** exact terms, names, IDs, error codes, product SKUs, logs, documentation search, faceted search.

**Study technology:** Elasticsearch/OpenSearch.

## 3. Vector databases and vector search

Learn these concepts before choosing a vendor:

1. Embeddings
2. Dimensions
3. Distance metrics: cosine, dot product, L2
4. Exact nearest-neighbor search
5. Approximate nearest-neighbor search
6. HNSW
7. IVF/IVFFlat
8. Sparse vectors
9. Dense vectors
10. Metadata/payload filtering
11. Top-k retrieval
12. Recall vs latency trade-offs
13. Index build/update costs
14. Quantization and memory efficiency
15. Reranking

An embedding converts an object such as text, image, or audio into a numerical representation. Vector search retrieves items that are close to the query representation in the chosen vector space.

### Exact vs approximate search

**Exact nearest neighbor (ENN):** compare against all relevant vectors. High recall and simple semantics, but increasingly expensive as the corpus grows.

**Approximate nearest neighbor (ANN):** use an index to avoid exhaustive comparisons. Faster at scale, but introduces recall/latency tuning.

Postgres with pgvector supports exact search and ANN indexes including HNSW and IVFFlat. HNSW generally offers a stronger speed/recall trade-off at the cost of more memory and slower index construction; IVFFlat can be cheaper to build and tune differently. See the pgvector documentation for version-specific details.

## 4. Dense vs sparse vectors

### Dense vectors

Most dimensions contain meaningful values. They are commonly used for semantic similarity from embedding models.

Good for:
- paraphrases
- semantic concepts
- natural-language questions
- cross-modal similarity

### Sparse vectors

Most dimensions are zero and only a small set carry weight. They preserve more lexical/term-oriented structure and can complement dense vectors.

Good for:
- exact terms
- domain identifiers
- lexical relevance with learned semantic expansion

Modern retrieval systems can store both dense and sparse representations and combine them. Qdrant documents this pattern explicitly, including dense+sparse vectors in the same point and later reranking/late-interaction stages.

## 5. Vector DB vs traditional DB

| Requirement | Relational / document DB | Vector DB / vector index |
|---|---|---|
| Transactions | Excellent | Usually not the primary purpose |
| Joins/constraints | Excellent in relational systems | Limited or model-dependent |
| Exact lookup | Excellent | Poor fit |
| Keyword search | Possible; varies | Usually secondary |
| Semantic similarity | Not native in classic systems | Primary purpose |
| Metadata filtering | Strong | Important supporting feature |
| Aggregations | Strong | Usually secondary |
| Top-k similarity | Not the traditional workload | Primary purpose |
| RAG retrieval | Possible with extensions | Strong fit |
| Operational system of record | Strong | Usually not the best choice |

The boundary is increasingly blurred. PostgreSQL + pgvector, MongoDB Vector Search, Redis, and Elasticsearch can combine conventional data with vector search. That is why the curriculum should teach **capabilities** rather than rigid product categories.

## 6. The evolution to hybrid search

Do not stop at:

```text
query → embedding → vector search → LLM
```

A production retrieval pipeline often becomes:

```text
query
  ├── lexical search (BM25 / exact terms)
  ├── dense vector search
  ├── optional sparse/learned lexical search
  └── metadata filters
          ↓
       fusion (for example RRF)
          ↓
       reranking
          ↓
       context selection
          ↓
       LLM
```

Hybrid retrieval exists because lexical and semantic retrieval fail differently. Exact terms are especially valuable for identifiers and proper nouns; semantic retrieval is strong when wording differs but meaning is similar. Elasticsearch and Qdrant both document dense/lexical hybrid patterns, including ranking fusion approaches such as reciprocal rank fusion (RRF).

## 7. Database progression to study

### Level 1 — PostgreSQL

Build:
- CRUD API
- normalized schema
- indexes
- transactions
- full-text search
- JSONB
- query plans

### Level 2 — PostgreSQL + pgvector

Build:
- embeddings table
- exact vector search
- HNSW
- IVFFlat
- metadata filtering
- hybrid SQL + vector retrieval

### Level 3 — Elasticsearch/OpenSearch

Build:
- BM25 search
- analyzers
- filters/facets
- dense vectors
- sparse retrieval
- hybrid retrieval
- RRF/reranking

### Level 4 — Dedicated vector database

Compare:
- Qdrant
- Weaviate
- Pinecone

Measure:
- indexing speed
- query latency
- recall@k
- memory/storage
- filtering performance
- operational complexity
- update behavior

### Level 5 — Application databases with vector capabilities

Compare:
- MongoDB Vector Search
- Redis vector search
- Elasticsearch
- PostgreSQL + pgvector

The question becomes: **can one system handle enough of my workload well enough to avoid another operational dependency?**

## 8. Build exercises

### Exercise A — Exact vs semantic search

Create 500 technical documents and answer the same 50 questions using:

1. SQL/full-text search
2. dense vector search
3. hybrid search

Measure recall@5 and inspect failure cases.

### Exercise B — HNSW vs IVFFlat

Use pgvector. Keep the dataset and embedding model fixed. Vary index parameters and measure:

```text
query latency
recall@k
index build time
memory/storage
```

### Exercise C — Dense vs sparse

Build queries containing both ordinary natural-language questions and exact identifiers. Compare dense, sparse/lexical, and hybrid retrieval.

### Exercise D — RRF

Retrieve top-k from lexical and semantic search independently, then merge them with reciprocal rank fusion. Compare with single-retriever baselines.

### Exercise E — Filter-before vs filter-after

Test metadata filters such as tenant, product, date, or permissions. Measure both correctness and latency.

### Exercise F — Database consolidation

Implement the same RAG application three ways:

```text
PostgreSQL + pgvector
Elasticsearch
Dedicated vector DB
```

Document the operational and engineering trade-offs.

## 9. Best practices

- Keep source documents and canonical metadata separate from derived embeddings when appropriate.
- Version embedding models and index configurations so re-indexing is reproducible.
- Never assume higher-dimensional embeddings automatically produce better retrieval.
- Benchmark on representative data instead of synthetic data alone.
- Evaluate retrieval separately from generation.
- Retain the original text/chunk IDs so every retrieved vector can be traced back to source evidence.
- Treat metadata and access-control filtering as part of retrieval correctness, not as an afterthought.
- Use hybrid retrieval when the dataset contains identifiers, product names, error codes, exact policy language, or other lexical signals that embeddings may miss.
- Do not add a vector database simply because an application uses an LLM.
- Prefer the simplest datastore that meets the retrieval, consistency, scale, and operational requirements.

## 10. Project suggestions

**Database Shootout** — the same RAG corpus implemented on PostgreSQL+pgvector, Elasticsearch, and Qdrant. Publish latency/recall/cost/complexity measurements.

**Hybrid Search Lab** — create a dataset containing natural-language questions, IDs, product names, dates, and exact policy statements. Determine which query classes require lexical vs semantic retrieval.

**Multi-Tenant RAG Store** — enforce tenant-level filtering, document-level permissions, versioning, deletion, and retrieval auditing.

**Vector Index Tuning Service** — automate experiments over HNSW/IVF parameters and produce recall-vs-latency curves.

**Multimodal Retrieval Demo** — index text and image embeddings and compare cross-modal retrieval strategies.

## 11. References

- PostgreSQL full-text search: https://www.postgresql.org/docs/current/textsearch.html
- pgvector: https://github.com/pgvector/pgvector
- Elasticsearch vector search: https://www.elastic.co/docs/solutions/search/vector
- Elasticsearch hybrid search: https://www.elastic.co/docs/solutions/search/hybrid-search
- Qdrant search: https://qdrant.tech/documentation/search/
- Qdrant hybrid search: https://qdrant.tech/documentation/search/text-search/hybrid-search/
- MongoDB Vector Search: https://www.mongodb.com/docs/vector-search/
- MongoDB hybrid search: https://www.mongodb.com/docs/vector-search/hybrid-search/vector-search-with-full-text-search/
- Redis vector search: https://redis.io/docs/latest/develop/ai/search-and-query/query/vector-search/
- FAISS: https://faiss.ai/

## Exit criteria

You can explain the difference between a transaction, an exact lookup, lexical retrieval, dense semantic retrieval, sparse retrieval, hybrid retrieval, reranking, and a vector index. You can choose a database from workload requirements rather than from framework popularity.
