# generate_soap_notes.py

import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize the Groq LLM
llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",  # Change if you prefer a different model
    temperature=0.7
)

def load_prompt_template(file_path: str) -> str:
    """Load the SOAP notes prompt template from a file."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Prompt file not found: {file_path}")
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

def generate_soap_notes(transcription: str, prompt_template_path: str) -> str:
    """
    Generate SOAP notes from a transcription using the prompt template.
    Returns the string content of the SOAP notes.
    """
    # Load the system prompt template
    template_text = load_prompt_template(prompt_template_path)

    # Construct a chat prompt with 2 messages:
    # - System: instructions from the prompt template
    # - User: the actual transcription
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", template_text),
        ("user", transcription)
    ])

    # Call the chain
    ai_message = (chat_prompt | llm).invoke({})
    soap_notes = ai_message.content

    return soap_notes
