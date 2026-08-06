from app.db.session import SessionLocal

# Register SQLAlchemy models
from app.models.document import Document
from app.models.document_chunk import DocumentChunk

from app.retrieval.hybrid_service import HybridSearchService


db = SessionLocal()

chunks = db.query(DocumentChunk).all()

chunk_list = []

for chunk in chunks:

    chunk_list.append(
        {
            "document_id": chunk.document_id,
            "filename": chunk.document.filename,
            "chunk_id": chunk.chunk_id,
            "text": chunk.text,
        }
    )

hybrid = HybridSearchService()

query = input("Question: ")

results = hybrid.search(
    query=query,
    chunks=chunk_list,
)

print("\n")
print("=" * 80)
print("HYBRID SEARCH RESULTS")
print("=" * 80)

for result in results:

    print()

    print("Document :", result["document_id"])
    print("Chunk    :", result["chunk_id"])

    if "score" in result:
        print("Score    :", result["score"])

    print()

    print(result["text"][:500])

    print("-" * 80)