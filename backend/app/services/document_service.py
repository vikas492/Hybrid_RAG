from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.document_repository import DocumentRepository
from app.retrieval.bm25_service import BM25Service
from app.schemas.document import (
    DocumentCreateRequest,
    DocumentResponse,
)
from app.vectorstores.qdrant_store import QdrantStore
from pathlib import Path


class DocumentService:

    def __init__(self):

        self.repository = DocumentRepository()
        self.qdrant = QdrantStore()

    def create_document(
        self,
        db: Session,
        document: DocumentCreateRequest,
    ) -> DocumentResponse:

        db_document = self.repository.create(
            db,
            document,
        )

        return DocumentResponse.model_validate(db_document)

    def get_all_documents(
        self,
        db: Session,
    ) -> list[DocumentResponse]:

        documents = self.repository.get_all(db)

        return [
            DocumentResponse.model_validate(document)
            for document in documents
        ]

    def get_document_by_id(
        self,
        db: Session,
        document_id: int,
    ) -> DocumentResponse:

        document = self.repository.get_by_id(
            db,
            document_id,
        )

        if not document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found",
            )

        return DocumentResponse.model_validate(document)

    def delete_document(
        self,
        db: Session,
        document_id: int,
    ) -> None:

        document = self.repository.get_by_id(
            db,
            document_id,
        )

        if not document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found",
            )

        # Delete vectors from Qdrant
        self.qdrant.delete_document(
            document_id=document_id,
        )

        file_path = Path(document.file_path)

        if file_path.exists():
            file_path.unlink()
            print(f"Deleted file: {file_path}")

        # Delete PostgreSQL record
        self.repository.delete(
            db,
            document,
        )

        # Force BM25 rebuild on next search
        BM25Service().invalidate()