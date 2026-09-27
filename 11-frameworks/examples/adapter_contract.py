"""Two fake adapters, not installed frameworks or measured model performance."""
from dataclasses import dataclass
from typing import Protocol

@dataclass(frozen=True)
class Result:
    text: str
    source_ids: tuple[str, ...]

class Adapter(Protocol):
    def answer(self, question: str) -> Result: ...

class FixtureA:
    def answer(self, question: str) -> Result:
        raw = {'answer': 'Fixture return period: 30 days.', 'sources': ['policy-1']}
        return Result(raw['answer'], tuple(raw['sources']))

class FixtureB:
    def answer(self, question: str) -> Result:
        raw = {'content': 'Fixture return period: 30 days.', 'citations': [{'id': 'policy-1'}]}
        return Result(raw['content'], tuple(c['id'] for c in raw['citations']))

def ask(adapter: Adapter, question: str) -> Result:
    result = adapter.answer(question)
    if not result.text or not result.source_ids:
        raise ValueError('incomplete fixture answer')
    return result

def main():
    results = [ask(adapter, 'What is the return period?') for adapter in (FixtureA(), FixtureB())]
    assert results[0] == results[1]
    print('2 fake adapters satisfy the same fixture contract')

if __name__ == '__main__':
    main()
