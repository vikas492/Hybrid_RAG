from app.rag.rag_service import RAGService

rag = RAGService()

question = input("Ask a question: ")

answer = rag.ask(question)

print("\n")
print("=" * 80)
print("FINAL ANSWER")
print("=" * 80)

print(answer)

print("=" * 80)