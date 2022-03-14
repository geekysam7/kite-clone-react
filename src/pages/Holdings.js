import React from "react";
import { useSelector } from "react-redux";
import { Table } from "../components";
import PortfolioRow from "../components/Table/PortfolioRow";
import TransactionsOnHold from "../components/Table/TransactionsOnHold";
import { selectUserInvestment } from "../redux/user/user.selector";
import { floatParser } from "../utils/functions";
import { portfolioHeaders } from "../utils/headers";

function Holdings() {
  const withdrawableBalance = useSelector(
    (state) => state.user.balance.withdrawableBalance
  );

  const { portfolioStocks, portfolioStocksById } = useSelector(
    (state) => state.user
  );

  const market = useSelector((state) => state.market.market);

  let investment = useSelector(selectUserInvestment);
  let portfolioStocksWithCurrentValue = portfolioStocksById.map((stockId) => {
    let quantity = portfolioStocks[stockId].quantity;
    let avgPrice = portfolioStocks[stockId].avgPrice;

    return {
      ...portfolioStocks[stockId],
      currentValue: (floatParser(market[stockId].ltP) * quantity).toFixed(2),
      total: (avgPrice * quantity).toFixed(2),
    };
  });

  investment = investment ? investment.toFixed(2) : "0";

  return (
    <div className="page-content--portfolio">
      <div className="greeting">Portfolio</div>
      <div className="heading">
        <span className="margin">
          Available Margin : ₹{withdrawableBalance}
        </span>
        <span style={{ paddingLeft: "10px" }} className="investment">
          Investment : ₹{investment}
        </span>
      </div>
      <div className="portfolio">
        <Table
          headings={portfolioHeaders}
          rows={portfolioStocksWithCurrentValue}
          Row={PortfolioRow}
        />
      </div>
      <TransactionsOnHold />
    </div>
  );
}

export default Holdings;
