import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelPendingTransaction } from "../../redux/transaction/transaction.action";
import { setTransactionState } from "../../redux/uistate/uistate.action";
import { transactionConstants } from "../../utils/constants";

export default function PendingTransactionRow({ row: { id: transactionId } }) {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions); //reading latest transaction state.

  const transaction = transactions[transactionId];

  let d = new Date(transaction.createdAt);
  let time = d.toLocaleTimeString();
  let date = d.toLocaleDateString();

  const handleCanceledTransaction = () => {
    if (transaction.status !== transactionConstants.COMPLETED.label) {
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
