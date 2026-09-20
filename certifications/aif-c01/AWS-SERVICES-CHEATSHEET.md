# AWS Services Cheat Sheet

The official in-scope list is non-exhaustive and can change. Learn services through **requirement → capability → service → tradeoff**.

## AI / ML

| Service | Remember it as |
|---|---|
| Amazon Bedrock | managed foundation-model / GenAI application capabilities |
| Amazon Bedrock AgentCore | agentic application capabilities |
| Amazon SageMaker AI | build/train/deploy/manage ML models |
| SageMaker JumpStart | models/solutions to accelerate ML/GenAI work |
| Amazon Nova | AWS foundation-model family |
| Amazon Comprehend | NLP/text insights |
| Amazon Lex | conversational interfaces |
| Amazon Polly | text-to-speech |
| Amazon Transcribe | speech-to-text |
| Amazon Translate | machine translation |
| Amazon Textract | extract text/data from documents |
| Amazon Rekognition | image/video analysis |
| Amazon Personalize | recommendations |
| Strands Agents | agent development framework |
| Kiro | AI-powered development tooling |

## Core supporting services

| Service | Mental model |
|---|---|
| S3 | object storage / AI data |
| EC2 | compute |
| Lambda | serverless compute |
| VPC | network isolation |
| DynamoDB | NoSQL database |
| Aurora | relational database |
| OpenSearch | search/analytics |
| Neptune | graph database |
| ElastiCache | in-memory caching |
| CloudWatch | monitoring/logs/metrics |
| CloudTrail | API auditing |
| Config | configuration/compliance |
| IAM | permissions |
| KMS | encryption keys |
| Secrets Manager | secrets |
| Macie | sensitive-data discovery |
| Artifact | compliance documents |
| Inspector | vulnerability assessment |
| AWS Budgets | budget controls |
| Cost Explorer | cost analysis |

## Common comparisons

### Bedrock vs SageMaker AI

```text
Bedrock → managed FM application platform; choose/use FMs with less model infrastructure
SageMaker AI → broader ML development lifecycle; build/train/customize/deploy/manage models
```

### CloudTrail vs CloudWatch

```text
CloudTrail → “Who did what API action?”
CloudWatch → “How is my workload behaving?”
```

### KMS vs Secrets Manager

```text
KMS → encryption keys
Secrets Manager → passwords/API keys/secrets
```

### Comprehend vs Textract

```text
Comprehend → understand text
Textract → extract text/data from documents
```

### Transcribe vs Polly

```text
Transcribe → speech → text
Polly → text → speech
```

## Scenario rule

```text
Requirement → capability → AWS service → security + cost + latency → answer
```

Do not choose a service merely because it is an AI service.
