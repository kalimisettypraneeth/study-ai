"""Deterministic policy simulation: no HTTP requests or real backoff waits."""
RETRYABLE = {429, 502, 503, 504}

def replay(statuses, max_attempts=3):
    if max_attempts < 1:
        raise ValueError('max_attempts must be positive')
    attempted = []
    for status in statuses:
        attempted.append(status)
        if 200 <= status < 300:
            return 'success', attempted
        if status not in RETRYABLE:
            return 'permanent_failure', attempted
        if len(attempted) >= max_attempts:
            return 'exhausted', attempted
    return 'fixture_ended', attempted

def main():
    for statuses, expected in [
        ([503, 429, 200], ('success', [503, 429, 200])),
        ([401, 200], ('permanent_failure', [401])),
        ([503, 503, 503, 200], ('exhausted', [503, 503, 503])),
    ]:
        outcome = replay(statuses)
        assert outcome == expected
        print(f'{outcome[0]}: attempts={len(outcome[1])}')
    print('Real adapters also need deadlines, Retry-After handling, and jitter.')

if __name__ == '__main__':
    main()
