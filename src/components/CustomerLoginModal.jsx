import React, { useState } from "react";
import CustomerSignUp from "./CustomerSignUp";
import { useNavigate } from "react-router-dom";


const CustomerLoginModal = ({onClose}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const navigate= useNavigate()

//http://localhost:5000/login
  const handleLogin = async () => {
  try {
    const response = await fetch("https://citizenlogindata.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      setUsername("")
      setPassword("")
      alert("Login successful!");
      const loggedInUser = { username: username };

      localStorage.setItem("user", JSON.stringify(loggedInUser));

      onClose()
      navigate("/customer_dashboard");


      // optionally store token / user data if returned
      // localStorage.setItem("token", data.token);

    } else {
      const error = await response.json();
      setUsername("")
      setPassword("")
      alert("Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
    setUsername("")
      setPassword("")
    alert("Invalid credentials");;
  }
};



  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-[beige] text-gray-900 rounded-lg p-6 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Citizen Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="flex flex-col  justify-between gap-2">
        <button
          // onClick={() => onLogin(username, password)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          // onClick={() => onSignup()}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full sm:w-auto"
          onClick={()=> setShowSignup(true)}
        >
          Signup
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </div>
      {showSignup && (
        <CustomerSignUp 
        onClose={() => setShowSignup(false)}
        />)}

    </div>
  );
};

export default CustomerLoginModal;
