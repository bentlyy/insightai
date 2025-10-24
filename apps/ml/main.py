from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "InsightAI ML Service is running ✅"}
