from app.extractors.pdf_extractor import PDFExtractor
from app.processors.text_cleaner import TextCleaner

extractor = PDFExtractor()
cleaner = TextCleaner()

text = extractor.extract_text(
    "uploads/documents/8cb89c5d-2817-4e38-95f7-5378818ba898.pdf"
)

clean_text = cleaner.clean(text)

print(clean_text)