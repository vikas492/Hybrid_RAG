from datetime import datetime

from pydantic import BaseModel


class SessionResponse(BaseModel):

    id: int
    title: str
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }


class CreateSessionResponse(BaseModel):

    session_id: int


class RenameSessionRequest(BaseModel):

    title: str


class RenameSessionResponse(BaseModel):

    id: int
    title: str

    model_config = {
        "from_attributes": True,
    }


class DeleteSessionResponse(BaseModel):

    message: str