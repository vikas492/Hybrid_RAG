import uuid

from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    Filter,
    FieldCondition,
    MatchValue,
    PointStruct,
    VectorParams,
)

from app.core.settings import settings


class QdrantStore:

    _client = None
    _initialized = False

    def __init__(self):

        self.collection = settings.QDRANT_COLLECTION

        if QdrantStore._client is None:

            print("Connecting to Qdrant Cloud...")

            QdrantStore._client = QdrantClient(
                url=settings.QDRANT_URL,
                api_key=settings.QDRANT_API_KEY,
            )

            print("✅ Connected")

        self.client = QdrantStore._client

        if not QdrantStore._initialized:

            self._create_collection()

            QdrantStore._initialized = True

    def _create_collection(self):

        collections = self.client.get_collections()

        names = [
            collection.name
            for collection in collections.collections
        ]

        if self.collection not in names:

            print("Creating collection...")

            self.client.create_collection(
                collection_name=self.collection,
                vectors_config=VectorParams(
                    size=settings.EMBEDDING_DIMENSION,
                    distance=Distance.COSINE,
                ),
            )

            print("✅ Collection Created")

    def insert_chunks(
        self,
        embeddings: list[list[float]],
        payloads: list[dict],
    ):

        points = []

        for embedding, payload in zip(
            embeddings,
            payloads,
        ):

            points.append(
                PointStruct(
                    id=str(uuid.uuid4()),
                    vector=embedding,
                    payload=payload,
                )
            )

        self.client.upsert(
            collection_name=self.collection,
            points=points,
        )

        print(f"✅ Uploaded {len(points)} vectors")

    def search(
        self,
        embedding: list[float],
        limit: int = 5,
    ):

        return self.client.query_points(
            collection_name=self.collection,
            query=embedding,
            limit=limit,
        )

    def delete_document(
        self,
        document_id: int,
    ):

        print(f"Deleting vectors for document {document_id}")

        self.client.delete(
            collection_name=self.collection,
            points_selector=Filter(
                must=[
                    FieldCondition(
                        key="document_id",
                        match=MatchValue(
                            value=document_id,
                        ),
                    )
                ]
            ),
        )

        print("✅ Qdrant vectors deleted")