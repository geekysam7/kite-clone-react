import React, { useState, useEffect, useReducer, createContext } from "react";
import { LeftContainer, RightContainer, MainContainer } from "./components";
import Header from "./components/Header/Header";
import reducer from "./store";
import "./styles/main.scss";

const initialState = {
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

  console.log(switchTheme);

  const [userState, dispatch] = useReducer(reducer, initialState);
  console.log(userState);

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
      <UserContext.Provider value={{ user: userState, dispatch }}>
        <Header />
        <MainContainer>
          <LeftContainer />
          <RightContainer />
        </MainContainer>
      </UserContext.Provider>
    </div>
  );
}

export default App;
