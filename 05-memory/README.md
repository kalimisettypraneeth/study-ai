# 05 — Memory

Understand the difference between **state** and **memory**. State is what the current run needs to continue. Memory is information retained across interactions or runs because it may be useful later.

## Learning path

1. Conversation/run state
2. Working memory
3. Short-term summaries
4. Long-term memory storage
5. Semantic memory
6. Episodic memory
7. Retrieval and ranking
8. Consolidation and summarization
9. Forgetting and deletion
10. Privacy, isolation, and user controls

## Build sequence

### A. Explicit session state

Represent a run with a typed object:

```python
@dataclass
class SessionState:
    messages: list[Message]
    pending_tool_call: ToolCall | None
    budget_remaining: int
    metadata: dict[str, str]
```

Persist and reload this state. Kill the process between turns and prove that execution resumes correctly.

### B. Conversation memory

Build a message store with:

- append
- retrieve recent turns
- summarize old turns
- delete conversation
- export conversation

Compare full-history context with summary + recent turns.

### C. Long-term memory

Create records such as:

```text
memory_id
user_scope
kind
content
source
created_at
updated_at
confidence
```

Start with SQL or a local file before introducing a vector database. Make retrieval explicit and inspectable.

### D. Memory lifecycle

Implement:

```text
capture → validate → store → retrieve → use → update → forget
```

Add TTLs and deletion APIs. Never assume that “memory” should be kept forever.

## Experiments

- Full transcript vs summary + recent messages.
- Exact keyword retrieval vs embedding retrieval.
- Top-k values of 1, 3, 5, 10.
- Stale memory injection.
- Contradictory memories.
- Delete a memory and verify it is no longer retrieved.
- Two users attempting to access each other’s memory.
- Memory poisoning through malicious user input.

## Project suggestions

**Memory Service** — a small API that stores, retrieves, updates, expires, and deletes typed memories with traceable provenance.

**Persistent Assistant** — a conversational assistant that remembers user preferences only when explicitly captured and lets the user inspect/delete them.

**Memory Benchmark** — a dataset of “remember this,” “do you know,” “contradiction,” and “forget this” tasks with retrieval and privacy metrics.

## References

- SQLite — https://www.sqlite.org/docs.html
- PostgreSQL — https://www.postgresql.org/docs/
- JSON Schema — https://json-schema.org/
- LlamaIndex memory concepts — https://docs.llamaindex.ai/
- OpenAI Agents SDK sessions — https://openai.github.io/openai-agents-python/

## Exit criteria

You can draw the data model for current state and long-term memory separately, restart a process without losing required state, and enforce explicit retention/deletion behavior.