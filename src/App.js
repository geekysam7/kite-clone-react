import React, { useReducer, createContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/Auth/RequireAuth";
import Container from "./components/Container/Container";

import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import reducer from "./store";
import "./styles/main.scss";

const initialState = {
  user: false,
  userId: "T101",
  userName: "Test",
  userStocks: {},
  userBalance: {
    margin: 10000,
    currentValue: 12000,
    investment: 0,
    pL: 2000,
  },
  pendingTransactions: [],
  completedTransactions: [],
  count: 0,
};

export const UserContext = createContext();

function App() {
  const [userState, dispatch] = useReducer(reducer, initialState);

  const isUserSignedIn = userState.user;

  return (
    <UserContext.Provider value={{ user: userState, dispatch }}>
      <Routes>
        <Route
          path="/"
          index
          element={isUserSignedIn ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route path="/signin" element={<Navigate to="/" />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route
          path="/signup"
          element={isUserSignedIn ? <Navigate to="/" /> : <SignUp />}
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
    </UserContext.Provider>
  );
}

export default App;
