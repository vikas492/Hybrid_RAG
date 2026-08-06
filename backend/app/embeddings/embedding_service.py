import voyageai

from app.core.settings import settings


class EmbeddingService:

    _client = None

    def __init__(self):

        if EmbeddingService._client is None:

            print("Connecting to Voyage AI...")

            EmbeddingService._client = voyageai.Client(
                api_key=settings.VOYAGE_API_KEY,
            )

            print("✅ Voyage AI Ready")

        self.client = EmbeddingService._client

    def embed(
        self,
        text: str,
    ) -> list[float]:

        result = self.client.embed(
            texts=[text],
            model=settings.EMBEDDING_MODEL,
            input_type="query",
        )

        return result.embeddings[0]

    def embed_batch(
        self,
        texts: list[str],
    ) -> list[list[float]]:

        result = self.client.embed(
            texts=texts,
            model=settings.EMBEDDING_MODEL,
            input_type="document",
        )

        return result.embeddings