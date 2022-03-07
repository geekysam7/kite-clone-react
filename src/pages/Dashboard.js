import React, { useContext } from "react";
import { UserContext } from "../App";
import { portfolioHeaders, transactionHeaders } from "../utils/headers";
import Table from "../components/Table/Table";
import TransactionRow from "../components/Table/TransactionRow";

function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div className="dashboard">
      <div className="page-content--transactions">
        <div className="greeting">Hi, {user.userName}</div>
        <div className="heading">Completed Transactions</div>
        <Table
          headings={transactionHeaders}
          rows={user.completedTransactions}
          Row={TransactionRow}
        />
        <div className="heading">Pending Transactions</div>
        <Table
          headings={transactionHeaders}
          rows={user.pendingTransactions}
          Row={TransactionRow}
        />
      </div>
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
    </div>
  );
}

export default Dashboard;
