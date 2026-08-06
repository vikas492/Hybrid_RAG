from app.extractors.pdf_extractor import PDFExtractor

extractor = PDFExtractor()

text = extractor.extract_text(
    "uploads/documents/8cb89c5d-2817-4e38-95f7-5378818ba898.pdf"
)

print(text)