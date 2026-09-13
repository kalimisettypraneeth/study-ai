# 11 — Frameworks

> **Read first:** [Visual Study Guide](../docs/sections/11-frameworks.md)

Frameworks are studied after the underlying patterns are understood. The goal is to learn what abstraction the framework is providing, not just how to call its API.

## Framework families

- OpenAI Agents SDK
- PydanticAI
- LangChain
- LangGraph
- LlamaIndex
- Haystack
- CrewAI
- Microsoft Agent Framework
- AutoGen
- smolagents
- DSPy
- MCP

## Canonical sample suite

Every framework should implement the same workloads:

1. Structured model call
2. Tool agent
3. RAG assistant
4. Stateful workflow
5. Human approval
6. Multi-agent research
7. Evaluation harness
8. Production wrapper

## Selection rule

Choose based on the problem: integrations, typed agents, stateful orchestration, retrieval/data pipelines, multi-agent collaboration, optimization, or tool interoperability.

See the [visual guide](../docs/sections/11-frameworks.md) for diagrams, comparison questions, and the framework decision model.