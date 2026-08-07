import fitz

from app.extractors.base_extractor import BaseExtractor
from app.extractors.ocr_service import OCRService


class PDFExtractor(BaseExtractor):
    """
    Extract text from PDF documents.

    1. Try extracting selectable text using PyMuPDF.
    2. If the PDF contains little or no text, fall back to OCR.
    """

    def __init__(self):
        self.ocr = OCRService()

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

        extracted_text = "\n".join(pages).strip()

        # If very little text was extracted,
        # assume it's a scanned PDF.
        if len(extracted_text) < 100:

            print("⚠️ Scanned PDF detected. Trying OCR...")

            try:
                extracted_text = self.ocr.extract(file_path)
                print("✅ OCR completed successfully.")

            except Exception as error:
                print(f"⚠️ OCR unavailable: {error}")
                print("Continuing with extracted PDF text.")

        return extracted_text