import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const policeCredentials = [
  { username: "delhiPolice", password: "secure123" },
  { username: "mumbaiPolice", password: "topsecret" },
  { username: "upPolice", password: "clue2025" }
];

const PoliceLoginModal = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 //The .some() method iterates through this array to check if at least one credential matches the entered username and password.If any match is found, .some() returns true and stores it in isValid. Otherwise, it returns false.
 
  const handleLogin = () => {
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  if (!trimmedUsername || !trimmedPassword) {
    alert("Please enter both username and password");
    return;
  }

  const isValid = policeCredentials.some(
    (cred) => cred.username === trimmedUsername && cred.password === trimmedPassword
  );

  if (isValid) {
    alert("Login successful");
    const loggedInUser = { username: trimmedUsername };

    localStorage.setItem("user", JSON.stringify(loggedInUser));
    onClose();
    navigate("/police_dashboard");
  } else {
    alert("Invalid credentials");
    onClose();
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-[beige] text-gray-900 rounded-lg p-6 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Police Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col  justify-between gap-2">
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoliceLoginModal;
