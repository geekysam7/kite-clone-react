import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelPendingTransaction } from "../../redux/transaction/transaction.action";
import { setTransactionState } from "../../redux/uistate/uistate.action";

export default function PendingTransactionRow({ row: transactionId }) {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);

  const transaction = transactions[transactionId];

  if (!transaction) return null;

  let d = new Date(transaction.createdAt);
  let time = d.toLocaleTimeString();
  let date = d.toLocaleDateString();

  const handleCanceledTransaction = () => {
    if (transaction.status !== "completed") {
      dispatch(cancelPendingTransaction(transaction));
    }
  };

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
      <td>{transaction.parsedTriggerPrice}</td>
      <td>
        <div className="flex-row">
          <button
            className="marketwatch-button marketwatch-button--sell"
            onClick={handleCanceledTransaction}
          >
            C
          </button>
          <button
            className="marketwatch-button marketwatch-button--modify"
            onClick={() =>
              dispatch(
                setTransactionState({
                  isModified: true,
                  current: transaction,
                  previous: transaction,
                })
              )
            }
          >
            M
          </button>
        </div>
      </td>
    </>
  );
}
