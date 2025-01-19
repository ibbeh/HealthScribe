# generate_summary.py

import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize the Groq LLM
llm_summary = ChatGroq(
    model_name="llama-3.3-70b-versatile",  # You can use the same or a different model
    temperature=0.7
)

def load_summary_prompt(file_path: str) -> str:
    """Load the summary prompt template from a file."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Prompt file not found: {file_path}")
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

def generate_summary(transcription: str, prompt_template_path: str) -> str:
    """
    Generate a concise summary from a transcription using the prompt template.
    Returns the string content of the summary in markdown.
    """
    # Load the system prompt template
    template_text = load_summary_prompt(prompt_template_path)

    # Construct a chat prompt with 2 messages:
    # - System: instructions from the prompt
    # - User: the actual transcription
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", template_text),
        ("user", transcription)
    ])

    # Call the chain
    ai_message = (chat_prompt | llm_summary).invoke({})
    summary_md = ai_message.content

    return summary_md
