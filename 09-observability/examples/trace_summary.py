"""Nearest-rank percentiles and metadata-only fixture telemetry."""
import json
import math

SAFE = {'trace_id', 'duration_ms', 'tool_name', 'status'}

def nearest_rank(values, percentile):
    if not values or not 0 < percentile <= 1:
        raise ValueError('nonempty samples and percentile in (0,1] required')
    return sorted(values)[math.ceil(percentile * len(values)) - 1]

def main():
    p95 = nearest_rank([10, 20, 30, 40, 100], 0.95)
    assert p95 == 100
    event = {'trace_id': 'fixture-1', 'duration_ms': 100, 'tool_name': 'lookup',
             'status': 'ok', 'prompt': 'PRIVATE FIXTURE', 'api_key': 'FAKE-DO-NOT-LOG'}
    safe = {key: value for key, value in event.items() if key in SAFE}
    assert 'prompt' not in safe and 'api_key' not in safe
    print(f'p95_ms={p95}; method=nearest_rank; n=5')
    print(json.dumps(safe, sort_keys=True))
    # A key allowlist alone is insufficient if allowed field values contain secrets.

if __name__ == '__main__':
    main()
