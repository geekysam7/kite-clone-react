import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Holdings from "../../pages/Holdings";

export default function RightContainer() {
  return (
    <div className="dashboard">
      <Routes>
        <Route index element={<Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Dashboard />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/funds" element={<Dashboard />} />
        <Route path="/*" element={<Navigate to="/notfound" />} />
      </Routes>
    </div>
  );
}
