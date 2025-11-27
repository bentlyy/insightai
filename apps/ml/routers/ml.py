# apps/ml/routers/ml.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Any, Dict
import os

from services.analysis_service import basic_csv_analysis


class AnalyzeRequest(BaseModel):
    path: str = Field(..., description="Ruta absoluta del archivo CSV en el servidor")


class AnalyzeResponse(BaseModel):
    # lo dejamos bien abierto por ahora
    result: Dict[str, Any]


router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_dataset(payload: AnalyzeRequest):
    path = payload.path

    if not os.path.exists(path):
        raise HTTPException(status_code=400, detail=f"Archivo no encontrado: {path}")

    try:
        result = basic_csv_analysis(path)
        return AnalyzeResponse(result=result)
    except Exception as e:
        # Aquí puedes logear el error real
        raise HTTPException(status_code=500, detail=f"Error analizando dataset: {e}")
