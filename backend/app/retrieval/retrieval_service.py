from app.embeddings.embedding_service import EmbeddingService
from app.vectorstores.qdrant_store import QdrantStore


class RetrievalService:

    _embedder = None
    _vector_store = None

    def __init__(self):

        if RetrievalService._embedder is None:

            print("Creating Embedding Service...")
            RetrievalService._embedder = EmbeddingService()

        if RetrievalService._vector_store is None:

            print("Creating Qdrant Store...")
            RetrievalService._vector_store = QdrantStore()

        self.embedder = RetrievalService._embedder
        self.vector_store = RetrievalService._vector_store

        print("✅ Retrieval Service Ready")

    def search(
        self,
        query: str,
        limit: int = 10,
        score_threshold: float = 0.35,
    ):

        print(f"\nSearching for: {query}")

        embedding = self.embedder.embed(query)

        results = self.vector_store.search(
            embedding=embedding,
            limit=limit,
        )

        formatted_results = []

        for point in results.points:

            payload = point.payload

            formatted_results.append(
                {
                    "score": float(point.score),
                    "document_id": payload["document_id"],
                    "filename": payload["filename"],
                    "chunk_id": payload["chunk_id"],
                    "text": payload["text"],
                }
            )

        formatted_results.sort(
            key=lambda x: x["score"],
            reverse=True,
        )

        print(f"✓ Retrieved {len(formatted_results)} chunks")

        return formatted_results