from fastapi import APIRouter

from app.rag.rag_service import RAGService
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

rag_service = RAGService()


@router.post(
    "",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
):

    return rag_service.ask(
        session_id=request.session_id,
        question=request.question,
    )