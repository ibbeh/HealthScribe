import React, { useState } from "react";
import { Search, PlusCircle, Filter, X } from "lucide-react";

function PatientsPage() {
  // 1) Move initial patients into state so we can add new ones dynamically
  const [patients, setPatients] = useState([
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
  ]);

  // 2) Add form visibility toggle and new patient state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    lastVisit: "",
    condition: "",
    status: "Active",
  });

  // Generate a temporary incremental ID
  const getNextId = () => {
    return patients.length > 0
      ? Math.max(...patients.map((p) => p.id)) + 1
      : 1;
  };

  // 3) Handle the Add Patient button click
  const handleAddPatientClick = () => {
    setShowAddForm(true);
  };

  // 4) Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 5) Handle final add action
  const handleAddPatientSubmit = (e) => {
    e.preventDefault();
    if (!newPatient.name.trim()) {
      // Example validation - require at least a name
      alert("Please enter the patient's name.");
      return;
    }

    // Add the new patient to the list
    setPatients((prev) => [
      ...prev,
      {
        id: getNextId(),
        ...newPatient,
      },
    ]);

    // Clear form and close it
    setNewPatient({
      name: "",
      age: "",
      lastVisit: "",
      condition: "",
      status: "Active",
    });
    setShowAddForm(false);
  };

  // 6) Cancel adding a patient
  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

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
          <button
            onClick={handleAddPatientClick}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            Add Patient
          </button>
        </div>
      </div>

      {/* 7) Add Patient Form (Conditional) */}
      {showAddForm && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Add New Patient
            </h3>
            <button
              onClick={handleCancelAdd}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleAddPatientSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={newPatient.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Enter patient's name"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={newPatient.age}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter patient's age"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Last Visit
                </label>
                <input
                  type="date"
                  name="lastVisit"
                  value={newPatient.lastVisit}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Condition
                </label>
                <input
                  type="text"
                  name="condition"
                  value={newPatient.condition}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Condition"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={newPatient.status}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Discharged">Discharged</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={handleCancelAdd}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Patient
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Patients Table */}
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
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
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
                          : patient.status === "Follow-up"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
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
              {patients.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No patients found. Add a new patient above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PatientsPage;
