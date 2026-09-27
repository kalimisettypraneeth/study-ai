"""Run all numbered-section offline examples; Python 3.11+, no dependencies."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]

def main():
    examples = sorted(ROOT.glob('[0-9][0-9]-*/examples/*.py'))
    if not examples:
        raise SystemExit('No examples found')
    failures = []
    for example in examples:
        print(f'\n--- {example.relative_to(ROOT)} ---', flush=True)
        try:
            result = subprocess.run([sys.executable, '-B', str(example)], cwd=ROOT,
                                    capture_output=True, text=True, timeout=15)
            print(result.stdout, end='')
            if result.returncode:
                print(result.stderr, file=sys.stderr, end='')
                failures.append(str(example.relative_to(ROOT)))
        except subprocess.TimeoutExpired:
            failures.append(str(example.relative_to(ROOT)))
            print('Example exceeded 15-second limit', file=sys.stderr)
    print(f'\n{len(examples)-len(failures)}/{len(examples)} examples passed')
    if failures:
        raise SystemExit(1)

if __name__ == '__main__':
    main()
