print("Program Started")

from app.pipelines.ingestion_pipeline import IngestionPipeline

print("Pipeline Imported")

pipeline = IngestionPipeline()

print("Pipeline Created")

pipeline.process_document(
    "uploads/documents/8cb89c5d-2817-4e38-95f7-5378818ba898.pdf"
)

print("Program Finished")