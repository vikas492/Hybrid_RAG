class QueryExpansion:

    def __init__(self):
        print("✅ Query Expansion Disabled")

    def expand(
        self,
        query: str,
    ) -> list[str]:

        return [query]