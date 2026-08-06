from pathlib import Path

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.settings import settings
from app.pipelines.ingestion_pipeline import IngestionPipeline
from app.repositories.document_repository import DocumentRepository
from app.retrieval.bm25_service import BM25Service
from app.schemas.document import DocumentResponse
from app.storage.local_storage import LocalStorage


class UploadService:

    ALLOWED_CONTENT_TYPES = {
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/markdown",
        "text/plain",
    }

    def __init__(self):

        self.storage = LocalStorage()
        self.repository = DocumentRepository()
        self.pipeline = IngestionPipeline()

    def upload_document(
        self,
        db: Session,
        file: UploadFile,
    ) -> DocumentResponse:

        if file.content_type not in self.ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported file type",
            )

        file.file.seek(0, 2)
        file_size = file.file.tell()
        file.file.seek(0)

        if file_size > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File size exceeds limit",
            )

        file_path = self.storage.save(file)

        stored_filename = Path(file_path).name

        document = self.repository.create_uploaded_document(
            db=db,
            filename=file.filename,
            stored_filename=stored_filename,
            file_path=file_path,
            content_type=file.content_type,
            file_size=file_size,
        )

        self.pipeline.process_document(
            db=db,
            document_id=document.id,
            filename=stored_filename,
            file_path=file_path,
        )

        # Rebuild BM25 index on next search
        BM25Service().invalidate()

        return DocumentResponse.model_validate(document)