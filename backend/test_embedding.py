from app.embeddings.embedding_service import EmbeddingService

embedding_service = EmbeddingService()

embedding = embedding_service.embed(
    "Artificial Intelligence is transforming software."
)

print(type(embedding))
print(len(embedding))
print(embedding[:10])