import React, { useContext } from "react";
import { UserContext } from "../App";
import { transactionHeaders } from "../utils/headers";
import Table from "../components/Table/Table";
import TransactionRow from "../components/Table/TransactionRow";

function Dashboard() {
  const { user } = useContext(UserContext);

  return (
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
  );
}

export default Dashboard;
