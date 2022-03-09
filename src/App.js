import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/Auth/RequireAuth";
import Container from "./components/Container/Container";

import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./styles/main.scss";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Routes>
      <Route
        path="/"
        index
        element={currentUser ? <Navigate to="/dashboard" /> : <SignIn />}
      />
      <Route path="/signin" element={<Navigate to="/" />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/" /> : <SignUp />}
      />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Container />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
