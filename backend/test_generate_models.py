from google import genai

from app.core.settings import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

print("Testing models...\n")

models_to_try = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-001",
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash-lite-001",
    "gemini-2.5-pro",
    "gemini-flash-latest",
    "gemini-pro-latest",
]

for model in models_to_try:
    try:
        response = client.models.generate_content(
            model=model,
            contents="Say hello."
        )

        print(f"✅ {model} works")
        print(response.text)
        break

    except Exception as e:
        print(f"❌ {model}")
        print(e)
        print("-" * 60)