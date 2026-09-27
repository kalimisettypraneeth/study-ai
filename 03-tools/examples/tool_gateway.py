"""In-memory approval/idempotency fixture. No email is sent."""
from hashlib import sha256

class DraftGateway:
    def __init__(self):
        self.results = {}

    def create(self, *, authenticated_user, key, text, approved_text):
        # Identity and approved_text are trusted runtime inputs, not model arguments.
        if authenticated_user != 'alice':
            raise PermissionError('not authorized')
        if type(key) is not str or not key or type(text) is not str or not text.strip():
            raise ValueError('invalid arguments')
        if approved_text != text:
            raise PermissionError('exact text not approved')
        scope = (authenticated_user, 'create_draft', key)
        fingerprint = sha256(text.encode()).hexdigest()
        if scope in self.results:
            previous_fingerprint, result = self.results[scope]
            if previous_fingerprint != fingerprint:
                raise ValueError('idempotency conflict')
            return result
        result = {'draft_id': f'fixture-{len(self.results) + 1}', 'status': 'created'}
        self.results[scope] = (fingerprint, result)
        return result

def main():
    gateway = DraftGateway()
    try:
        gateway.create(authenticated_user='alice', key='42', text='Hello', approved_text=None)
    except PermissionError:
        print('unapproved: blocked')
    else:
        raise AssertionError('unapproved action accepted')
    args = dict(authenticated_user='alice', key='42', text='Hello', approved_text='Hello')
    first = gateway.create(**args)
    assert gateway.create(**args) == first
    assert len(gateway.results) == 1
    print('same payload retry: one stored draft')
    try:
        gateway.create(authenticated_user='alice', key='42', text='Changed', approved_text='Changed')
    except ValueError:
        print('changed payload: conflict')
    else:
        raise AssertionError('conflicting payload accepted')
    try:
        gateway.create(authenticated_user='bob', key='42', text='Hello', approved_text='Hello')
    except PermissionError:
        print('other user: blocked')
    else:
        raise AssertionError('unauthorized user accepted')

if __name__ == '__main__':
    main()
