# api/transcription.py

import os
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class TranscriptionService:
    def __init__(self):
        """
        Initializes the GROQ client with the API key and model configuration.
        """
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY is not set in the environment variables.")
        
        self.client = Groq(api_key=api_key)  # Pass the API key here
        self.model = "whisper-large-v3"

    def transcribe_audio(self, file_path, language="en", prompt=None, response_format="json", temperature=0.0):
        """
        Transcribes an audio file using GROQ's transcription API.
        Returns a dictionary with the transcription data.
        """
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Audio file not found: {file_path}")

        try:
            with open(file_path, "rb") as file:
                transcription = self.client.audio.transcriptions.create(
                    file=(os.path.basename(file_path), file.read()),
                    model=self.model,
                    language=language,
                    prompt=prompt,
                    response_format=response_format,
                    temperature=temperature
                )
            # Convert the Groq response to a dict-like object
            return transcription.to_dict()
        except Exception as e:
            raise RuntimeError(f"Failed to transcribe audio: {e}")
