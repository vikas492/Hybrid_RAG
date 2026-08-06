from fastapi import APIRouter

from app.db.session import SessionLocal
from app.schemas.chat import ChatMessageResponse
from app.schemas.session import (
    CreateSessionResponse,
    RenameSessionRequest,
    RenameSessionResponse,
    SessionResponse,
)
from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/sessions",
    tags=["Sessions"],
)

chat_service = ChatService()


@router.post(
    "",
    response_model=CreateSessionResponse,
)
def create_session():

    db = SessionLocal()

    try:

        session = chat_service.create_session(db)

        return {
            "session_id": session.id,
        }

    finally:

        db.close()


@router.get(
    "",
    response_model=list[SessionResponse],
)
def list_sessions():

    db = SessionLocal()

    try:

        return chat_service.list_sessions(db)

    finally:

        db.close()


# ---------------------------------------------------
# NEW: Load all messages for a session
# ---------------------------------------------------

@router.get(
    "/{session_id}/messages",
    response_model=list[ChatMessageResponse],
)
def get_messages(
    session_id: int,
):

    db = SessionLocal()

    try:

        return chat_service.get_messages(
            db=db,
            session_id=session_id,
        )

    finally:

        db.close()


@router.patch(
    "/{session_id}",
    response_model=RenameSessionResponse,
)
def rename_session(
    session_id: int,
    request: RenameSessionRequest,
):

    db = SessionLocal()

    try:

        session = chat_service.rename_session(
            db=db,
            session_id=session_id,
            title=request.title,
        )

        return session

    finally:

        db.close()


@router.delete(
    "/{session_id}",
)
def delete_session(
    session_id: int,
):

    db = SessionLocal()

    try:

        success = chat_service.delete_session(
            db=db,
            session_id=session_id,
        )

        return {
            "success": success,
        }

    finally:

        db.close()