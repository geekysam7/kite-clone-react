import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Dashboard, Holding, Marketwatch, Orders } from "pages";

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
        <Route path="/orders" element={<Orders />} />
        <Route path="/holdings" element={<Holding />} />
        <Route path="/funds" element={<Dashboard />} />
        <Route path="/*" element={<Navigate to="/notfound" />} />
      </Routes>
    </div>
  );
}
