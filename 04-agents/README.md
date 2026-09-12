# 04 — Agents

Build the agent abstraction from first principles before adopting an agent framework. An agent is best studied as a controlled loop that uses an LLM to choose actions, executes those actions, observes results, and decides what to do next.

## Core model

```text
observe state
    ↓
ask model for next action
    ↓
validate decision
    ↓
execute tool / produce answer
    ↓
append observation to state
    ↓
stop or continue
```

The hard engineering problems are state, stop conditions, tool safety, error recovery, context management, and evaluation—not merely getting the model to call a function.

## Learning path

1. Single-turn tool loop
2. State and event model
3. Tool selection
4. Stop conditions and budgets
5. Planning vs reactive execution
6. Reflection/critique
7. Memory integration
8. Human approval
9. Recovery/retry behavior
10. Agent security and containment

## Build sequence

### 1. Minimal agent loop

Start with one read-only tool.

```python
while turns < max_turns:
    decision = model(messages, tools)
    if decision.is_final:
        return decision.output
    result = dispatch(decision.tool_call)
    messages += [decision, result]
```

Make the state explicit rather than hiding it in framework objects.

### 2. Add budgets

Enforce:

- maximum turns
- wall-clock deadline
- tool-call count
- token/cost budget
- per-tool timeout

The loop must terminate even when the model keeps asking for more work.

### 3. Add planning

Compare three strategies:

```text
reactive:     decide → act → observe
plan-first:   plan → execute plan
hybrid:       plan → act → re-plan
```

Use the same benchmark tasks so the comparison is meaningful.

### 4. Add human approval

Pause before risky tools. Persist the state, request approval, then resume from the checkpoint. Test process restarts while approval is pending.

### 5. Add memory

Keep working state separate from long-term memory. Retrieval should be an explicit step, not an unbounded transcript.

## Experiments

- Reactive loop vs plan-first loop.
- One large tool vs several narrow tools.
- Maximum turn limits of 3/8/20.
- Retry tool failures vs ask the model to recover.
- Human approval before vs after planning.
- Summarized history vs full history.
- Inject hostile instructions into observations.

## Project suggestions

**Agent Zero** — a from-scratch agent runtime with tools, state, budgets, retries, and traces.

**Research Agent** — takes a question, searches a controlled corpus, verifies sources, and produces a cited report with a bounded tool loop.

**Approval-Based Assistant** — automates read-only work but pauses for approval before side effects such as publishing, sending, or modifying data.

## References

- OpenAI Agents SDK concepts — https://openai.github.io/openai-agents-python/
- OpenAI Agents SDK agents — https://openai.github.io/openai-agents-python/agents/
- Anthropic agentic/prompting guidance — https://docs.anthropic.com/
- Model Context Protocol — https://modelcontextprotocol.io/

## Exit criteria

You can implement the agent loop yourself, draw its state machine, explain every termination path, and prove with tests that the agent cannot exceed its execution or permission boundaries.