# apps/ml/main.py
from fastapi import FastAPI
from routers.ml import router as ml_router

app = FastAPI(
    title="InsightAI ML Service",
    version="0.1.0",
)

# montamos las rutas del módulo ml
app.include_router(ml_router, prefix="", tags=["ml"])


@app.get("/")
async def root():
    return {"message": "InsightAI ML service is running ✅"}


# Para ejecutar localmente:
# uvicorn main:app --host 0.0.0.0 --port 8000 --reload
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
