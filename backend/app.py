# app.py

import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from api.transcription import TranscriptionService
from generate_soap_notes import generate_soap_notes
from flask_cors import CORS  # <-- Import flask_cors

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure file upload folder
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Allowed extensions
ALLOWED_EXTENSIONS = {"mp3", "mp4", "wav", "mpeg", "flac", "m4a", "ogg", "webm"}

# Instantiate the Transcription Service
transcription_service = TranscriptionService()

def allowed_file(filename):
    """
    Check if the uploaded file has an allowed extension.
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/api/upload", methods=["POST"])
def upload_and_transcribe():
    """
    1. Upload the file.
    2. Validate type.
    3. Save securely.
    4. Transcribe with GROQ.
    5. Generate SOAP notes with LangChain+Groq.
    6. Return JSON response containing transcription + SOAP notes.
    """
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({
            "error": f"Unsupported file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        }), 400

    try:
        # 1. Save file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        # 2. Transcribe
        transcription_result = transcription_service.transcribe_audio(file_path)
        transcription_text = transcription_result.get("text", "No transcription available")

        # 3. Generate SOAP notes
        prompt_path = os.path.join("prompts", "soap_notes_prompt.txt")
        soap_notes = generate_soap_notes(transcription_text, prompt_path)

        # 4. Return JSON
        return jsonify({
            "filename": filename,
            "transcription": transcription_text,
            "soap_notes_md": soap_notes
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
