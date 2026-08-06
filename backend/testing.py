from app.retrieval.retrieval_service import RetrievalService

retriever = RetrievalService()

results = retriever.search(
    query="What is my name?",
    limit=10,
    score_threshold=0.0,
)

print("\n========== VECTOR RESULTS ==========\n")

for result in results:
    print("File:", result["filename"])
    print("Chunk:", result["chunk_id"])
    print("Score:", result["score"])
    print(result["text"][:300])
    print("-" * 80)