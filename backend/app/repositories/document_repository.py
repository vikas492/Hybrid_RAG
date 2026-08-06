from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models.document import Document
from app.schemas.document import DocumentCreateRequest


class DocumentRepository:
    def create(
        self,
        db: Session,
        document: DocumentCreateRequest,
    ) -> Document:

        try:
            db_document = Document(
                filename=document.filename,
                content_type=document.content_type,
                file_size=document.file_size,
            )

            db.add(db_document)
            db.commit()
            db.refresh(db_document)

            return db_document

        except SQLAlchemyError:
            db.rollback()
            raise

    def get_all(
        self,
        db: Session,
    ) -> list[Document]:

        return db.query(Document).all()

    def get_by_id(
        self,
        db: Session,
        document_id: int,
    ) -> Document | None:

        return (
            db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )

    def delete(
        self,
        db: Session,
        document: Document,
    ) -> None:

        try:
            db.delete(document)
            db.commit()

        except SQLAlchemyError:
            db.rollback()
            raise


    def create_uploaded_document(
        self,
        db: Session,
        filename: str,
        stored_filename: str,
        file_path: str,
        content_type: str,
        file_size: int,
    ) -> Document:

        try:
            document = Document(
                filename=filename,
                stored_filename=stored_filename,
                file_path=file_path,
                content_type=content_type,
                file_size=file_size,
            )

            db.add(document)
            db.commit()
            db.refresh(document)

            return document

        except SQLAlchemyError:
            db.rollback()
            raise