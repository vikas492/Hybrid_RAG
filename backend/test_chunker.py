from app.extractors.pdf_extractor import PDFExtractor
from app.processors.text_cleaner import TextCleaner
from app.processors.chunk_service import ChunkService

PDF_PATH = "uploads/documents/89437024-d9f6-4f92-9135-1938dc4cf5c3.pdf"   # Change if needed

extractor = PDFExtractor()
cleaner = TextCleaner()
chunker = ChunkService()

text = extractor.extract_text(PDF_PATH)
clean_text = cleaner.clean(text)

chunks = chunker.chunk(clean_text)

print("=" * 80)
print("TOTAL CHUNKS:", len(chunks))
print("=" * 80)

for chunk in chunks:
    print(f"\nCHUNK {chunk.chunk_id}")
    print("-" * 80)
    print(chunk.text)