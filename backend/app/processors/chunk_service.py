from dataclasses import dataclass
import re


@dataclass
class TextChunk:
    chunk_id: int
    text: str
    start: int
    end: int


class ChunkService:

    def __init__(
        self,
        chunk_size: int = 500,
        overlap_sentences: int = 2,
    ):
        self.chunk_size = chunk_size
        self.overlap_sentences = overlap_sentences

    def chunk(
        self,
        text: str,
    ) -> list[TextChunk]:

        if not text.strip():
            return []

        # Split into sentences
        sentences = re.split(
            r'(?<=[.!?])\s+',
            text,
        )

        chunks = []

        chunk_id = 1

        i = 0

        while i < len(sentences):

            current_sentences = []

            current_length = 0

            start = text.find(sentences[i])

            j = i

            while j < len(sentences):

                sentence = sentences[j]

                if (
                    current_length + len(sentence)
                    > self.chunk_size
                    and current_sentences
                ):
                    break

                current_sentences.append(sentence)

                current_length += len(sentence) + 1

                j += 1

            chunk_text = " ".join(current_sentences).strip()

            end = start + len(chunk_text)

            chunks.append(
                TextChunk(
                    chunk_id=chunk_id,
                    text=chunk_text,
                    start=start,
                    end=end,
                )
            )

            chunk_id += 1

            # overlap using previous sentences
            i = max(
                j - self.overlap_sentences,
                i + 1,
            )

        return chunks