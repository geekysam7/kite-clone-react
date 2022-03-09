import React from "react";
import { useSelector } from "react-redux";

export default function PortfolioRow({ row: transactionId }) {
  const { portfolioStocks } = useSelector((state) => state.user);

  const transaction = portfolioStocks[transactionId] || {};

  return (
    <>
      <td>{transaction.symbol}</td>
      <td>{transaction.quantity}</td>
      <td>{transaction.avgPrice}</td>
      <td>
        <button className="marketwatch-button marketwatch-button--sell">
          S
        </button>
      </td>
    </>
  );
}
