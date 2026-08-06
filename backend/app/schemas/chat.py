from datetime import datetime

from pydantic import BaseModel


class ChatRequest(BaseModel):

    session_id: int

    question: str


class Source(BaseModel):

    filename: str
    chunk_id: int
    passage: str


class ChatResponse(BaseModel):

    answer: str

    sources: list[Source]


# -----------------------------
# Chat History
# -----------------------------

class ChatMessageResponse(BaseModel):

    id: int
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True