from app.retrieval.retrieval_service import RetrievalService

retriever = RetrievalService()

query = input("Enter your question: ")

results = retriever.search(query)

print("\n" + "=" * 80)
print("SEARCH RESULTS")
print("=" * 80)

for i, result in enumerate(results, start=1):

    print(f"\nResult #{i}")
    print("-" * 80)

    print(f"Score       : {result['score']:.4f}")
    print(f"Document ID : {result['document_id']}")
    print(f"Filename    : {result['filename']}")
    print(f"Chunk ID    : {result['chunk_id']}")

    print("\nRetrieved Chunk:\n")
    print(result["text"])

print("\n" + "=" * 80)