import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Holdings from "../../pages/Holdings";
import Marketwatch from "../../pages/Marketwatch";

export default function RightContainer() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 900) {
        if (location.pathname === "/marketwatch") {
          navigate("/dashboard");
        }
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="dashboard">
      <Routes>
        <Route index element={<Navigate to={"/dashboard"} />} />
        <Route path="/marketwatch" element={<Marketwatch />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Dashboard />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/funds" element={<Dashboard />} />
        <Route path="/*" element={<Navigate to="/notfound" />} />
      </Routes>
    </div>
  );
}
