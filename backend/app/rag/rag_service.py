from app.cache.redis_service import RedisService
from app.db.session import SessionLocal
from app.llm.groq_service import GroqService
from app.llm.prompt_builder import PromptBuilder
from app.llm.small_talk import get_small_talk_response
from app.models.document_chunk import DocumentChunk
from app.retrieval.hybrid_service import HybridSearchService
from app.services.chat_service import ChatService


class RAGService:

    def __init__(self):

        print("Creating Hybrid Search...")
        self.hybrid = HybridSearchService()

        print("Creating Prompt Builder...")
        self.prompt_builder = PromptBuilder()

        print("Creating Groq...")
        self.llm = GroqService()

        print("Creating Redis...")
        self.redis = RedisService()

        print("Creating Chat Service...")
        self.chat_service = ChatService()

        print("✅ RAG Service Ready")

    def ask(
        self,
        session_id: int,
        question: str,
    ):

        db = SessionLocal()

        try:

            session = self.chat_service.get_session(
                db=db,
                session_id=session_id,
            )

            if session is None:
                raise Exception("Chat session not found.")

            # ---------------------------------------------------
            # Save current user message
            # ---------------------------------------------------

            self.chat_service.add_user_message(
                db=db,
                session_id=session_id,
                content=question,
            )

            # ---------------------------------------------------
            # Handle greetings / casual conversation
            # ---------------------------------------------------

            small_talk = get_small_talk_response(question)

            if small_talk is not None:

                self.chat_service.add_assistant_message(
                    db=db,
                    session_id=session_id,
                    content=small_talk,
                )

                return {
                    "answer": small_talk,
                    "sources": [],
                }

            # ---------------------------------------------------
            # Conversation History
            # ---------------------------------------------------

            messages = self.chat_service.get_history(
                db=db,
                session_id=session_id,
                limit=10,
            )

            history_lines = []

            for message in messages:

                history_lines.append(
                    f"{message.role.upper()}: {message.content}"
                )

            history = "\n".join(history_lines)

            # ---------------------------------------------------
            # Load document chunks
            # ---------------------------------------------------

            chunks = db.query(DocumentChunk).all()

            chunk_list = []

            for chunk in chunks:

                chunk_list.append(
                    {
                        "document_id": chunk.document_id,
                        "filename": chunk.document.filename,
                        "chunk_id": chunk.chunk_id,
                        "text": chunk.text,
                    }
                )

            # ---------------------------------------------------
            # Hybrid Search
            # ---------------------------------------------------

            print("\nStep 1 : Hybrid Search")

            retrieved = self.hybrid.search(
                query=question,
                chunks=chunk_list,
                limit=20,
            )

            # ---------------------------------------------------
            # Remove duplicate chunks
            # ---------------------------------------------------

            unique_chunks = []
            seen = set()

            for chunk in retrieved:

                key = (
                    chunk["document_id"],
                    chunk["chunk_id"],
                )

                if key in seen:
                    continue

                seen.add(key)
                unique_chunks.append(chunk)

            retrieved = unique_chunks

            print(f"✓ Unique Chunks : {len(retrieved)}")

            # ---------------------------------------------------
            # Top Retrieved Chunks
            # ---------------------------------------------------

            print("\nStep 2 : Using Top Retrieved Chunks")

            retrieved = retrieved[:10]

            # ---------------------------------------------------
            # Prompt
            # ---------------------------------------------------

            print("\nStep 3 : Build Prompt")

            prompt = self.prompt_builder.build(
                question=question,
                history=history,
                chunks=retrieved,
            )

            # ---------------------------------------------------
            # LLM
            # ---------------------------------------------------

            print("\nStep 4 : Groq")

            answer = self.llm.generate(prompt)

            # ---------------------------------------------------
            # Save Assistant Response
            # ---------------------------------------------------

            self.chat_service.add_assistant_message(
                db=db,
                session_id=session_id,
                content=answer,
            )

            return {
                "answer": answer,
                "sources": [
                    {
                        "filename": chunk["filename"],
                        "chunk_id": chunk["chunk_id"],
                        "passage": (
                            chunk["text"][:250] + "..."
                            if len(chunk["text"]) > 250
                            else chunk["text"]
                        ),
                    }
                    for chunk in retrieved
                ],
            }

        finally:

            db.close()