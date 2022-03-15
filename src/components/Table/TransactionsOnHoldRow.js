import React from "react";
import { useDispatch } from "react-redux";

import { cancelPendingTransaction } from "action/transaction.action";
import { transactionConstants } from "utils/constants";

export default function TransactionsOnHoldRow({ row: transaction }) {
  //imitate a api call
  const dispatch = useDispatch();

  const handleCanceledTransaction = () => {
    if (transaction.status !== transactionConstants.COMPLETED.label) {
      dispatch(cancelPendingTransaction(transaction));
    }
  };

  return (
    <>
      <td>{transaction.symbol}</td>
      <td>{transaction.holdQuantity}</td>
      <td>
        <button
          className="marketwatch-button marketwatch-button--sell"
          onClick={handleCanceledTransaction}
        >
          C
        </button>
      </td>
    </>
  );
}
