# 11 — Frameworks

Frameworks are studied after the underlying patterns are understood. The goal is to learn **what abstraction the framework is providing**, not just how to call its API.

## Comparison method

For every framework, answer the same questions:

1. What are the core abstractions?
2. Who owns the execution loop?
3. How is state represented and persisted?
4. How are tools registered and authorized?
5. How are agents composed or delegated?
6. How are memory and retrieval integrated?
7. What tracing/observability exists?
8. How is evaluation performed?
9. How does deployment work?
10. What are the strengths, limitations, and escape hatches?
11. How difficult is migration to/from a custom implementation?

## Recommended study order

### 1. OpenAI Agents SDK

Map concepts from your hand-built agent loop to agents, tools, guardrails, handoffs, sessions, and tracing. Rebuild one of your earlier projects with the SDK and compare code size, control, and behavior.

### 2. LangGraph

Study graph/state abstractions, branching, persistence, interrupts, and durable workflows. Rebuild the same workflow you implemented manually.

### 3. LlamaIndex

Focus on ingestion, indexing, retrieval, and RAG abstractions. Compare its abstractions with your own ingestion/retrieval pipeline rather than only building a chatbot.

### 4. Microsoft Agent Framework

Study agent creation, tools, sessions, memory/context providers, workflows, and hosting patterns. Rebuild a small workflow and identify what is handled by the framework vs your application.

### 5. MCP and interoperability

Study how a protocol boundary changes tool discovery and integration. Build a tiny client/server pair and inspect the wire-level concepts.

## Framework lab

For one canonical problem—such as a cited research workflow—implement:

```text
A. from scratch
B. framework 1
C. framework 2
```

Compare:

- source lines
- control over the loop
- state model
- testing surface
- observability
- failure recovery
- latency/cost
- upgrade/migration risk

## Project suggestion

**Framework Shootout** — one benchmark application implemented with three frameworks plus a custom baseline. Produce a written comparison and a migration plan rather than declaring a single winner.

## References

- OpenAI Agents SDK — https://openai.github.io/openai-agents-python/
- LangGraph — https://langchain-ai.github.io/langgraph/
- LlamaIndex — https://docs.llamaindex.ai/
- Microsoft Agent Framework — https://learn.microsoft.com/en-us/agent-framework/
- Model Context Protocol — https://modelcontextprotocol.io/

## Current-version note

Framework APIs evolve quickly. Treat these links as study entry points, pin the versions used in each experiment, and record the date/version in every framework comparison.

## Exit criteria

You can translate a concept such as “stateful agent,” “tool calling,” or “durable workflow” between a custom implementation and at least two frameworks, including their trade-offs.