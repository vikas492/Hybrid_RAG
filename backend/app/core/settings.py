from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    APP_NAME: str
    APP_VERSION: str
    DEBUG: bool

    DATABASE_URL: str

    UPLOAD_DIR: str
    MAX_FILE_SIZE: int

    # CORS
    ALLOWED_ORIGINS: list[str]

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_origins(cls, value):
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",")]
        return value

    # Qdrant Cloud
    QDRANT_URL: str
    QDRANT_API_KEY: str
    QDRANT_COLLECTION: str
    EMBEDDING_DIMENSION: int

    # Voyage AI
    VOYAGE_API_KEY: str
    EMBEDDING_MODEL: str = "voyage-3-lite"

    # Redis
    REDIS_URL: str
    REDIS_TTL: int = 3600

    # LLM
    LLM_PROVIDER: str = "groq"

    GROQ_API_KEY: str
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()