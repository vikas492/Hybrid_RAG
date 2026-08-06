from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.constants.document import DocumentStatus


class DocumentCreateRequest(BaseModel):
    filename: str
    content_type: str
    file_size: int


class DocumentResponse(BaseModel):
    id: int
    filename: str
    stored_filename: str
    file_path: str
    content_type: str
    file_size: int
    status: DocumentStatus
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)