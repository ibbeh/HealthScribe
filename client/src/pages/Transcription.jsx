import React, { useState, useRef } from "react";

import { Plus } from "lucide-react";

const Transcription = () => {
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleRecordingComplete = async (blob) => {
    setIsTranscribing(true);
    // Here we would normally send the blob to a backend service
    // For now, we'll simulate a delay and set a mock transcription
    setTimeout(() => {
      setTranscription(
        "Patient reports experiencing mild headaches for the past week. Blood pressure is normal at 120/80. Recommended rest and hydration, follow-up in two weeks if symptoms persist."
      );
      setIsTranscribing(false);
    }, 2000);
  };

  const mockPatients = [
    { name: "John Doe", lastVisit: "2024-03-15", documentCount: 3 },
    { name: "Jane Smith", lastVisit: "2024-03-14", documentCount: 5 },
    { name: "Robert Johnson", lastVisit: "2024-03-13", documentCount: 2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-gray-50">
      <div className="container py-8 space-y-8 animate-fade-in">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Medical Transcription
            </h1>
            <p className="text-gray-600 mt-1">
              Record and manage patient appointments
            </p>
          </div>
          <Button className="bg-medical-600 hover:bg-medical-700">
            <Plus className="w-4 h-4 mr-2" />
            New Patient
          </Button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AudioRecorder onRecordingComplete={handleRecordingComplete} />
            <TranscriptionView
              transcription={transcription}
              isLoading={isTranscribing}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Patients
            </h2>
            <div className="space-y-4">
              {mockPatients.map((patient) => (
                <PatientCard
                  key={patient.name}
                  {...patient}
                  onClick={() => console.log(`Clicked ${patient.name}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcription;

// AudioRecorder.js

export const AudioRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        audioChunksRef.current = [];
        setAudioURL(URL.createObjectURL(audioBlob));
        onRecordingComplete(audioBlob); // Pass the audio blob to the parent
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg space-y-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-full p-4 text-white rounded-lg ${
          isRecording
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        }`}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioURL && (
        <div className="space-y-2">
          <p className="text-gray-700">
            Recording complete. You can listen below:
          </p>
          <audio controls src={audioURL} className="w-full" />
        </div>
      )}
    </div>
  );
};

// TranscriptionView.js

export const TranscriptionView = ({ transcription, isLoading }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold text-gray-900">Transcription</h2>
      <div className="mt-2">
        {isLoading ? (
          <p className="text-gray-500 italic">Transcribing audio...</p>
        ) : transcription ? (
          <p className="text-gray-800">{transcription}</p>
        ) : (
          <p className="text-gray-500 italic">
            No transcription available yet. Start recording to see the
            transcription here.
          </p>
        )}
      </div>
    </div>
  );
};

// PatientCard.js

export const PatientCard = ({ name, lastVisit, documentCount, onClick }) => {
  return (
    <div
      className="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
      onClick={onClick}>
      <h3 className="text-lg font-medium text-gray-900">{name}</h3>
      <p className="text-sm text-gray-600">{documentCount} documents</p>
      <p className="text-sm text-gray-500">Last visit: {lastVisit}</p>
      <button className="text-sm text-medical-600 font-medium mt-2">
        View Details
      </button>
    </div>
  );
};

// Button.js

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded text-white font-medium shadow ${className}`}
      {...props}>
      {children}
    </button>
  );
};
