"""Single-process fixture budget. Units are fictional; no billing integration."""
class Budget:
    def __init__(self, total):
        self.total = total
        self.spent = 0
        self.reservations = {}

    @property
    def available(self):
        return self.total - self.spent - sum(self.reservations.values())

    def reserve(self, request_id, amount):
        if type(amount) is not int or amount <= 0 or request_id in self.reservations:
            raise ValueError('positive amount and unique request ID required')
        if amount > self.available:
            return False
        self.reservations[request_id] = amount
        return True

    def settle(self, request_id, actual):
        reserved = self.reservations[request_id]
        if type(actual) is not int or not 0 <= actual <= reserved:
            raise ValueError('fixture assumes actual usage is bounded by reservation')
        self.spent += actual
        del self.reservations[request_id]

def main():
    budget = Budget(100)
    assert budget.reserve('a', 60)
    assert not budget.reserve('b', 50)
    print('after reservation: available=40; next 50 rejected')
    budget.settle('a', 40)
    assert budget.available == 60
    assert budget.reserve('b', 50)
    assert budget.available == 10
    print('after settlement and next reservation: spent=40; reserved=50; available=10')

if __name__ == '__main__':
    main()
