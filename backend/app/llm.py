import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
# print(f"Using Google API Key: {API_KEY}")
genai.configure(api_key=API_KEY)

def socratic_llm_response(prompt: str) -> str:
    try:
        
        model = genai.GenerativeModel("gemini-2.5-flash-preview-05-20")
       
        preamble = (
            "You are Socrates, a wise philosopher. You always reply with thoughtful questions "
            "that challenge the user's assumptions and guide them toward deeper understanding. "
            "Be friendly, never answer directly—always ask a new question or prompt reflection."
        )
        response = model.generate_content([preamble, prompt])
        
        return response.text.strip() if response.text else "[No response from Gemini]"
    except Exception as e:
        return f"[Gemini Error] {str(e)}"
