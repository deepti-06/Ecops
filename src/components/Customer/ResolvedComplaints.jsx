import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComplaints } from "../../redux/complaints/complaintsSlice";

const ResolvedComplaints = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { data: complaints, status } = useSelector((state) => state.complaints);
  const username = JSON.parse(localStorage.getItem("user"))?.username;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchComplaints());
    }
  }, [status, dispatch]);

  if (!username) {
    return <p>Please login to view resolved complaints.</p>;
  }

  if (status === "loading") {
    return <p>Loading complaints...</p>;
  }

  if (status === "failed") {
    return <p>Error loading complaints.</p>;
  }

  // Step 1: Base filter
  const baseResolved = complaints.filter(
    (comp) => comp.username === username && comp.status === "resolved"
  );

    const query = (searchQuery || "").toLowerCase();
  // Step 2: Apply search filter
const filteredResolved = baseResolved.filter((comp) =>
  (comp.complaint || "").toLowerCase().includes(query) ||
  (comp.state || "").toLowerCase().includes(query) ||
  (comp.date || "").toLowerCase().includes(query)
);


  if (filteredResolved.length === 0) {
    return <p>No resolved complaints found.</p>;
  }

  return (
    <div className="space-y-3 p-4 rounded bg-green-50">
      <h2 className="text-lg font-semibold text-green-700">
        ✅ Resolved Complaints ({filteredResolved.length})
      </h2>

      {filteredResolved.map((comp) => (
        <div
          key={comp.id}
          className="p-3 border rounded bg-green-100 text-sm shadow"
        >
          <p><strong>Complaint:</strong> {comp.complaint}</p>
          <p><strong>Date:</strong> {comp.date}</p>
          <p><strong>State:</strong> {comp.state}</p>
        </div>
      ))}
    </div>
  );
};

export default ResolvedComplaints;
