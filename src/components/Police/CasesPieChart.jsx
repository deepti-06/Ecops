import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { fetchComplaints } from "../../redux/complaints/complaintsSlice";

const COLORS = ["#10B981", "#F59E0B"];

const CasesPieChart = () => {
  const dispatch = useDispatch();
  const { data: complaints, status } = useSelector((state) => state.complaints);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchComplaints());
    }
  }, [status, dispatch]);

  // Count resolved and pending complaints
  const resolvedCount = complaints.filter((c) => c.status === "resolved").length;
  const pendingCount = complaints.filter((c) => c.status === "registered").length;

  const data = [
    { name: "Resolved", value: resolvedCount },
    { name: "Pending", value: pendingCount }
  ];

  const total = resolvedCount + pendingCount;

  return (
    <div className="bg-[beige] p-6 shadow rounded">
      <h2 className="text-2xl font-semibold text-center mb-6">Case Overview</h2>

      <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-12">
        {/* Pie Chart */}
        <div className="relative">
          <PieChart width={350} height={350}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">{total}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6 text-sm max-w-sm mx-auto lg:mx-0 lg:w-[300px]">
          <div className="flex items-start gap-2">
            <div className="w-5 h-4 mt-1 rounded-full bg-green-500"></div>
            <div>
              <p className="font-semibold">Resolved Cases: {resolvedCount}</p>
              <p className="text-gray-600">
                These cases have been fully investigated and closed.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-4 mt-1 rounded-full bg-yellow-500"></div>
            <div>
              <p className="font-semibold">Pending Cases: {pendingCount}</p>
              <p className="text-gray-600">
                These cases are currently under investigation or awaiting action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesPieChart;
