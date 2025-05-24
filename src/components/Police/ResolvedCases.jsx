import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComplaints } from "../../redux/complaints/complaintsSlice";

const ResolvedCases = ({ searchQuery }) => {
  const { data: complaints, status } = useSelector((state) => state.complaints);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchComplaints());
    }
  }, [dispatch, status]);

  // Filter resolved complaints first
  const resolvedComplaints = complaints.filter(
    (comp) => comp.status === "resolved"
  );

  // Apply search filter on resolved complaints
  const filteredResolved = resolvedComplaints.filter((comp) => {
    const q = searchQuery.toLowerCase();
    return (
      comp.complaint.toLowerCase().includes(q) ||
      comp.username.toLowerCase().includes(q) ||
      (comp.state && comp.state.toLowerCase().includes(q))
    );
  });

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="space-y-3 p-4 rounded bg-[beige]">
      <h2 className="text-xl font-semibold mb-3 text-green-700">
        ✅ Resolved Cases ({filteredResolved.length})
      </h2>

      {filteredResolved.length === 0 ? (
        <p>No resolved complaints found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredResolved.map((complaint) => (
            <li
              key={complaint.id}
              className="border p-4 rounded shadow cursor-pointer bg-white hover:bg-gray-50 transition"
              onClick={() => toggleExpand(complaint.id)}
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-800 font-medium">
                  <strong>Complaint:</strong> {complaint.complaint}
                </p>
                <span className="text-sm text-green-600">Resolved</span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                <strong>Date:</strong> {complaint.date}
              </p>

              {expandedId === complaint.id && (
                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p><strong>Name:</strong> {complaint.name}</p>
                  <p><strong>Username:</strong> {complaint.username}</p>
                  <p><strong>Address:</strong> {complaint.address}</p>
                  <p><strong>Phone:</strong> {complaint.phno}</p>
                  <p><strong>State:</strong> {complaint.state}</p>
                  <p><strong>Date:</strong> {complaint.date}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResolvedCases;
