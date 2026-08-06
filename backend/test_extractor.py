from app.extractors.pdf_extractor import PDFExtractor

PDF_PATH = "uploads/documents/89437024-d9f6-4f92-9135-1938dc4cf5c3.pdf"   # <-- change to your PDF path

extractor = PDFExtractor()

text = extractor.extract_text(PDF_PATH)

print("=" * 80)
print("FIRST 2000 CHARACTERS")
print("=" * 80)
print(text[:2000])

print("\n")

print("=" * 80)
print("CONTAINS 'Vikas'?")
print("=" * 80)
print("Vikas" in text)

print("\n")

print("=" * 80)
print("CONTAINS 'Zende'?")
print("=" * 80)
print("Zende" in text)

print("\n")

print("=" * 80)
print("FULL LENGTH")
print("=" * 80)
print(len(text))