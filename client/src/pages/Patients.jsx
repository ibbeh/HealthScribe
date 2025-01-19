import React from "react";
import { Search, PlusCircle, Filter } from "lucide-react";

function PatientsPage() {
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      lastVisit: "2024-03-15",
      condition: "Hypertension",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      lastVisit: "2024-03-14",
      condition: "Diabetes Type 2",
      status: "Active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 58,
      lastVisit: "2024-03-10",
      condition: "Arthritis",
      status: "Follow-up",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
          <p className="text-gray-600">Manage your patient records</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <PlusCircle className="h-5 w-5" />
            Add Patient
          </button>
        </div>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-800">
                  Name
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">
                  Age
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">
                  Last Visit
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">
                  Condition
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-800">{patient.name}</p>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{patient.age}</td>
                  <td className="py-4 px-6 text-gray-600">
                    {patient.lastVisit}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {patient.condition}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-4">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View Profile
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Medical History
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PatientsPage;
