# Socratic Dialogue AI

An open-source web application for thoughtful Socratic conversation powered by Google Gemini, FastAPI, and Next.js with shadcn/ui.

---

## Features

- Socratic-style AI chatbot (Gemini/Gemini Pro via Google Generative Language API)
- NLP preprocessing (tokenization, lemmatization)
- Decision tree model categorizes user inputs (math, philosophy, science, etc.)
- Minimal, elegant chat interface with chat history and category tags
- Fully documented, ready to deploy

---

## Demo

Deployed Live App: https://socrates-llm.vercel.app/

---

## Tech Stack

- **Backend**: FastAPI · Python · Gemini (Google Generative Language API) · scikit-learn
- **Frontend**: Next.js (TypeScript) · shadcn/ui · Tailwind CSS · Axios

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Exile404/Socrates-LLM.git
cd Socrates-LLM
```

### 2. Setup Backend
**a. Create Python virtual environment and install dependencies**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
**b. Add Google Gemini API Key**

- Get your API key from Google AI Studio


- Export it to your environment:

```bash
export GOOGLE_API_KEY="your-gemini-api-key"
```

**c. Run FastAPI server**
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

### 3.  Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

**Note:**  
If running locally, make sure your backend (`http://localhost:8000`) is accessible from your frontend.


## API Reference
### `POST /api/dialogue`

**Request:**

```json
{
  "message": "What is the meaning of life?"
}
```

**Response:**
```json
{
  "response": "Why do you seek meaning in life rather than create it for yourself?",
  "category": "philosophy"
}
```

## Customization

- **Categories:** Edit `train_data.csv` and retrain the model with your own intent categories.
- **UI:** Tweak `frontend/app/page.tsx` and shadcn/ui components for your preferred style.
- **LLM:** Swap Gemini for another API (OpenAI, Claude, etc.) by editing `backend/app/llm.py`.
