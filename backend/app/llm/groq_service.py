from groq import Groq

from app.core.settings import settings


class GroqService:

    _client = None

    def __init__(self):

        if GroqService._client is None:

            print("Initializing Groq...")
            print("Model:", settings.GROQ_MODEL)

            GroqService._client = Groq(
                api_key=settings.GROQ_API_KEY,
            )

        self.client = GroqService._client
        self.model = settings.GROQ_MODEL

    def generate(
        self,
        prompt: str,
    ) -> str:

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0,
        )

        return response.choices[0].message.content