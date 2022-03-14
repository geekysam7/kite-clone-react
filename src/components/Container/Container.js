import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { LeftContainer, RightContainer, MainContainer, BuySellForm } from "..";
import { handleCompletedTransactions } from "../../redux/transaction/transaction.action";
import { transactionConstants } from "../../utils/constants";
import { floatParser } from "../../utils/functions";
import Header from "../Header/Header";

function Container() {
  const { transactions, transactionsById } = useSelector(
    (state) => state.transactions
  );
  const market = useSelector((state) => state.market.market);
  const isTransactionWindowOpen = useSelector(
    (state) => state.uistate.isTransactionWindowOpen
  );
  const dispatch = useDispatch();

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
      let pendingTransactions = transactionsById.filter(
        (item) =>
          transactions[item].status === transactionConstants.PENDING.label
      );

      if (pendingTransactions.length) {
        pendingTransactions.forEach((transactionId) => {
          let transaction = transactions[transactionId];
          console.log(transaction);
          if (market[transaction.instrumentId]) {
            if (
              transaction.type === transactionConstants.SELL.label &&
              transaction.parsedTriggerPrice <=
                floatParser(market[transaction.instrumentId].ltP)
            ) {
              dispatch(handleCompletedTransactions(transaction));
            }

            if (
              transaction.type === transactionConstants.BUY.label &&
              transaction.parsedTriggerPrice >=
                floatParser(market[transaction.instrumentId].ltP)
            ) {
              dispatch(handleCompletedTransactions(transaction));
            }
          }
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="app" data-theme={theme}>
      <Header switchTheme={switchTheme} />
      <MainContainer>
        <LeftContainer />
        <Routes>
          <Route path="/*" element={<RightContainer />} />
        </Routes>
        {isTransactionWindowOpen && <BuySellForm />}
      </MainContainer>
    </div>
  );
}

export default Container;
