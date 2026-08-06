from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk
from app.repositories.document_chunk_repository import (
    DocumentChunkRepository,
)
from app.retrieval.bm25_service import BM25Service


class DocumentChunkService:

    def __init__(self):

        self.repository = DocumentChunkRepository()

        self.bm25 = BM25Service()

    def create_chunks(
        self,
        db: Session,
        chunks: list[DocumentChunk],
    ):

        self.repository.create_many(
            db,
            chunks,
        )

        self.bm25.invalidate()

    def get_document_chunks(
        self,
        db: Session,
        document_id: int,
    ):

        return self.repository.get_by_document(
            db,
            document_id,
        )

    def delete_document_chunks(
        self,
        db: Session,
        document_id: int,
    ):

        self.repository.delete_by_document(
            db,
            document_id,
        )

        self.bm25.invalidate()