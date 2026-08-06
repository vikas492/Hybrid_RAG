from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.core.settings import settings


class LocalStorage:

    def save(
        self,
        file: UploadFile,
    ) -> str:

        upload_path = Path(settings.UPLOAD_DIR)

        upload_path.mkdir(
            parents=True,
            exist_ok=True,
        )

        extension = Path(file.filename).suffix

        filename = f"{uuid4()}{extension}"

        destination = upload_path / filename

        with open(destination, "wb") as buffer:
            buffer.write(file.file.read())

        return str(destination)