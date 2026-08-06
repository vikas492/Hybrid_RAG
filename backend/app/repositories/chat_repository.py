from datetime import datetime

from sqlalchemy.orm import Session

from app.models.chat_message import ChatMessage
from app.models.chat_session import ChatSession


class ChatRepository:

    def create_session(
        self,
        db: Session,
        title: str = "New Chat",
    ) -> ChatSession:

        session = ChatSession(
            title=title,
        )

        db.add(session)
        db.commit()
        db.refresh(session)

        return session

    def get_session(
        self,
        db: Session,
        session_id: int,
    ) -> ChatSession | None:

        return (
            db.query(ChatSession)
            .filter(ChatSession.id == session_id)
            .first()
        )

    def list_sessions(
        self,
        db: Session,
    ) -> list[ChatSession]:

        return (
            db.query(ChatSession)
            .order_by(ChatSession.updated_at.desc())
            .all()
        )

    def add_message(
        self,
        db: Session,
        session_id: int,
        role: str,
        content: str,
    ) -> ChatMessage:

        message = ChatMessage(
            session_id=session_id,
            role=role,
            content=content,
        )

        db.add(message)

        session = (
            db.query(ChatSession)
            .filter(ChatSession.id == session_id)
            .first()
        )

        if session:

            session.updated_at = datetime.utcnow()

        db.commit()
        db.refresh(message)

        return message

    def get_messages(
        self,
        db: Session,
        session_id: int,
        limit: int = 10,
    ) -> list[ChatMessage]:

        messages = (
            db.query(ChatMessage)
            .filter(ChatMessage.session_id == session_id)
            .order_by(ChatMessage.created_at.desc())
            .limit(limit)
            .all()
        )

        return list(reversed(messages))

    def update_title(
        self,
        db: Session,
        session_id: int,
        title: str,
    ):

        session = (
            db.query(ChatSession)
            .filter(ChatSession.id == session_id)
            .first()
        )

        if session:

            session.title = title
            session.updated_at = datetime.utcnow()

            db.commit()
            db.refresh(session)

        return session

    def rename_session(
        self,
        db: Session,
        session_id: int,
        title: str,
    ):

        session = (
            db.query(ChatSession)
            .filter(ChatSession.id == session_id)
            .first()
        )

        if session is None:
            return None

        session.title = title
        session.updated_at = datetime.utcnow()

        db.commit()
        db.refresh(session)

        return session

    def delete_session(
        self,
        db: Session,
        session_id: int,
    ):

        session = (
            db.query(ChatSession)
            .filter(ChatSession.id == session_id)
            .first()
        )

        if session is None:
            return False

        db.delete(session)
        db.commit()

        return True