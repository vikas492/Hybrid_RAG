from app.llm.gemini_service import GeminiService

gemini = GeminiService()

answer = gemini.generate(
    """
Explain FastAPI in one paragraph.
"""
)

print("\nGemini Response:\n")
print(answer)