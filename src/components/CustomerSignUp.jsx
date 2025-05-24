import React, { useState } from "react";

const states = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka",
  "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Uttar Pradesh"
];

const CustomerSignUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    state: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

//http://localhost:5000/register
   const handleSubmit = async () => {
  try {
    const response = await fetch("https://citizenlogindata.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
    
  );
      console.log(formData)

    if (response.ok) {
      const result = await response.json();
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        state: ""
      });
      alert("Signup successful!");
      //onSignup(result); // Optional callback
      onClose();
    } else {
      const error = await response.json();
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        state: ""
      });
      alert(`Signup failed: ${error.message}`);
    }
  } catch (err) {
    alert("Something went wrong. Please try again later.")
    setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        state: ""
      });;
    console.error(err);
  }
};

    


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white text-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Citizen Signup</h2>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-3 border rounded"
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-3 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-3 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-3 border rounded"
        />
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
          >
            Signup
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignUp;
