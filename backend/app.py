from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from api.transcription import TranscriptionService
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Flask app configuration
app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = os.path.join(os.getcwd(), "uploads")


# Configure file upload folder and allowed extensions
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"mp3", "mp4", "wav", "mpeg", "flac", "m4a", "ogg", "webm"}

# Initialize TranscriptionService
transcription_service = TranscriptionService()

def allowed_file(filename):
    """
    Check if the uploaded file has an allowed extension.
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/api/upload", methods=["POST"])
def upload_and_transcribe():
    """
    Upload an audio file, validate it, and return the transcription.
    """
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": f"Unsupported file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"}), 400

    try:
        # Save the file securely to the upload folder
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        # Transcribe the audio file using the TranscriptionService
        transcription = transcription_service.transcribe_audio(file_path)

        return jsonify({
            "filename": filename,
            "transcription": transcription.get("text", "No text available")
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
