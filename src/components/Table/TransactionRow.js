import React from "react";

export default function TransactionRow({ row: transaction }) {
  let d = new Date(transaction.timestamp);
  let time = d.toLocaleTimeString();
  let date = d.toLocaleDateString();

  return (
    <>
      <td>{transaction.symbol}</td>
      <td>
        <span className="date">{date}</span>
        <span className="time">{time}</span>
      </td>
      <td>
        <span className={transaction.type}>
          {transaction.type.toUpperCase()}
        </span>
      </td>
      <td>{transaction.quantity}</td>
      <td>{transaction.triggerPrice}</td>
    </>
  );
}
