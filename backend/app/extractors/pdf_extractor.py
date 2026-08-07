import fitz

from app.extractors.base_extractor import BaseExtractor


class PDFExtractor(BaseExtractor):
    """
    Extract text from PDF documents.

    This extractor is used for text-based PDFs.
    OCR support for scanned PDFs will be added later.
    """

    def extract(
        self,
        file_path: str,
    ) -> str:

        document = fitz.open(file_path)

        pages = []

        try:
            for page in document:
                text = page.get_text().strip()

                if text:
                    pages.append(text)

        finally:
            document.close()

        return "\n".join(pages)