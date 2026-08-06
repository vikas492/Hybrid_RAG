from app.retrieval.bm25_service import BM25Service
from app.retrieval.query_expansion import QueryExpansion
from app.retrieval.retrieval_service import RetrievalService


class HybridSearchService:

    def __init__(self):

        print("Creating Query Expansion...")
        self.expander = QueryExpansion()

        print("Creating BM25 Service...")
        self.bm25 = BM25Service()

        print("Creating Dense Retrieval Service...")
        self.vector = RetrievalService()

        print("✅ Hybrid Search Ready")

    def _rrf(
        self,
        rankings: list[list[dict]],
        k: int = 60,
    ):

        fused = {}

        for ranking in rankings:

            for rank, item in enumerate(ranking, start=1):

                key = (
                    item["document_id"],
                    item["chunk_id"],
                )

                if key not in fused:

                    fused[key] = item.copy()
                    fused[key]["score"] = 0

                fused[key]["score"] += 1 / (k + rank)

        return sorted(
            fused.values(),
            key=lambda x: x["score"],
            reverse=True,
        )

    def search(
        self,
        query: str,
        chunks: list[dict],
        limit: int = 20,
    ):

        # QueryExpansion now decides whether to expand
        expanded_queries = self.expander.expand(query)

        print("\nExpanded Queries")

        for q in expanded_queries:
            print("-", q)

        self.bm25.index_documents(chunks)

        rankings = []

        for q in expanded_queries:

            print(f"\nSearching: {q}")

            bm25_results = self.bm25.search(
                q,
                limit=limit,
            )

            vector_results = self.vector.search(
                q,
                limit=limit,
            )

            rankings.append(bm25_results)
            rankings.append(vector_results)

        results = self._rrf(rankings)

        print(f"\n✓ Final Hybrid Results: {len(results)}")

        return results[:limit]