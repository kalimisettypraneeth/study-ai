# Resources

Curated external material organized by roadmap topic. Prefer primary sources: official documentation, research papers, standards, and source code. Record why a resource is useful, the date/version studied, and which roadmap topic it supports.

## Foundations

- Python — https://docs.python.org/3/
- pytest — https://docs.pytest.org/
- Docker — https://docs.docker.com/
- JSON Schema — https://json-schema.org/
- Hugging Face course — https://huggingface.co/learn/nlp-course/

**Study papers:**

- *Attention Is All You Need* — https://arxiv.org/abs/1706.03762
- *BERT: Pre-training of Deep Bidirectional Transformers* — https://arxiv.org/abs/1810.04805
- *Language Models are Few-Shot Learners* — https://arxiv.org/abs/2005.14165

## LLM engineering

- OpenAI — https://platform.openai.com/docs
- Anthropic — https://docs.anthropic.com/
- Google Gemini API — https://ai.google.dev/gemini-api/docs
- JSON Schema — https://json-schema.org/

Use provider docs to learn current API behavior, but keep the repository concepts provider-neutral wherever possible.

## Agents and tools

- OpenAI Agents SDK — https://openai.github.io/openai-agents-python/
- Model Context Protocol — https://modelcontextprotocol.io/
- OWASP LLM Top 10 — https://owasp.org/www-project-top-10-for-large-language-model-applications/

## RAG

- Lewis et al. RAG paper — https://arxiv.org/abs/2005.11401
- Sentence Transformers — https://www.sbert.net/
- FAISS — https://faiss.ai/
- LlamaIndex — https://docs.llamaindex.ai/

## Orchestration and production

- LangGraph — https://langchain-ai.github.io/langgraph/
- Temporal — https://docs.temporal.io/
- OpenTelemetry — https://opentelemetry.io/docs/
- Kubernetes — https://kubernetes.io/docs/
- Microsoft Agent Framework — https://learn.microsoft.com/en-us/agent-framework/

## How to evaluate a resource

Before adding a resource, ask:

1. Is it a primary source or a commentary?
2. Does it explain a durable concept or only an API version?
3. Can I reproduce one idea from it in a lab?
4. Does it describe limitations/failure modes?
5. Will the link remain useful if a framework API changes?

For fast-moving frameworks, save the version/date studied in the relevant framework README rather than assuming the current documentation is permanent.