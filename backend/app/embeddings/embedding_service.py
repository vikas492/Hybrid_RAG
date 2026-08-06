from sentence_transformers import SentenceTransformer


class EmbeddingService:

    _model = None

    def __init__(self):

        if EmbeddingService._model is None:

            print("Loading Embedding Model...")

            EmbeddingService._model = SentenceTransformer(
                "BAAI/bge-small-en-v1.5"
            )

            print("✅ Embedding Model Ready")

        self.model = EmbeddingService._model

    def embed(
        self,
        text: str,
    ) -> list[float]:

        embedding = self.model.encode(
            text,
            normalize_embeddings=True,
        )

        return embedding.tolist()

    def embed_batch(
        self,
        texts: list[str],
    ) -> list[list[float]]:

        embeddings = self.model.encode(
            texts,
            normalize_embeddings=True,
        )

        return embeddings.tolist()