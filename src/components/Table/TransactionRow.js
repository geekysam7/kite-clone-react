import React from "react";

export default function TransactionRow({ row: transaction }) {
  let d = new Date(transaction.timestamp);
  let time = d.toLocaleTimeString();
  let date = d.toLocaleDateString();

  return (
    <>
      <td>{transaction.symbol}</td>
      <td>
        <span class="date">{date}</span>
        <span class="time">{time}</span>
      </td>
      <td>
        <span class={transaction.type}>{transaction.type.toUpperCase()}</span>
      </td>
      <td>{transaction.quantity}</td>
      <td>{transaction.triggerPrice}</td>
    </>
  );
}
