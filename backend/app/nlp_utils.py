import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
nltk.download('punkt_tab')
# Ensure NLTK packages are downloaded
# nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)

def preprocess_text(text: str) -> str:
    tokens = word_tokenize(text)
    lemmatizer = WordNetLemmatizer()
    lemmas = [lemmatizer.lemmatize(token.lower()) for token in tokens]
    return ' '.join(lemmas)
