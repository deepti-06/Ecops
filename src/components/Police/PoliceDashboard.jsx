import React,{useState} from "react";
import PendingCases from "./PendingCases";
import ResolvedCases from "./ResolvedCases";
import CasesPieChart from "./CasesPieChart";
import Header from "../Header";

const PoliceDashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-black to-gray-700  p-6">
      <Header/>
      <h1 className="text-3xl font-bold text-center text-white mb-6">Police Dashboard</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search cases by complaint, username, state..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-2 border border-white text-white rounded"

        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <CasesPieChart />
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
 
        <PendingCases searchQuery={searchQuery}/>
        <ResolvedCases searchQuery={searchQuery} />
        </div>
        
      </div>
    </div>
  );
};

export default PoliceDashboard; 
