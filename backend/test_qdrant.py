from app.vectorstores.qdrant_store import QdrantStore
from app.core.settings import settings

store = QdrantStore()

points, _ = store.client.scroll(
    collection_name=settings.QDRANT_COLLECTION,
    limit=10000,
)

print("TOTAL VECTORS:", len(points))

documents = {}

for point in points:

    filename = point.payload["filename"]

    documents.setdefault(filename, 0)

    documents[filename] += 1

print()

print("FILES INSIDE QDRANT")

for filename, count in documents.items():

    print(filename, "->", count)