from sqlalchemy.orm import Session

from app.embeddings.embedding_service import EmbeddingService
from app.extractors.extractor_factory import ExtractorFactory
from app.models.document_chunk import DocumentChunk
from app.processors.chunk_service import ChunkService
from app.processors.text_cleaner import TextCleaner
from app.services.document_chunk_service import DocumentChunkService
from app.vectorstores.qdrant_store import QdrantStore


class IngestionPipeline:

    def __init__(self):

        print("Creating Extractor Factory...")
        self.extractor = ExtractorFactory()

        print("Creating Text Cleaner...")
        self.cleaner = TextCleaner()

        print("Creating Chunk Service...")
        self.chunker = ChunkService()

        print("Creating Embedding Service...")
        self.embedder = EmbeddingService()

        print("Creating Document Chunk Service...")
        self.chunk_service = DocumentChunkService()

        print("Creating Qdrant Store...")
        self.vector_store = QdrantStore()

        print("✅ Ingestion Pipeline Ready")

    def process_document(
        self,
        db: Session,
        document_id: int,
        filename: str,
        file_path: str,
    ):

        print("\n========== INGESTION STARTED ==========\n")

        print("Step 1 : Extracting Text...")
        text = self.extractor.extract(file_path)
        print(f"✓ Extracted {len(text)} characters")

        print("\nStep 2 : Cleaning Text...")
        clean_text = self.cleaner.clean(text)
        print(f"✓ Cleaned {len(clean_text)} characters")

        print("\nStep 3 : Chunking...")
        chunks = self.chunker.chunk(clean_text)
        print(f"✓ Total Chunks : {len(chunks)}")

        texts = [chunk.text for chunk in chunks]

        print("\nStep 4 : Generating Batch Embeddings...")

        embeddings = self.embedder.embed_batch(texts)

        print("✅ Embeddings Ready")

        print("\nStep 5 : Saving Chunks...")

        db_chunks = []
        payloads = []

        for chunk in chunks:

            db_chunks.append(
                DocumentChunk(
                    document_id=document_id,
                    chunk_id=chunk.chunk_id,
                    text=chunk.text,
                    start_offset=chunk.start,
                    end_offset=chunk.end,
                )
            )

            payloads.append(
                {
                    "document_id": document_id,
                    "filename": filename,
                    "chunk_id": chunk.chunk_id,
                    "text": chunk.text,
                    "start": chunk.start,
                    "end": chunk.end,
                }
            )

        self.chunk_service.create_chunks(
            db=db,
            chunks=db_chunks,
        )

        print("✅ PostgreSQL Saved")

        print("\nStep 6 : Uploading to Qdrant...")

        self.vector_store.insert_chunks(
            embeddings=embeddings,
            payloads=payloads,
        )

        print("✅ Qdrant Saved")

        print("\n========== INGESTION COMPLETED ==========")