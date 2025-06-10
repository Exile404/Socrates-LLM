from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.llm import socratic_llm_response
from app.nlp_utils import preprocess_text
from app.train_model import classify_input

app = FastAPI(title="Socratic Dialogue AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    message: str

@app.post("/api/dialogue")
async def get_dialogue(input_data: UserInput):
    try:
        # NLP Preprocessing
        preprocessed = preprocess_text(input_data.message)
        # ML Classification
        category = classify_input(preprocessed)
        # LLM Response
        response = socratic_llm_response(preprocessed)
        return {
            "response": response,
            "category": category
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/healthy")
async def health_check():
    return {"status": "healthy"}