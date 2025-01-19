// import React, { useState, useRef } from "react";
// import { Plus } from "lucide-react";
// import ReactMarkdown from "react-markdown";

// const Transcription = () => {
//   const [transcription, setTranscription] = useState("");
//   const [soapNotesMD, setSoapNotesMD] = useState("");
//   const [isTranscribing, setIsTranscribing] = useState(false);
//   const [healthReport, setHealthReport] = useState("");
//   const [summary, setSummary] = useState("");
//   const [view, setView] = useState("transcription"); // Options: transcription, soap_notes, health_report

//   const handleFileUpload = async (file) => {
//     setIsTranscribing(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to transcribe audio. Please try again.");
//       }

//       const data = await response.json();
//       setTranscription(data.transcription);
//       setSoapNotesMD(data.soap_notes_md || "");
//       setHealthReport(data.health_report || "");
//       setSummary(data.summary || "");
//     } catch (error) {
//       console.error("Error during transcription:", error);
//       setTranscription("An error occurred while transcribing the audio.");
//     } finally {
//       setIsTranscribing(false);
//     }
//   };

//   const handleRecordingComplete = async (blob) => {
//     await handleFileUpload(blob);
//   };

//   const mockPatients = [
//     { name: "John Doe", lastVisit: "2024-03-15", documentCount: 3 },
//     { name: "Jane Smith", lastVisit: "2024-03-14", documentCount: 5 },
//     { name: "Robert Johnson", lastVisit: "2024-03-13", documentCount: 2 },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-medical-50 to-gray-50">
//       <div className="container py-8 space-y-8 animate-fade-in">
//         <header className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">HealthScript</h1>
//             <p className="text-gray-600 mt-1">
//               Record and manage patient appointments
//             </p>
//           </div>
//           <Button className="bg-medical-600 hover:bg-medical-700">
//             <Plus className="w-4 h-4 mr-2" /> New Patient
//           </Button>
//         </header>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <AudioRecorder onRecordingComplete={handleRecordingComplete} />
//             <FileUploader onFileUpload={handleFileUpload} />

//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setView("transcription")}
//                 className={`px-4 py-2 rounded text-white font-medium shadow ${
//                   view === "transcription"
//                     ? "bg-blue-500"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}>
//                 Transcription
//               </button>
//               <button
//                 onClick={() => setView("soap_notes")}
//                 className={`px-4 py-2 rounded text-white font-medium shadow ${
//                   view === "soap_notes"
//                     ? "bg-blue-500"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}>
//                 SOAP Notes
//               </button>
//               <button
//                 onClick={() => setView("health_report")}
//                 className={`px-4 py-2 rounded text-white font-medium shadow ${
//                   view === "health_report"
//                     ? "bg-blue-500"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}>
//                 Health Report
//               </button>
//               <button
//                 onClick={() => setView("summary")}
//                 className={`px-4 py-2 rounded text-white font-medium shadow ${
//                   view === "summary"
//                     ? "bg-blue-500"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}>
//                 Summary
//               </button>
//             </div>

//             {view === "transcription" && (
//               <TranscriptionView
//                 transcription={transcription}
//                 isLoading={isTranscribing}
//               />
//             )}

//             {view === "soap_notes" && (
//               <div className="p-4 bg-white rounded shadow">
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   SOAP Notes
//                 </h2>
//                 <textarea
//                   value={soapNotesMD}
//                   onChange={(e) => setSoapNotesMD(e.target.value)}
//                   className="w-full mt-2 p-2 border rounded-md text-gray-800"
//                   rows={8}
//                 />
//                 <button
//                   onClick={() => saveToDatabase("soap_notes", soapNotesMD)}
//                   className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                   Save SOAP Notes
//                 </button>
//               </div>
//             )}

//             {view === "health_report" && (
//               <div className="p-4 bg-white rounded shadow">
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   Health Report
//                 </h2>
//                 <ReactMarkdown className="mt-2 text-gray-800">
//                   {healthReport || "No health report available."}
//                 </ReactMarkdown>
//               </div>
//             )}

//             {view === "summary" && (
//               <div className="p-4 bg-white rounded shadow">
//                 <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
//                 <ReactMarkdown className="mt-2 text-gray-800">
//                   {summary || "No summary available."}
//                 </ReactMarkdown>
//               </div>
//             )}
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Recent Patients
//             </h2>
//             <div className="space-y-4">
//               {mockPatients.map((patient) => (
//                 <PatientCard
//                   key={patient.name}
//                   {...patient}
//                   onClick={() => console.log(`Clicked ${patient.name}`)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transcription;

