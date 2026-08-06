from sqlalchemy.orm import Session

from app.repositories.chat_repository import ChatRepository


class ChatService:

    def __init__(self):

        self.repository = ChatRepository()

    def create_session(
        self,
        db: Session,
    ):

        return self.repository.create_session(
            db=db,
        )

    def get_session(
        self,
        db: Session,
        session_id: int,
    ):

        return self.repository.get_session(
            db=db,
            session_id=session_id,
        )

    def list_sessions(
        self,
        db: Session,
    ):

        return self.repository.list_sessions(
            db=db,
        )

    def add_user_message(
        self,
        db: Session,
        session_id: int,
        content: str,
    ):

        return self.repository.add_message(
            db=db,
            session_id=session_id,
            role="user",
            content=content,
        )

    def add_assistant_message(
        self,
        db: Session,
        session_id: int,
        content: str,
    ):

        return self.repository.add_message(
            db=db,
            session_id=session_id,
            role="assistant",
            content=content,
        )

    def get_history(
        self,
        db: Session,
        session_id: int,
        limit: int = 10,
    ):

        return self.repository.get_messages(
            db=db,
            session_id=session_id,
            limit=limit,
        )

    # ----------------------------------------
    # NEW: Return complete chat history
    # ----------------------------------------
    def get_messages(
        self,
        db: Session,
        session_id: int,
    ):

        return self.repository.get_messages(
            db=db,
            session_id=session_id,
            limit=100000,
        )

    def update_title(
        self,
        db: Session,
        session_id: int,
        title: str,
    ):

        return self.repository.update_title(
            db=db,
            session_id=session_id,
            title=title,
        )

    def rename_session(
        self,
        db: Session,
        session_id: int,
        title: str,
    ):

        return self.repository.rename_session(
            db=db,
            session_id=session_id,
            title=title,
        )

    def delete_session(
        self,
        db: Session,
        session_id: int,
    ):

        return self.repository.delete_session(
            db=db,
            session_id=session_id,
        )