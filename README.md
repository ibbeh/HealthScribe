# HealthScribe

**HealthScribe** is a modern web application designed for healthcare professionals to manage patient records, transcriptions, and medical documentation seamlessly. With a focus on usability and efficiency, HealthScribe provides tools to record, transcribe, edit, and save medical data securely.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [Future Enhancements](#future-enhancements)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- **Audio Recording and Uploading**  
  Record audio or upload pre-recorded files for transcription.

- **Transcription and Markdown Editing**  
  Automatically transcribe audio files into text. Edit transcriptions, SOAP notes, health reports, and summaries directly.

- **Patient Management**  
  View, filter, search, and manage patient records in an intuitive interface.

- **Tab-Based Navigation**  
  Seamlessly switch between transcription, SOAP notes, health reports, and summaries.

- **Dynamic Forms**  
  Add new patients using a modular and extendable form system.

- **ReactMarkdown Integration**  
  Render and edit medical notes using Markdown syntax.

---

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, ReactMarkdown
- **Backend**: Flask (Python)
- **API Integration**: GROQ for transcription services
- **File Uploading**: Flask-Uploads
- **Database**: (Future) To be integrated for persistent storage
- **Styling**: Tailwind CSS for clean and modern UI

---

## Installation

### Prerequisites

- **Node.js** and **npm** (for the frontend)
- **Python 3.x** (for the backend)
- **Flask** and required dependencies

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/healthscribe.git
   cd healthscribe


2. **Setup Frontend**
      ```bash
   cd frontend
   npm install
   npm start


3. **Setup Backend**
   - Create a virtual environment and activate it
      ```bash
    python -m venv venv
    source venv/bin/activate # Mac
    venv\Scripts\activate   # Windows

  - Install dependencies
    ```bash
    pip install -r requirements.txt

    - Start the Flask Server:
    ```bash
    python app.py

4. **Access the application**
Open http://localhost:3000 for the frontend and http://127.0.0.1:5000 for the backend.

## Usage
1. Audio Transcription

- Record or upload audio files from the Transcription tab.
- Edit the transcriptions, SOAP notes, health reports, and summaries in their respective tabs.


2. Patient Management

- View a list of patients on the Patients page.
- Add new patients using the "Add Patient" button.

3. Save Data

- Use the Save All button to store edited content. (Future feature to integrate with a database.)


## Project Structure
```
healthscribe/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components (Patients, Transcription, etc.)
│   │   └── index.css        # Styling with Tailwind
│   ├── package.json         # Frontend dependencies
│   └── public/              # Static assets
├── backend/
│   ├── api/
│   │   ├── transcription.py # Transcription API logic
│   │   ├── generate_soap_notes.py
│   │   ├── generate_summary.py
│   │   └── generate_health_report.py
│   ├── app.py               # Flask app entry point
│   ├── uploads/             # Audio file uploads
│   └── requirements.txt     # Backend dependencies
├── README.md
```

