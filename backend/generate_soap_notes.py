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
    with open(file_path, "r") as file:
        return file.read()

def generate_soap_notes(transcription: str, prompt_template_path: str) -> str:
    """
    Generate SOAP notes from a transcription using the prompt template.
    Returns the string content of the SOAP notes.
    """
    # Load the prompt template
    template_text = load_prompt_template(prompt_template_path)

    # We'll treat the template text as the system's role instructions
    # Then we pass the transcription as the user message
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", template_text),
        ("user", transcription)
    ])

    # Invoke the chain
    # The result is an AIMessage object with a .content attribute
    ai_message = (chat_prompt | llm).invoke({})
    soap_notes = ai_message.content

    return soap_notes

def save_to_markdown(output: str, output_path: str):
    """Save the generated SOAP notes to a Markdown file."""
    with open(output_path, "w", encoding="utf-8") as file:
        file.write(output)

def main():
    # Example transcription (replace with your actual transcription input)
    transcription = """
    The patient is a 45-year-old male presenting with persistent lower back pain for the past three weeks.
    He rates the pain as 7/10 and describes it as sharp and localized. He denies any radiation of pain, fever, or urinary issues.
    History includes no injuries but a sedentary lifestyle due to a desk job.
    """

    # Path to the SOAP notes prompt template
    prompt_template_path = "prompts/soap_notes_prompt.txt"

    # Path to save the output Markdown file
    output_path = "output/soap_notes.md"

    try:
        # Generate SOAP notes
        soap_notes = generate_soap_notes(transcription, prompt_template_path)
        print("Generated SOAP Notes:\n", soap_notes)

        # Save to a Markdown file
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        save_to_markdown(soap_notes, output_path)
        print(f"SOAP notes saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
