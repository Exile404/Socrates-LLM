import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.tree import DecisionTreeClassifier
import joblib
import os

# File paths for saving model and vectorizer
MODEL_PATH = os.path.join(os.path.dirname(__file__), "decision_tree_model.pkl")
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), "vectorizer.pkl")

# Load dataset
df = pd.read_csv(os.path.join(os.path.dirname(__file__), "train_data.csv"))

texts = df['message'].astype(str).values
labels = df['label'].astype(str).values

# Create and fit vectorizer and model
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)
clf = DecisionTreeClassifier()
clf.fit(X, labels)

# Save to disk
joblib.dump(clf, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)

print("Model and vectorizer trained and saved!")

def classify_input(text: str) -> str:
    clf = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    X = vectorizer.transform([text])
    return clf.predict(X)[0]