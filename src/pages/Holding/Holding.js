import React from "react";
import { useSelector } from "react-redux";

import { portfolioHeaders } from "./Holding.constants";

import { PortfolioRow, Table, TransactionsOnHold } from "components";
import { selectUserInvestment } from "selector/user.selector";
import { floatParser } from "utils/general.utils";

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
    <div className="holding">
      <div className="page-content--portfolio">
        <div className="greeting">Portfolio</div>
        <div className="heading">
          <span className="margin">
            Available Margin : ₹{withdrawableBalance.toFixed(2)}
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
    </div>
  );
}

export default Holdings;
