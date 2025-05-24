import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComplaint } from "../../redux/complaints/complaintsSlice";

const AddComplaintForm = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    address: "",
    phno: "",
    complaint: "",
    date: "",
    state: "",
  });
  const states = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka",
  "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Uttar Pradesh"
];
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //http://localhost:5001/api/complaints
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("https://addcomplaintdata.onrender.com/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("New complaint data:", data);

    dispatch(addComplaint(data.complaint)); // use what backend returns (including id, status)


    if (!response.ok) throw new Error(data.message || "Failed to submit");

    alert("Complaint submitted successfully!");
    setShowModal(false);
    setFormData({ name: "", username: "", address: "", phno: "", complaint: "", date: "", state: "" });
  } catch (error) {
    alert(error.message);
  }
};


  return (
    <div>
      {/* Trigger */}
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
        >
          +
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-center">New Complaint</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="border p-2 rounded"
                  required
                />
              </div>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border p-2 rounded"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  name="phno"
                  value={formData.phno}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              </div>

              {/* <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full border p-2 rounded"
                required
              /> */}
                 <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
              <textarea
                name="complaint"
                value={formData.complaint}
                onChange={handleChange}
                placeholder="Complaint"
                rows={3}
                className="w-full border p-2 rounded"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddComplaintForm;
