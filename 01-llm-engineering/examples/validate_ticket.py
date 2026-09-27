"""Validate fixture outputs; no model calls and no factual verification."""
import json

FIELDS = {'category', 'account_id', 'summary'}

def validate(raw):
    try:
        item = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise ValueError('invalid JSON syntax') from exc
    if type(item) is not dict or set(item) != FIELDS:
        raise ValueError('required fields must match exactly')
    if type(item['category']) is not str or item['category'] not in ('billing', 'technical', 'other'):
        raise ValueError('unsupported category')
    if item['account_id'] is not None and type(item['account_id']) is not str:
        raise ValueError('account_id must be a string or null')
    if type(item['summary']) is not str or not item['summary'].strip():
        raise ValueError('summary must be nonempty text')
    return item

def main():
    fixtures = [
        ('{"category":"billing","account_id":null,"summary":"Duplicate charge reported."}', True),
        ('{"category":"billing",}', False),
        ('{"category":"urgent","account_id":null,"summary":"Help"}', False),
        ('{"category":"billing","account_id":null,"summary":"Help","refund":true}', False),
        ('{"category":[],"account_id":null,"summary":"Help"}', False),
    ]
    for index, (raw, expected) in enumerate(fixtures, 1):
        try:
            validate(raw)
            valid = True
        except ValueError:
            valid = False
        assert valid == expected
        print(f'case_{index}: schema_valid={valid}')
    print('Schema checks do not verify the facts.')

if __name__ == '__main__':
    main()
