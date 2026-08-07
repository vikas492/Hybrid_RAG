from docx import Document

from app.extractors.base_extractor import BaseExtractor


class DOCXExtractor(BaseExtractor):
    """
    Extract text from Microsoft Word (.docx) documents.
    """

    def extract(self, file_path: str) -> str:
        document = Document(file_path)

        paragraphs = []

        for paragraph in document.paragraphs:
            text = paragraph.text.strip()

            if text:
                paragraphs.append(text)

        return "\n".join(paragraphs)