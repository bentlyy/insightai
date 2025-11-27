# apps/ml/services/analysis_service.py
from typing import Any, Dict
import pandas as pd


def basic_csv_analysis(path: str) -> Dict[str, Any]:
    """
    Lee un CSV desde `path` y devuelve un resumen básico del dataset.
    """
    # Si quieres, puedes agregar argumentos a read_csv (sep, encoding, etc.)
    df = pd.read_csv(path)

    n_rows, n_cols = df.shape

    # tipos de columnas
    dtypes = df.dtypes.astype(str).to_dict()

    # nulos por columna
    null_counts = df.isnull().sum().to_dict()

    # stats numéricas
    numeric_df = df.select_dtypes(include="number")
    describe = numeric_df.describe().to_dict()  # dict anidado

    # reconstruir stats por columna de forma más amigable
    numeric_stats: Dict[str, Dict[str, Any]] = {}
    for col in describe:
        col_stats = describe[col]
        numeric_stats[col] = {
            "count": col_stats.get("count"),
            "mean": col_stats.get("mean"),
            "std": col_stats.get("std"),
            "min": col_stats.get("min"),
            "q1": col_stats.get("25%"),
            "median": col_stats.get("50%"),
            "q3": col_stats.get("75%"),
            "max": col_stats.get("max"),
        }

    # inferir “candidatos a target” (ejemplo simple)
    # columnas con pocos valores únicos pero no demasiado pocos
    potential_targets = []
    for col in df.columns:
        unique_vals = df[col].nunique(dropna=True)
        if 2 <= unique_vals <= 20:
            potential_targets.append(
                {
                    "column": col,
                    "unique_values": int(unique_vals),
                }
            )

    result: Dict[str, Any] = {
        "n_rows": int(n_rows),
        "n_columns": int(n_cols),
        "columns": list(df.columns),
        "dtypes": dtypes,
        "null_counts": null_counts,
        "numeric_stats": numeric_stats,
        "potential_targets": potential_targets,
    }

    return result
