import React from "react";
import { useSelector } from "react-redux";
import {
  pendingTransactionHeaders,
  transactionHeaders,
} from "../utils/headers";
import Table from "../components/Table/Table";
import TransactionRow from "../components/Table/TransactionRow";
import PendingTransactionRow from "../components/Table/PendingTransactionRow";

function Dashboard() {
  const user = useSelector((state) => state.user.currentUser);
  const { transactionsById, transactions } = useSelector(
    (state) => state.transactions
  );

  const pendingTransactions = transactionsById.filter(
    (item) => transactions[item].status === "pending"
  );
  const completedTransactions = transactionsById.filter(
    (item) => transactions[item].status === "completed"
  );

  return (
    <div className="page-content--transactions">
      <div className="greeting">Hi, {user.userName}</div>
      <div className="heading">Completed Transactions</div>
      <Table
        headings={transactionHeaders}
        rows={completedTransactions}
        Row={TransactionRow}
      />
      <div className="heading">Pending Transactions</div>
      <Table
        headings={pendingTransactionHeaders}
        rows={pendingTransactions}
        Row={PendingTransactionRow}
      />
    </div>
  );
}

export default Dashboard;
