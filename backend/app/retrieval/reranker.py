from sentence_transformers import CrossEncoder


class Reranker:

    _model = None

    def __init__(self):

        if Reranker._model is None:

            print("Loading Cross Encoder...")

            Reranker._model = CrossEncoder(
                "cross-encoder/ms-marco-MiniLM-L-6-v2"
            )

            print("✅ Cross Encoder Ready")

        self.model = Reranker._model

    def rerank(
        self,
        query: str,
        chunks: list[dict],
        limit: int = 10,
    ):

        if not chunks:
            return []

        pairs = [
            (
                query,
                chunk["text"],
            )
            for chunk in chunks
        ]

        scores = self.model.predict(pairs)

        for chunk, score in zip(chunks, scores):

            chunk["rerank_score"] = float(score)

        chunks.sort(
            key=lambda x: x["rerank_score"],
            reverse=True,
        )

        print("\n========== RERANK RESULTS ==========\n")

        for chunk in chunks:

            print(
                f"Chunk {chunk['chunk_id']} | "
                f"Rerank: {chunk['rerank_score']:.4f}"
            )

        return chunks[:limit]