# Domain 1 — AI and ML Foundations

**Exam weight: 20%**

## AI → ML → Deep Learning

```text
Artificial Intelligence
└── Machine Learning
    └── Deep Learning
        └── Neural networks / CNNs / transformers

Generative AI is an AI capability focused on generating new content.
```

- **AI:** systems performing tasks that normally require human-like intelligence.
- **ML:** systems learn patterns from data rather than relying only on explicit rules.
- **Deep learning:** ML using multi-layer neural networks.
- **Model:** learned representation used to predict or generate.
- **Algorithm:** procedure used to learn or solve a problem.
- **Training:** learning from data.
- **Inference:** using a trained model to produce output.

## Learning types

| Type | Data | Typical task |
|---|---|---|
| Supervised | labeled | classification, regression |
| Unsupervised | unlabeled | clustering |
| Reinforcement | rewards/feedback | sequential decisions |

Example: historical transactions labeled fraud/not-fraud → supervised classification.

## Training vs inference

```text
TRAINING: data → preprocessing → algorithm → parameters → model
INFERENCE: new input → trained model → prediction/generated output
```

Batch inference processes many records together. Real-time inference responds to online requests.

## Overfitting vs underfitting

```text
Underfitting → model too simple → poor train and test performance
Good fit      → learns useful patterns → good generalization
Overfitting   → memorizes training data/noise → poor unseen performance
```

## Classification metrics

**Accuracy** = (TP + TN) / all predictions

**Precision** = TP / (TP + FP)

Question: “Of what I predicted positive, how many were positive?”

**Recall** = TP / (TP + FN)

Question: “Of all actual positives, how many did I find?”

**F1** = harmonic mean of precision and recall.

Exam clue:
- false positives are especially costly → precision matters
- false negatives are especially costly → recall matters

## ML lifecycle

```text
Business problem
      ↓
Data collection
      ↓
Data preparation
      ↓
Feature engineering / representation
      ↓
Train → validate/evaluate
      ↓
Deploy
      ↓
Monitor
      ↓
Feedback / retrain ↺
```

MLOps adds repeatability, deployment processes, monitoring, model/version management, and operational controls.

## Practical use cases

| Problem | Technique/service |
|---|---|
| Predict price | Regression |
| Spam/not spam | Classification |
| Group customers | Clustering |
| Speech → text | Transcribe |
| Text translation | Translate |
| Document extraction | Textract |
| Text insights | Comprehend |
| Text → speech | Polly |
| Conversational bot | Lex |
| Image/video analysis | Rekognition |
| Recommendations | Personalize |

## Exam traps

1. ML does not always mean deep learning.
2. GenAI is not synonymous with all deep learning.
3. Training is not inference.
4. Precision and recall answer different questions.
5. Technically possible AI is not automatically the right business solution.
6. Consider cost, latency, explainability, regulation, data availability, and business value.

## Self-check

Explain without notes:
1. AI vs ML vs deep learning.
2. Supervised vs unsupervised vs reinforcement learning.
3. Precision vs recall.
4. Training vs inference.
5. ML lifecycle.
