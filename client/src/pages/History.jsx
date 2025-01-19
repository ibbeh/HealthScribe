import React from "react";
import { Search, Calendar, Clock, FileText } from "lucide-react";

function HistoryPage() {
  const activities = [
    {
      id: 1,
      type: "Appointment",
      patient: "John Doe",
      action: "Completed appointment",
      date: "2024-03-15 14:30",
      details: "Follow-up consultation",
    },
    {
      id: 2,
      type: "Transcription",
      patient: "Jane Smith",
      action: "Transcription completed",
      date: "2024-03-15 13:15",
      details: "Initial consultation notes",
    },
    {
      id: 3,
      type: "Document",
      patient: "Robert Johnson",
      action: "Added medical records",
      date: "2024-03-14 16:45",
      details: "Uploaded lab results",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "Appointment":
        return Calendar;
      case "Transcription":
        return FileText;
      default:
        return Clock;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Activity History</h2>
        <p className="text-gray-600">
          Track all activities and changes in your practice
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search activity history..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div
              key={activity.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {activity.action}
                      </h3>
                      <p className="text-gray-600">
                        Patient: {activity.patient}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.date}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{activity.details}</p>
                  <div className="mt-4 flex gap-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                    {activity.type === "Transcription" && (
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Download Transcript
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistoryPage;
