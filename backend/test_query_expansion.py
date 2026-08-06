from app.retrieval.query_expansion import QueryExpansion

expander = QueryExpansion()

queries = expander.expand(
    "Explain Artificial Neural Network"
)

print()

print("=" * 80)
print("GENERATED SEARCH QUERIES")
print("=" * 80)

for q in queries:
    print(q)