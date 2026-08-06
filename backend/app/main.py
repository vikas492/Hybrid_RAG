from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.routes.chat import router as chat_router
from app.api.routes.document import router as document_router
from app.api.routes.health import router as health_router
from app.api.routes.session import router as session_router
from app.core.logger import logger
from app.core.settings import settings
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):

    logger.info("Starting Hybrid Search RAG API...")

    yield

    logger.info("Shutting down Hybrid Search RAG API...")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    health_router,
    prefix="/api/v1",
)

app.include_router(
    document_router,
    prefix="/api/v1",
)

app.include_router(chat_router)

app.include_router(session_router)