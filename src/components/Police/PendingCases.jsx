import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchComplaints,
  updateComplaintStatus,
} from "../../redux/complaints/complaintsSlice";

const PendingComplaints = ({searchQuery}) => {
  const dispatch = useDispatch();
  const { data: complaints, status } = useSelector((state) => state.complaints);

  const [expandedId, setExpandedId] = useState(null);
  const [investigatingId, setInvestigatingId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  // Filters: username text, state dropdown
  const [filterUsername, setFilterUsername] = useState("");
  const [filterState, setFilterState] = useState("all");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchComplaints());
    }
  }, [status, dispatch]);

  const pendingComplaints = complaints.filter((comp) => comp.status === "registered");

  // Get unique states for dropdown options
  // const uniqueStates = Array.from(new Set(complaints.map((c) => c.state))).filter(Boolean);
   const uniqueStates = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka",
  "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Uttar Pradesh"
];

  // Filter based on username and state
  const filteredComplaints = pendingComplaints.filter((comp) => {
  const usernameMatch = comp.username.toLowerCase().includes(filterUsername.toLowerCase());
  const stateMatch = filterState === "all" || comp.state === filterState;
  const search = searchQuery.toLowerCase();
  const searchMatch =
    comp.complaint.toLowerCase().includes(search) ||
    comp.username.toLowerCase().includes(search) ||
    (comp.state && comp.state.toLowerCase().includes(search));
  
  return usernameMatch && stateMatch && searchMatch;
});

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      setInvestigatingId(null);
    } else {
      setExpandedId(id);
      setInvestigatingId(null);
    }
  };

  const handleInvestigate = (id) => {
    setInvestigatingId(id);
  };

  const handleCancel = () => {
    setExpandedId(null);
    setInvestigatingId(null);
  };

  const handleResolve = (id) => {
    alert(`Case with ID ${id} marked as resolved`);
    dispatch(updateComplaintStatus({ id, status: "resolved" }));
    dispatch(fetchComplaints());
    setExpandedId(null);
    setInvestigatingId(null);
  };

  return (
    <div className="space-y-3 p-4 rounded bg-yellow-50">
      <h3 className="text-xl font-semibold mb-3 text-gray-600">
        Total Pending Complaints: <strong>{filteredComplaints.length}</strong>
      </h3>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4 max-w-md">
        {/* Username Filter */}
        <input
          type="text"
          placeholder="Filter by Username"
          value={filterUsername}
          onChange={(e) => setFilterUsername(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded mb-2 md:mb-0"
        />

        {/* State Filter Dropdown */}
        <select
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All States</option>
          {uniqueStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {status === "loading" && <p>Loading complaints...</p>}

      {filteredComplaints.length === 0 ? (
        <p>No pending complaints found.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {filteredComplaints.slice(0, visibleCount).map((complaint) => (
              <li
                key={complaint.id}
                onClick={() => toggleExpand(complaint.id)}
                className="border p-4 rounded shadow cursor-pointer hover:bg-gray-50 transition"
              >
                <p className="text-gray-800">
                  <strong>Complaint:</strong> {complaint.complaint}
                </p>

                {expandedId === complaint.id && (
                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <p><strong>Name:</strong> {complaint.name}</p>
                    <p><strong>Username:</strong> {complaint.username}</p>
                    <p><strong>Date:</strong> {complaint.date}</p>
                    <p><strong>Phone:</strong> {complaint.phno}</p>
                    <p><strong>Address:</strong> {complaint.address}</p>
                    <p><strong>State:</strong> {complaint.state}</p>

                    {!investigatingId ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleInvestigate(complaint.id);
                        }}
                        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Are you investigating?
                      </button>
                    ) : (
                      complaint.id === investigatingId && (
                        <div className="flex gap-3 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResolve(complaint.id);
                            }}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Case Resolved
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancel();
                            }}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {visibleCount < filteredComplaints.length && (
            <div className="text-center mt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Read More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PendingComplaints;
