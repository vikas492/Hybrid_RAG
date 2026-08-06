from app.db.session import SessionLocal

from app.models.document import Document
from app.models.document_chunk import DocumentChunk

from app.retrieval.hybrid_service import HybridSearchService
from app.retrieval.reranker import Reranker


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

reranker = Reranker()

query = input("Question: ")

results = hybrid.search(
    query=query,
    chunks=chunk_list,
    limit=20,
)

results = reranker.rerank(
    query=query,
    chunks=results,
)

print("\n")
print("=" * 80)
print("RERANKED RESULTS")
print("=" * 80)

for result in results:

    print(f"\nChunk: {result['chunk_id']}")
    print(f"Hybrid Score : {result['score']:.4f}")
    print(f"Rerank Score : {result['rerank_score']:.4f}")

    print()
    print(result["text"][:500])

    print("-" * 80)