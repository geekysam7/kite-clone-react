import React, { useContext } from "react";
import { UserContext } from "../App";
import { Table } from "../components";
import { portfolioHeaders } from "../utils/headers";

function Holdings() {
  const { user } = useContext(UserContext);

  return (
    <div className="page-content--portfolio">
      <div className="greeting">Portfolio</div>
      <div className="heading">
        <span className="margin">
          Margin : ₹{user.userBalance.margin.toFixed(2)}
        </span>
        <span style={{ paddingLeft: "10px" }} className="investment">
          Investment : ₹{user.userBalance.investment.toFixed(2)}
        </span>
      </div>
      <div className="portfolio">
        <Table
          headings={portfolioHeaders}
          rows={Object.keys(user.userStocks).map((transaction) => {
            return user.userStocks[transaction];
          })}
        />
      </div>
    </div>
  );
}

export default Holdings;
