from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk


class DocumentChunkRepository:

    def create_many(
        self,
        db: Session,
        chunks: list[DocumentChunk],
    ):

        try:

            db.add_all(chunks)

            db.commit()

        except SQLAlchemyError:

            db.rollback()
            raise

    def get_by_document(
        self,
        db: Session,
        document_id: int,
    ):

        return (
            db.query(DocumentChunk)
            .filter(
                DocumentChunk.document_id == document_id
            )
            .order_by(DocumentChunk.chunk_id)
            .all()
        )

    def delete_by_document(
        self,
        db: Session,
        document_id: int,
    ):

        try:

            (
                db.query(DocumentChunk)
                .filter(
                    DocumentChunk.document_id == document_id
                )
                .delete()
            )

            db.commit()

        except SQLAlchemyError:

            db.rollback()
            raise