import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { MainContainer } from ".";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

import { BuySellForm, Header } from "components";
import { handleCompletedTransactions } from "action/transaction.action";
import { transactionConstants } from "utils/constants";
import { floatParser } from "utils/general.utils";
import DesktopWrapper from "./DesktopWrapper";

export default function Container() {
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
        <DesktopWrapper>
          <LeftContainer />
        </DesktopWrapper>
        <Routes>
          <Route path="/*" element={<RightContainer />} />
        </Routes>
        {isTransactionWindowOpen && <BuySellForm />}
      </MainContainer>
    </div>
  );
}
