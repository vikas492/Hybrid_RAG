from app.db.session import SessionLocal

# IMPORTANT: Register SQLAlchemy models
from app.models.document import Document
from app.models.document_chunk import DocumentChunk

from app.retrieval.bm25_service import BM25Service


db = SessionLocal()

chunks = db.query(DocumentChunk).all()

chunk_list = []

for chunk in chunks:

    chunk_list.append(
        {
            "document_id": chunk.document_id,
            "chunk_id": chunk.chunk_id,
            "text": chunk.text,
        }
    )

bm25 = BM25Service()

print("Building BM25 Index...")

bm25.index_documents(chunk_list)

print("✓ Index Built")

print()

query = input("Search: ")

results = bm25.search(
    query=query,
    limit=5,
)

print()
print("=" * 80)
print("BM25 RESULTS")
print("=" * 80)

for result in results:

    print()

    print(f"Score      : {result['score']:.4f}")
    print(f"Document   : {result['document_id']}")
    print(f"Chunk      : {result['chunk_id']}")

    print()

    print(result["text"][:500])

    print("-" * 80)