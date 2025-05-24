import CustomerDashboard from "./components/Customer/CustomerDashboard";
import HomePage from "./components/HomePage"
import PoliceDashboard from "./components/Police/PoliceDashboard"

import { Routes, Route } from "react-router-dom";

function App() {

  return (
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/police_dashboard" element={<PoliceDashboard />} />
      <Route path="/customer_dashboard" element={<CustomerDashboard />} />

    </Routes>
  )
}

export default App
