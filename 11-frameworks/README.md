# 11 — Frameworks

Frameworks are studied after the underlying patterns are understood. The goal is to learn **what abstraction the framework is providing**, not just how to call its API.

## Framework learning ladder

Study the same canonical application repeatedly instead of learning every framework through unrelated tutorials:

```text
from-scratch agent
      ↓
OpenAI Agents SDK / PydanticAI
      ↓
LangChain
      ↓
LangGraph
      ↓
LlamaIndex / Haystack
      ↓
CrewAI / Microsoft Agent Framework / AutoGen
      ↓
smolagents / DSPy as focused comparisons
```

The order is about conceptual progression, not a ranking.

## Canonical sample suite

Every framework should implement the same examples:

1. **Model call** — one prompt, structured response.
2. **Tool agent** — calculator/search/file tool with validation.
3. **RAG assistant** — retrieve, cite, answer.
4. **Stateful workflow** — branch, loop, persist, resume.
5. **Human approval** — pause before a side effect and resume afterward.
6. **Multi-agent research** — researcher, writer, reviewer.
7. **Evaluation harness** — golden dataset + trace/component checks.
8. **Production wrapper** — API, logging/tracing, timeouts, retries, security boundaries.

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
10. What happens after process restart or worker failure?
11. What are the strengths and limitations?
12. What is hidden by the abstraction?
13. What are the escape hatches for custom behavior?
14. How difficult is migration to/from a custom implementation?
15. What operational or vendor coupling is introduced?

## 1. OpenAI Agents SDK

Study agents, tools, guardrails, handoffs/agents-as-tools, sessions, human-in-the-loop, MCP integration, sandbox patterns, and tracing.

**Build:** port the hand-written agent from Phase 2 and compare control, testing, failure behavior, and tracing.

Official docs: https://openai.github.io/openai-agents-python/

## 2. LangChain

Study model/tool abstractions, integrations, prompt components, and high-level agent construction.

**Build:** implement a provider-portable support agent with two model providers and several tools.

Official docs: https://docs.langchain.com/oss/python/langchain/overview

## 3. LangGraph

Study explicit state graphs, branching, loops, persistence, interrupts, human-in-the-loop, and long-running execution.

**Build:** implement the canonical research workflow as a state graph and inject failures to test recovery.

Official docs: https://docs.langchain.com/oss/python/langgraph/overview

## 4. LlamaIndex

Focus on ingestion, indexing, retrieval, RAG, structured agent output, and agent workflows.

**Build:** recreate the RAG assistant and a research workflow where agents operate on retrieved knowledge.

Prefer current workflow APIs when studying orchestration; older `QueryPipeline` documentation is in a feature-freeze/deprecation phase.

Official docs: https://docs.llamaindex.ai/

## 5. PydanticAI

Focus on typed agents, dependency injection, tool schemas, structured outputs, and testability.

**Build:** a typed business workflow where tools and outputs are expressed through Pydantic models.

Official docs: https://ai.pydantic.dev/

## 6. Haystack

Focus on component pipelines, branching, loops, retrieval, tool calling, and agentic RAG.

**Build:** the canonical RAG workflow as an explicit pipeline and compare component isolation with LangGraph.

Official docs: https://docs.haystack.deepset.ai/

## 7. CrewAI

Focus on the distinction between autonomous **Crews** and controlled **Flows**.

**Build:** a research crew and then wrap the same task in a Flow with explicit state and control.

Official docs: https://docs.crewai.com/

## 8. Microsoft Agent Framework

Focus on agents, sessions, context/memory providers, workflows, executors, orchestration, human-in-the-loop, checkpoints, and hosting.

**Build:** a multi-step workflow with an approval gate and a resume-after-checkpoint scenario.

Official docs: https://learn.microsoft.com/en-us/agent-framework/

## 9. AutoGen

Study message-oriented agents and multi-agent application design.

**Build:** a small message-based research team and compare it against an explicit shared-state graph.

Official docs: https://microsoft.github.io/autogen/stable/

## 10. smolagents

Use this as a small-framework comparison and as a learning tool for transparent agent/tool execution.

**Build:** the simplest tool-using and code-execution agents you can make, then inspect execution telemetry.

Official docs: https://huggingface.co/docs/smolagents/index

## 11. DSPy

Study signatures, modules, metrics, and optimizer-driven improvement rather than treating prompts as the only programming interface.

**Build:** an evaluated information-extraction or RAG program and optimize it against a defined metric.

Official docs: https://dspy.ai/

## 12. MCP and interoperability

MCP is not an agent framework. Study it as a protocol boundary for interoperable tools/resources.

Build:

1. local function tool
2. remote HTTP tool
3. MCP server
4. MCP client
5. authenticated tool access
6. validation/authorization layer
7. failure and compatibility tests

Official docs: https://modelcontextprotocol.io/

## Framework selection cheat sheet

| Need | First choice to study | Alternatives |
|---|---|---|
| Learn agent primitives | From scratch | smolagents |
| Lightweight Python agents | OpenAI Agents SDK / PydanticAI | smolagents |
| Broad integrations | LangChain | LlamaIndex, Haystack |
| Stateful graph orchestration | LangGraph | Microsoft Agent Framework, Haystack |
| Data/RAG-heavy application | LlamaIndex | Haystack, LangChain |
| Search/RAG pipelines | Haystack | LlamaIndex |
| Role-based multi-agent collaboration | CrewAI | AutoGen, Microsoft Agent Framework |
| Message-oriented multi-agent systems | Microsoft Agent Framework / AutoGen | CrewAI, LangGraph |
| Prompt/program optimization | DSPy | evaluation + custom prompt tooling |
| Tool interoperability | MCP | direct APIs/function tools |

## Framework lab

For one canonical problem—such as a cited research workflow—implement:

```text
A. from scratch
B. OpenAI Agents SDK
C. PydanticAI
D. LangChain/LangGraph
E. one RAG-focused framework
F. one multi-agent framework
```

Compare:

- source lines
- control over execution
- state model
- testing surface
- observability
- failure recovery
- latency/cost
- dependency footprint
- upgrade/migration risk
- production readiness

## Project suggestion

**Framework Shootout** — one benchmark application implemented with a custom baseline and at least three frameworks. Produce:

- architecture diagrams
- equivalent feature matrix
- tests/evaluation results
- latency and cost measurements
- failure-injection results
- developer-experience notes
- migration notes
- recommendation by use case rather than one global winner

## Versioning practice

AI framework APIs evolve quickly. Every framework experiment must record:

- package versions
- model/provider version
- date tested
- example commit/tag used
- known breaking changes
- reference documentation URL

Never copy an old tutorial into the repository without checking the current official documentation.

## Exit criteria

You can translate a concept such as “stateful agent,” “tool calling,” “RAG,” “human approval,” or “durable workflow” between a custom implementation and at least two frameworks, including their trade-offs and failure behavior.
