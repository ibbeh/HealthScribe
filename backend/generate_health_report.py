# generate_health_report.py

import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize the Groq LLM
llm_health = ChatGroq(
    model_name="llama-3.3-70b-versatile",  # Same or different model
    temperature=0.7
)

def load_health_report_prompt(file_path: str) -> str:
    """Load the health report prompt template from a file."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Prompt file not found: {file_path}")
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

def generate_health_report(transcription: str, prompt_template_path: str) -> str:
    """
    Generate a health report from a transcription using the prompt template.
    Returns the string content of the health report in markdown.
    """
    # Load the system prompt template
    template_text = load_health_report_prompt(prompt_template_path)

    # Construct a chat prompt
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", template_text),
        ("user", transcription)
    ])

    ai_message = (chat_prompt | llm_health).invoke({})
    health_report_md = ai_message.content

    return health_report_md
