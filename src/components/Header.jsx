import React from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-4 text-white">
      <div className="text-2xl font-bold">
        {/* Replace with your actual logo/image */}
        Ecops
      </div>

      <div className="flex items-center space-x-4">
        <CgProfile />
        {user && <span className="text-lg">Welcome, {user.username}</span>}
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
