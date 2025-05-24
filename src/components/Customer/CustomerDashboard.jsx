import React, {useState} from "react";
import AddComplaintForm from "./AddComplaintForm";
import RegisteredComplaints from "./RegisteredComplaints";
import ResolvedComplaints from "./ResolvedComplaints.jsx";
import Header from "../Header.jsx"

const CustomerDashboard = () => {

  const [searchQuery, setSearchQuery] = useState("")
  return (
    <div className=" min-h-screen 
    bg-gradient-to-br from-gray-300 via-black to-gray-700 ">
      
      <Header/>
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Citizen Dashboard</h1>

      {/* Search Bar (Not functional yet) */}
      <div className=" p-4 mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-2 border border-white text-white rounded"
        />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
            {/* File Complaint */}
        <div className="bg-[beige] p-3 rounded-2xl shadow-md border flex flex-row gap-2 ">
          <h2 className="text-xl font-semibold mb-3 text-black mt-2">📨 File Complaint</h2>
          <AddComplaintForm />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
       

        {/* Registered Complaints */}
        <div className="bg-[beige] p-4 rounded-2xl shadow-md border w-full md:w-auto">
          <h2 className="text-xl font-semibold mb-3 text-yellow-700">📋 Registered Complaints</h2>
          <RegisteredComplaints searchQuery={searchQuery} />
        </div>

        {/* Resolved Complaints */}
        <div className="bg-[beige] p-4 rounded-2xl shadow-md border">
          <h2 className="text-xl font-semibold mb-3 text-green-700">✅ Resolved Complaints</h2>
          <ResolvedComplaints  searchQuery={searchQuery}/>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
