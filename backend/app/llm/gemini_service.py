from google import genai

from app.core.settings import settings


class GeminiService:

    _client = None

    def __init__(self):

        if GeminiService._client is None:

            print("Initializing Gemini...")
            print("Model Loaded:", settings.GEMINI_MODEL)

            GeminiService._client = genai.Client(
                api_key=settings.GEMINI_API_KEY,
            )

        self.client = GeminiService._client
        self.model = settings.GEMINI_MODEL

    def generate(
        self,
        prompt: str,
    ) -> str:

        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
        )

        return response.text

    def stream_generate(
        self,
        prompt: str,
    ):

        response = self.client.models.generate_content_stream(
            model=self.model,
            contents=prompt,
        )

        for chunk in response:

            if chunk.text:
                yield chunk.text