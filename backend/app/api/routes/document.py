from typing import List

from fastapi import (
    APIRouter,
    Depends,
    File,
    Response,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.document import (
    DocumentCreateRequest,
    DocumentResponse,
)
from app.services.document_service import DocumentService
from app.services.upload_service import UploadService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)

document_service = DocumentService()
upload_service = UploadService()


@router.post(
    "",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_document(
    document: DocumentCreateRequest,
    db: Session = Depends(get_db),
):
    return document_service.create_document(
        db=db,
        document=document,
    )


@router.post(
    "/upload",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
)
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    return upload_service.upload_document(
        db=db,
        file=file,
    )


@router.get(
    "",
    response_model=List[DocumentResponse],
)
def get_documents(
    db: Session = Depends(get_db),
):
    return document_service.get_all_documents(db)


@router.get(
    "/{document_id}",
    response_model=DocumentResponse,
)
def get_document(
    document_id: int,
    db: Session = Depends(get_db),
):
    return document_service.get_document_by_id(
        db=db,
        document_id=document_id,
    )


@router.delete(
    "/{document_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
):
    document_service.delete_document(
        db=db,
        document_id=document_id,
    )

    return Response(
        status_code=status.HTTP_204_NO_CONTENT,
    )