import React from "react";
import { useDispatch } from "react-redux";

import { setTransactionState } from "action/uistate.action";
import { transactionConstants } from "utils/constants";

export default function PortfolioRow({ row: transaction }) {
  //imitate a api call
  const dispatch = useDispatch();

  let current = (transaction.currentValue - transaction.total).toFixed(2) + "";

  let currentTextColor = current.startsWith("-") ? "text-red" : "text-green";

  return (
    <>
      <td>{transaction.symbol}</td>
      <td>{transaction.quantity}</td>
      <td>{transaction.avgPrice}</td>
      <td>{transaction.total}</td>
      <td className={currentTextColor}>{current}</td>
      <td>
        <button
          className="marketwatch-button marketwatch-button--sell"
          onClick={() => {
            dispatch(
              setTransactionState({
                current: {
                  instrumentId: transaction.id,
                  type: transactionConstants.SELL.label,
                  symbol: transaction.symbol,
                  quantity: transaction.quantity,
                  avgPrice: transaction.avgPrice,
                },
              })
            );
          }}
        >
          S
        </button>
      </td>
    </>
  );
}
