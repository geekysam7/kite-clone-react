import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransactionState } from "../../redux/uistate/uistate.action";

export default function PortfolioRow({ row: transactionId }) {
  const { portfolioStocks } = useSelector((state) => state.user);

  //imitate a api call
  const dispatch = useDispatch();

  const transaction = portfolioStocks[transactionId] || {};

  if (!transaction) return null;

  return (
    <>
      <td>{transaction.symbol}</td>
      <td>{transaction.quantity}</td>
      <td>{transaction.avgPrice}</td>
      <td>
        <button
          className="marketwatch-button marketwatch-button--sell"
          onClick={() => {
            dispatch(
              setTransactionState({
                current: {
                  instrumentId: transactionId,
                  type: "sell",
                  symbol: transaction.symbol,
                  quantity: transaction.quantity,
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
