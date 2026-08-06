from rank_bm25 import BM25Okapi


class BM25Service:

    _instance = None

    def __new__(cls):

        if cls._instance is None:

            cls._instance = super().__new__(cls)

            cls._instance.documents = []
            cls._instance.metadata = []
            cls._instance.bm25 = None
            cls._instance.index_built = False

        return cls._instance

    def index_documents(
        self,
        chunks: list[dict],
        force: bool = False,
    ):

        if self.index_built and not force:
            return

        print("Building BM25 Index...")

        self.documents = []
        self.metadata = []

        tokenized_documents = []

        for chunk in chunks:

            tokens = chunk["text"].lower().split()

            tokenized_documents.append(tokens)

            self.documents.append(chunk["text"])

            self.metadata.append(chunk)

        self.bm25 = BM25Okapi(tokenized_documents)

        self.index_built = True

        print("✅ BM25 Ready")

    def invalidate(self):

        self.index_built = False

    def search(
        self,
        query: str,
        limit: int = 5,
    ):

        if self.bm25 is None:
            return []

        tokens = query.lower().split()

        scores = self.bm25.get_scores(tokens)

        ranked = sorted(
            zip(scores, self.metadata),
            reverse=True,
            key=lambda x: x[0],
        )

        results = []

        for score, metadata in ranked[:limit]:

            item = metadata.copy()

            item["score"] = float(score)

            results.append(item)

        return results