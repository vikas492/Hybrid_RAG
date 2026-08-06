SMALL_TALK_RESPONSES = {
    "hi": "Hello! 👋 How can I help you today?",
    "hello": "Hello! 👋 How can I help you today?",
    "hey": "Hey! 👋 What can I help you with?",
    "good morning": "Good morning! ☀️ How can I help you today?",
    "good afternoon": "Good afternoon! 😊",
    "good evening": "Good evening! 🌙",
    "thanks": "You're welcome! 😊 Let me know if you have any more questions.",
    "thank you": "You're welcome! 😊 Happy to help.",
    "ok": "👍",
    "okay": "👍",
    "bye": "Goodbye! 👋 Have a great day.",
}


def get_small_talk_response(question: str) -> str | None:
    question = question.strip().lower()

    return SMALL_TALK_RESPONSES.get(question)