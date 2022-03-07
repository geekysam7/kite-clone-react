import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

function RequireAuth({ children }) {
  const { user } = useContext(UserContext);

  const location = useLocation();

  if (!user.user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
