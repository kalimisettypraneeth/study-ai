# 04 — Agents: Concept Notes

## What is an agent?

An agent is a bounded control loop in which an LLM chooses the next action using the current state.

```mermaid
flowchart TD
    Observe[Observe state] --> Decide[LLM decides]
    Decide --> Validate[Validate decision]
    Validate --> Act[Execute tool/action]
    Act --> Observe
    Decide --> Final[Final answer]
```

The important concepts are state, permissions, budgets, and termination—not the loop syntax itself.

## Reactive vs planning

```mermaid
flowchart LR
    Reactive[Decide → Act → Observe] --> Simple[Simple tasks]
    Plan[Plan → Execute] --> Stable[Predictable workflows]
    Hybrid[Plan → Act → Re-plan] --> Dynamic[Changing environments]
```

Start with the simplest strategy that meets the task requirement.

## Agent budgets

Every agent should have explicit limits:

```text
maximum turns
maximum tool calls
wall-clock deadline
token/cost budget
per-tool timeout
permission scope
```

These are safety controls as much as cost controls.

## Human approval

```mermaid
flowchart TD
    Agent --> Risk{Side effect?}
    Risk -->|No| Execute
    Risk -->|Yes| Persist[Persist state]
    Persist --> Approval[Request approval]
    Approval -->|Approved| Execute
    Approval -->|Rejected| Stop
```

Persist before pausing so a process restart does not lose the pending operation.

## Memory integration

Current state answers “what do I need to continue this run?” Long-term memory answers “what should I retain for future runs?” Keep the two explicit.

## Worked example: research agent

Use three read-only tools: search, open source, summarize.

```text
question
  ↓
plan/search
  ↓
collect evidence
  ↓
verify sources
  ↓
synthesize
  ↓
cite
```

Limit it to a fixed number of turns and tool calls. Test a hostile document that attempts to redirect the agent.

## Best practices

1. Start with one agent.
2. Make every termination path explicit.
3. Prefer narrow tools.
4. Put budgets in code, not only prompts.
5. Persist state before side effects.
6. Evaluate traces, not only final answers.

## Remember
**An agent is a bounded decision system, not unlimited autonomy.**
