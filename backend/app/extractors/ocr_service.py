from PIL import Image
import fitz
import pytesseract

from app.core.settings import settings


class OCRService:
    """
    OCR service for scanned PDF documents.

    Converts every PDF page into an image and
    extracts text using Tesseract OCR.
    """

    def __init__(self):

        if settings.TESSERACT_CMD:
            pytesseract.pytesseract.tesseract_cmd = settings.TESSERACT_CMD

    def extract(self, pdf_path: str) -> str:

        document = fitz.open(pdf_path)

        pages = []

        try:

            for page in document:

                pix = page.get_pixmap(dpi=300)

                image = Image.frombytes(
                    "RGB",
                    [pix.width, pix.height],
                    pix.samples,
                )

                text = pytesseract.image_to_string(image)

                if text.strip():
                    pages.append(text)

        finally:
            document.close()

        return "\n".join(pages)