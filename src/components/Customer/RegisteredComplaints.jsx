import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComplaints, deleteComplaint } from "../../redux/complaints/complaintsSlice";

const RegisteredComplaints = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { data: complaints, status } = useSelector((state) => state.complaints);
  const username = JSON.parse(localStorage.getItem("user"))?.username;

  const [expanded, setExpanded] = useState(false);
  const MAX_VISIBLE = 3;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchComplaints());
    }
  }, [status, dispatch]);

  // Step 1: Base filter
  const baseFiltered = complaints.filter(
    (comp) => comp.username === username && comp.status === "registered"
  );

  // Step 2: Apply search filter
  const filtered = baseFiltered.filter((comp) =>
    comp.complaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.date?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Step 3: Slice for pagination
  const visibleComplaints = expanded ? filtered : filtered.slice(0, MAX_VISIBLE);

  const handleDelete = (id) => {
    dispatch(deleteComplaint(id));
  };

  return (
    <div className="space-y-3 p-4 rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-2 text-blue-700">📌 Registered Complaints</h2>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No registered complaints found.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {visibleComplaints.map((complaint) => (
              <li key={complaint.id} className="border p-4 rounded shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <p className="text-gray-800 break-words">
                    <strong>Complaint:</strong> {complaint.complaint}
                  </p>
                  <button
                    onClick={() => handleDelete(complaint.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full md:w-auto"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Date:</strong> {complaint.date}
                </p>
              </li>
            ))}
          </ul>

          {filtered.length > MAX_VISIBLE && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-blue-600 hover:underline"
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RegisteredComplaints;
