"""Synthetic confusion matrix and release gate; no model benchmark claims."""
def metrics(tp, fp, fn, tn):
    counts = (tp, fp, fn, tn)
    if any(type(x) is not int or x < 0 for x in counts) or sum(counts) == 0:
        raise ValueError('nonnegative integer counts and at least one case required')
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    return {'accuracy': (tp + tn) / sum(counts), 'precision': precision, 'recall': recall, 'f1': f1}

def main():
    result = metrics(8, 2, 4, 86)
    assert result['accuracy'] == 0.94
    assert abs(result['f1'] - 8 / 11) < 1e-12
    for name, value in result.items():
        print(f'{name}={value:.4f}')
    candidate_success, unsafe_actions = 0.9, 1
    release = candidate_success >= 0.8 and unsafe_actions == 0
    assert not release
    print('release_allowed:', release)

if __name__ == '__main__':
    main()
