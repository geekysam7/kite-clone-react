import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

export default function RightContainer() {
  return (
    <Routes>
      <Route index element={<Navigate to={"/dashboard"} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders" element={<Dashboard />} />
      <Route path="/holdings" element={<Dashboard />} />
      <Route path="/funds" element={<Dashboard />} />
      <Route path="/*" element={<Navigate to="/notfound" />} />
    </Routes>
  );
}
