import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { LeftContainer, RightContainer, MainContainer } from "..";
import { UserContext } from "../../App";
import Header from "../Header/Header";

function Container() {
  const { user: userState, dispatch } = useContext(UserContext);

  const defaultTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const isThemeSet = localStorage.getItem("theme");

  const [theme, setTheme] = useState(
    isThemeSet ? isThemeSet : defaultTheme ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (userState.pendingTransactions.length) {
        const mockAPI = async () => {
          const response = await fetch("mock/indexStocks.json");
          const res = await response.json();
          dispatch({ type: "evaluate-pending-transactions", payload: res });
        };
        mockAPI();
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="app" data-theme={theme}>
      <Header />
      <MainContainer>
        <LeftContainer />
        <Routes>
          <Route path="/*" element={<RightContainer />} />
        </Routes>
      </MainContainer>
    </div>
  );
}

export default Container;
