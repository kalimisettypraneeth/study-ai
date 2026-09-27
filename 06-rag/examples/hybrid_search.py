"""Hand-ranked fixture lists: RRF and scoping, not real dense/BM25 search."""
def rrf(rankings, k=60):
    if k < 0:
        raise ValueError('k must be nonnegative')
    scores = {}
    for ranking in rankings:
        seen = set()
        for rank, doc_id in enumerate(ranking, 1):
            if doc_id in seen:
                continue
            seen.add(doc_id)
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank)
    return sorted(scores, key=lambda item: (-scores[item], item))

def recall_at_k(ranked, relevant, k):
    if not relevant:
        return None  # Unanswerable cases need a separate abstention metric.
    return len(set(ranked[:k]) & set(relevant)) / len(set(relevant))

def main():
    owner = {'A': 'alice', 'B': 'alice', 'C': 'alice', 'X': 'bob'}
    # Filter the synthetic lists before fusion; production should retrieve in scope.
    rankings = [[doc for doc in ranking if owner[doc] == 'alice']
                for ranking in [['X', 'A', 'B'], ['B', 'C', 'X']]]
    fused = rrf(rankings)
    assert fused == ['B', 'A', 'C']
    assert 'X' not in fused
    score = recall_at_k(fused, {'A', 'C'}, 2)
    assert score == 0.5
    assert recall_at_k(fused, set(), 2) is None
    print('fused:', fused)
    print(f'recall@2={score:.2f}; protected X excluded')

if __name__ == '__main__':
    main()
