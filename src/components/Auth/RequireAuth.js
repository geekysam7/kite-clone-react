import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
