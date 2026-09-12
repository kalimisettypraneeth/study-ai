# Topic Template

Use this template for every new subject in the repository.

## 1. What is it?

Explain the problem in plain language and define the important terms.

## 2. Mental model

Draw the smallest useful architecture or flow. Prefer diagrams and concrete examples over framework terminology.

## 3. Why does it matter?

Describe when the concept helps and when it is unnecessary.

## 4. Build it from scratch

Implement the smallest version that exposes the important mechanics. Keep dependencies minimal.

## 5. Example

Include one runnable example with representative input and output.

## 6. Tests

Test normal behavior, boundary cases, malformed inputs, and failures.

## 7. Experiment

Change one meaningful variable at a time. Record configuration, measurements, and interpretation.

## 8. Failure modes

Document how the implementation fails, how to detect the failure, and what engineering control mitigates it.

## 9. Framework comparison

After the from-scratch implementation, reproduce the same behavior with a relevant framework and map:

```text
our primitive → framework abstraction → operational trade-off
```

## 10. Production pattern

Document reliability, security, observability, cost, scaling, and deployment concerns.

## 11. Project extension

Give one small project that combines this topic with earlier concepts and one larger project that prepares for the next roadmap phase.

## 12. References

Prefer:

- official documentation
- original research papers
- protocol/standards documentation
- source code

Record the version/date when a resource or API is fast-moving.

## 13. Exit criteria

State what the learner must be able to build, test, explain, and debug before moving on.