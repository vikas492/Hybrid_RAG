from app.embeddings.embedding_service import EmbeddingService
from app.vectorstores.qdrant_store import QdrantStore

embedder = EmbeddingService()
qdrant = QdrantStore()

query = "Tell me about AI in hospitals."

embedding = embedder.embed(query)

results = qdrant.search(embedding)

for result in results:
    print(result.payload)