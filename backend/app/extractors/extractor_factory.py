from pathlib import Path

from fastapi import HTTPException, status

from app.extractors.pdf_extractor import PDFExtractor
from app.extractors.docx_extractor import DOCXExtractor
from app.extractors.pptx_extractor import PPTXExtractor


class ExtractorFactory:
    """
    Factory responsible for selecting the correct
    extractor based on the uploaded file extension.
    """

    def __init__(self):

        self.extractors = {
            ".pdf": PDFExtractor(),
            ".docx": DOCXExtractor(),
            ".pptx": PPTXExtractor(),
        }

    def extract(
        self,
        file_path: str,
    ) -> str:

        extension = Path(file_path).suffix.lower()

        extractor = self.extractors.get(extension)

        if extractor is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported file type: {extension}",
            )

        return extractor.extract(file_path)