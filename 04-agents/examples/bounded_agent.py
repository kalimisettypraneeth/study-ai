"""Scripted decisions teach loop control; this is not a live LLM agent."""
def run(decisions, max_turns=3):
    if max_turns < 1:
        raise ValueError('positive turn budget required')
    observations = []
    iterator = iter(decisions)
    for turn in range(1, max_turns + 1):
        decision = next(iterator, {'tool': 'lookup'})
        if 'final' in decision:
            if not isinstance(decision['final'], str) or not decision['final'].strip():
                return {'status': 'failed', 'turns': turn, 'observations': observations}
            return {'status': 'completed', 'turns': turn, 'answer': decision['final'], 'observations': observations}
        if decision.get('tool') == 'lookup':
            observations.append({'source_id': 'policy-1', 'text': 'Fixture return period: 30 days.'})
        else:
            observations.append({'error': 'UNKNOWN_TOOL'})
    return {'status': 'budget_exhausted', 'turns': max_turns, 'observations': observations}

def main():
    completed = run([{'tool': 'lookup'}, {'final': 'The fixture policy says 30 days [policy-1].'}])
    looping = run([])
    assert completed['status'] == 'completed' and completed['turns'] == 2
    assert looping['status'] == 'budget_exhausted' and len(looping['observations']) == 3
    assert run([{'tool': 'run_any_command'}], 1)['observations'] == [{'error': 'UNKNOWN_TOOL'}]
    print(f"normal: {completed['status']} in {completed['turns']} turns")
    print(f"looping: {looping['status']} after {looping['turns']} turns")

if __name__ == '__main__':
    main()
