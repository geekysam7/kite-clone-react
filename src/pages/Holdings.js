import React from "react";
import { useSelector } from "react-redux";
import { Table } from "../components";
import PortfolioRow from "../components/Table/PortfolioRow";
import { portfolioHeaders } from "../utils/headers";

function Holdings() {
  const { balance, portfolioStocks, portfolioStocksById } = useSelector(
    (state) => state.user
  );

  console.log(balance);

  let investment = portfolioStocksById.reduce(
    (acc, item) =>
      Number(portfolioStocks[item].avgPrice) * portfolioStocks[item].quantity +
      acc,
    0
  );

  investment = investment ? investment.toFixed(2) : "0";

  return (
    <div className="page-content--portfolio">
      <div className="greeting">Portfolio</div>
      <div className="heading">
        <span className="margin">
          Available Margin : ₹{balance.withdrawableBalance.toFixed(2)}
        </span>
        <span style={{ paddingLeft: "10px" }} className="investment">
          Investment : ₹{investment}
        </span>
      </div>
      <div className="portfolio">
        <Table
          headings={portfolioHeaders}
          rows={portfolioStocksById}
          Row={PortfolioRow}
        />
      </div>
    </div>
  );
}

export default Holdings;
