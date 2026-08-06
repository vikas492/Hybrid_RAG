import voyageai

client = voyageai.Client(api_key="pa-EArWn_HXHPpptDXS_6LJCOJ7d8UFxRazyzJOLzaQ4rf")

result = client.embed(
    texts=["Hello World"],
    model="voyage-3-lite",
    input_type="document",
)

print(len(result.embeddings[0]))