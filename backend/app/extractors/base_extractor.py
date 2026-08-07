from abc import ABC, abstractmethod


class BaseExtractor(ABC):
    """
    Base class for all document extractors.

    Every extractor must return the extracted text
    from the given file path.
    """

    @abstractmethod
    def extract(self, file_path: str) -> str:
        """
        Extract text from a document.

        Args:
            file_path: Absolute path to the document.

        Returns:
            Extracted text.
        """
        pass