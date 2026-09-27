"""Deterministic memory scope, TTL, and deletion fixture."""
from dataclasses import dataclass

@dataclass(frozen=True)
class Memory:
    id: str
    user: str
    content: str
    expires_at: int | None

def retrieve(records, authenticated_user, now):
    return [r for r in records if r.user == authenticated_user
            and (r.expires_at is None or r.expires_at > now)]

def main():
    records = [Memory('1', 'alice', 'Prefer concise answers', None),
               Memory('2', 'bob', 'Prefer detailed answers', None),
               Memory('3', 'alice', 'Old temporary preference', 99),
               Memory('4', 'alice', 'Boundary expiration', 100)]
    visible = retrieve(records, 'alice', 100)
    assert [r.id for r in visible] == ['1']
    print('visible_ids:', [r.id for r in visible])
    records = [r for r in records if not (r.user == 'alice' and r.id == '1')]
    assert retrieve(records, 'alice', 100) == []
    print('after deletion: []')

if __name__ == '__main__':
    main()
