import React from "react";
import { useSelector } from "react-redux";
import { transactionConstants } from "../../utils/constants";

export default function TransactionRow({ row: { id: transactionId } }) {
  const transactions = useSelector((state) => state.transactions.transactions);

  const transaction = transactions[transactionId];
  let d = new Date(transaction.createdAt);
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
        <span className={transaction.type.toLowerCase()}>
          {transaction.type}
        </span>
      </td>
      <td>{transaction.quantity}</td>
      <td>{transaction.parsedTriggerPrice}</td>
      <td>{transactionConstants[transaction.completionType].mapping}</td>
    </>
  );
}
