import re


class TextCleaner:

    def clean(
        self,
        text: str,
    ) -> str:

        if not text:
            return ""

        # Normalize newlines
        text = text.replace("\r\n", "\n")
        text = text.replace("\r", "\n")

        # Replace tabs
        text = text.replace("\t", " ")

        # Remove page numbers (lines containing only digits)
        text = re.sub(r"(?m)^\s*\d+\s*$", "", text)

        # Remove repeated university headers
        patterns = [
            r"\(Permanently Affiliated to University of Mumbai\)",
            r"Department of Electronics and Telecommunication Engineering",
            r"Department of Electronics and TelecommunicaƟon Engineering",
            r"LABORATORY:.*",
            r"EXPERIMENT\s*:.*",
            r"APPARATUS.*",
            r"OBTAINED",
        ]

        for pattern in patterns:
            text = re.sub(pattern, "", text, flags=re.IGNORECASE)

        # Remove multiple spaces
        text = re.sub(r"[ ]{2,}", " ", text)

        # Remove spaces before newline
        text = re.sub(r" +\n", "\n", text)

        # Collapse multiple blank lines
        text = re.sub(r"\n{3,}", "\n\n", text)

        # Join broken lines inside paragraphs
        text = re.sub(r"(?<!\n)\n(?!\n)", " ", text)

        # Fix punctuation spacing
        text = re.sub(r"\s+([.,;:])", r"\1", text)

        return text.strip()