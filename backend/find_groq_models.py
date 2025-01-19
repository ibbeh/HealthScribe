import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def list_groq_models():
    """
    Fetch and print all available OpenAI models from the Groq API.
    """
    # Get the Groq API key from the environment
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        print("Error: GROQ_API_KEY is not set in the .env file.")
        return

    # Groq API endpoint for listing models
    url = "https://api.groq.com/openai/v1/models"

    # Make the GET request
    headers = {"Authorization": f"Bearer {api_key}"}
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            models = response.json()
            print("Available Models:")
            for model in models.get("data", []):
                print(f"- {model['id']}")
        else:
            print(f"Error {response.status_code}: {response.text}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    list_groq_models()
