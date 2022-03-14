import React from "react";
import { useSelector } from "react-redux";
import { Table } from "..";
import { transactionsOnHoldHeaders } from "../../utils/headers";
import TransactionsOnHoldRow from "./TransactionsOnHoldRow";

function TransactionsOnHold() {
  const { portfolioStocksOnHold, portfolioStocksOnHoldById } = useSelector(
    (state) => state.user
  );

  const transactions = useSelector((state) => state.transactions.transactions);

  const market = useSelector((state) => state.market.market);

  let transactionsOnHold = portfolioStocksOnHoldById.map((stockId) => {
    let holdQ = portfolioStocksOnHold[stockId].holdQuantity;
    return {
      ...portfolioStocksOnHold[stockId],
      symbol: market[portfolioStocksOnHold[stockId].instrumentId].symbol,
      status: transactions[stockId].status,
      type: transactions[stockId].type,
      quantity: holdQ,
    };
  });

  console.log(transactionsOnHold);

  return (
    <>
      <div className="heading">Transactions on hold</div>
      <div className="portfolio">
        <Table
          headings={transactionsOnHoldHeaders}
          rows={transactionsOnHold}
          Row={TransactionsOnHoldRow}
        />
      </div>
    </>
  );
}

export default TransactionsOnHold;
