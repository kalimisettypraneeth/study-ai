"""Offline bounded concurrency demonstration. Run with Python 3.11+."""
import asyncio

async def main():
    limit = 2
    semaphore = asyncio.Semaphore(limit)
    active = peak = 0

    async def job(number):
        nonlocal active, peak
        async with semaphore:
            active += 1
            peak = max(peak, active)
            try:
                await asyncio.sleep(0.01)  # Simulated I/O, not a benchmark.
                return number * number
            finally:
                active -= 1

    results = await asyncio.gather(*(job(i) for i in range(6)))
    assert peak <= limit
    assert results == [0, 1, 4, 9, 16, 25]
    assert active == 0
    print(f"peak_active={peak}; results={results}")

if __name__ == '__main__':
    asyncio.run(main())
