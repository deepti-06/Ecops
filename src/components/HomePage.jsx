import React from "react";
import { useState } from "react";
import PoliceLoginModal from "./PoliceLoginModal";
import CustomerLoginModal from "./CustomerLoginModal";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCusModal, setCusShowModal] = useState(false);



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-black to-gray-700 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-xl">
        <h1 className="text-6xl font-bold mb-4">Welcome to Ecops</h1>
        <p className="text-lg mb-8">
          A secure platform where customers can file complaints and police can assist them efficiently.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded w-full sm:w-auto transition"
          onClick={() => setShowModal(true)}>
            Police Login
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded w-full sm:w-auto transition"
          onClick={() => setCusShowModal(true)}>

            Citizen Login
          </button>
        </div>
        {/* {loginMessage && <p className="mt-4 text-sm">{loginMessage}</p>} */}
      </div>
       {showModal && (
        <PoliceLoginModal
          onClose={() => {
            setShowModal(false);
          }}
          
        />
         )}

          {showCusModal && (
        <CustomerLoginModal
          onClose={() => {
            setCusShowModal(false);
          }}
          
        />
         )}
      
    </div>
  );
};

export default HomePage;
