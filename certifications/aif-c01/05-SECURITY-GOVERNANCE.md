# Domain 5 — Security, Compliance and Governance

**Exam weight: 14%**

## Shared responsibility

```text
AWS → security OF the cloud
Customer → security IN the cloud
           identities, permissions, data, configuration, workload controls
```

Exact responsibility depends on the service.

## Core security services

| Service | Mental model |
|---|---|
| IAM | identities, roles, policies, permissions |
| KMS | encryption key management |
| Secrets Manager | store/manage secrets |
| Macie | discover/protect sensitive S3 data |
| CloudTrail | API/activity audit trail |
| CloudWatch | monitoring, logs, metrics, alarms |
| Config | configuration/compliance assessment |
| Artifact | AWS compliance reports/contracts |
| Inspector | vulnerability/security assessment |
| VPC | network isolation/control |
| PrivateLink | private connectivity to supported services |
| Bedrock Guardrails | control/filter model inputs and outputs |

## Least privilege

```text
User/Agent → IAM role → minimum permissions → specific actions/resources
```

## AI-specific threats

### Prompt injection
Untrusted instructions attempt to alter model/agent behavior.

### Data leakage
Sensitive information can enter prompts, logs, retrieval stores, outputs, or downstream systems.

### Unsafe tool use
Reduce blast radius with least privilege, scoped credentials, validation, allowlists, human approval, and logging.

### Output validation
Generated output should not automatically be trusted as correct or safe.

## Governance lifecycle

```text
Policy → data governance → access controls → logging/monitoring
      → review/audit → corrective action ↺
```

Consider data residency, retention, lifecycle, access, provenance, audit trails, compliance requirements, and review cadence.

## Key comparisons

```text
IAM → authorization
KMS → encryption keys
Secrets Manager → secrets
CloudTrail → audit/API activity
CloudWatch → operational monitoring
Artifact → AWS compliance documentation
```

## Exam traps

- IAM is not encryption.
- KMS and Secrets Manager solve different problems.
- CloudTrail and CloudWatch solve different problems.
- Guardrails do not replace application authorization.
- Security controls should be layered.