// // AudioRecorder.js
// export const AudioRecorder = ({ onRecordingComplete }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         audioChunksRef.current.push(event.data);
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, {
//           type: "audio/webm",
//         });
//         audioChunksRef.current = [];
//         setAudioURL(URL.createObjectURL(audioBlob));
//         onRecordingComplete(audioBlob); // Pass the audio blob to the parent
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow rounded-lg space-y-4">
//       <button
//         onClick={isRecording ? stopRecording : startRecording}
//         className={`w-full p-4 text-white rounded-lg ${
//           isRecording
//             ? "bg-red-500 hover:bg-red-600"
//             : "bg-green-500 hover:bg-green-600"
//         }`}>
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//       {audioURL && (
//         <div className="space-y-2">
//           <p className="text-gray-700">
//             Recording complete. You can listen below:
//           </p>
//           <audio controls src={audioURL} className="w-full" />
//         </div>
//       )}
//     </div>
//   );
// };

// // FileUploader.js
// export const FileUploader = ({ onFileUpload }) => {
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       onFileUpload(file);
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow rounded-lg space-y-4">
//       <label className="block text-sm font-medium text-gray-700">
//         Upload a Recording
//       </label>
//       <input
//         type="file"
//         accept="audio/*"
//         onChange={handleFileChange}
//         className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//       />
//     </div>
//   );
// };

// // TranscriptionView.js
// export const TranscriptionView = ({
//   transcription,
//   isLoading,
//   onSave,
//   onChange,
// }) => {
//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h2 className="text-lg font-semibold text-gray-900">Transcription</h2>
//       <div className="mt-2">
//         {isLoading ? (
//           <p className="text-gray-500 italic">Transcribing audio...</p>
//         ) : (
//           <>
//             <textarea
//               value={transcription}
//               onChange={(e) => onChange(e.target.value)}
//               className="w-full mt-2 p-2 border rounded-md text-gray-800"
//               rows={8}
//             />
//             <button
//               onClick={onSave}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//               Save Transcription
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState, useRef } from "react";
import { Plus } from "lucide-react";
import ReactMarkdown from "react-markdown";

const EditableMarkdownView = ({ title, content, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [markdownContent, setMarkdownContent] = useState(content);

  const handleSave = () => {
    onSave(markdownContent);
    setIsEditing(false); // Switch back to preview mode after saving
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      <div className="mt-4">
        {isEditing ? (
          <>
            <textarea
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              className="w-full p-2 border rounded-md text-gray-800"
              rows={10}
            />
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <ReactMarkdown className="prose">{markdownContent}</ReactMarkdown>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Transcription = () => {
  const [transcription, setTranscription] = useState("");
  const [soapNotesMD, setSoapNotesMD] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [healthReport, setHealthReport] = useState("");
  const [summary, setSummary] = useState("");
  const [view, setView] = useState("transcription"); // Options: transcription, soap_notes, health_report

  const handleFileUpload = async (file) => {
    setIsTranscribing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to transcribe audio. Please try again.");
      }

      const data = await response.json();
      setTranscription(data.transcription);
      setSoapNotesMD(data.soap_notes_md || "");
      setHealthReport(data.health_report || "");
      setSummary(data.summary || "");

    } catch (error) {
      console.error("Error during transcription:", error);
      setTranscription("An error occurred while transcribing the audio.");
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleRecordingComplete = async (blob) => {
    await handleFileUpload(blob);
  };

  const saveToDatabase = async (type, content) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to save. Please try again.");
      }
      alert("Content saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("An error occurred while saving the content.");
    }
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
            <h1 className="text-3xl font-bold text-gray-900">HealthScript</h1>
            <p className="text-gray-600 mt-1">
              Record and manage patient appointments
            </p>
          </div>
          <Button className="bg-medical-600 hover:bg-medical-700">
            <Plus className="w-4 h-4 mr-2" /> New Patient
          </Button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AudioRecorder onRecordingComplete={handleRecordingComplete} />
            <FileUploader onFileUpload={handleFileUpload} />

            <div className="flex space-x-4">
              <button
                onClick={() => setView("transcription")}
                className={`px-4 py-2 rounded text-white font-medium shadow ${
                  view === "transcription"
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}>
                Transcription
              </button>
              <button
                onClick={() => setView("soap_notes")}
                className={`px-4 py-2 rounded text-white font-medium shadow ${
                  view === "soap_notes"
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}>
                SOAP Notes
              </button>
              <button
                onClick={() => setView("health_report")}
                className={`px-4 py-2 rounded text-white font-medium shadow ${
                  view === "health_report"
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}>
                Health Report
              </button>
              <button
                onClick={() => setView("summary")}
                className={`px-4 py-2 rounded text-white font-medium shadow ${
                  view === "summary"
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}>
                Summary
              </button>
            </div>

            {view === "transcription" && (
              <EditableMarkdownView
                title="Transcription"
                content={transcription}
                onSave={(updatedContent) => setTranscription(updatedContent)}
              />
            )}

            {view === "soap_notes" && (
              <EditableMarkdownView
                title="SOAP Notes"
                content={soapNotesMD}
                onSave={(updatedContent) =>
                  saveToDatabase("soap_notes", updatedContent)
                }
              />
            )}

            {view === "health_report" && (
              <EditableMarkdownView
                title="Health Report"
                content={healthReport}
                onSave={(updatedContent) =>
                  saveToDatabase("health_report", updatedContent)
                }
              />
            )}

            {view === "summary" && (
              <EditableMarkdownView
                title="Summary"
                content={summary}
                onSave={(updatedContent) =>
                  saveToDatabase("summary", updatedContent)
                }
              />
            )}
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

// FileUploader.js
export const FileUploader = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Upload a Recording
      </label>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
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
