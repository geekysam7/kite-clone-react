import React from "react";
import { useSelector } from "react-redux";

import {
  pendingTransactionHeaders,
  transactionHeaders,
} from "./Dashboard.constants";

import { PendingTransactionRow, Table, TransactionRow } from "components";
import { transactionConstants } from "utils/constants";

export default function Dashboard() {
  const user = useSelector((state) => state.user.currentUser);
  const { transactionsById, transactions } = useSelector(
    (state) => state.transactions
  );

  const pendingTransactions = transactionsById.reduce(
    (pending, instrumentId) => {
      if (
        transactions[instrumentId].status === transactionConstants.PENDING.label
      ) {
        return [...pending, transactions[instrumentId]];
      }
      return pending;
    },
    []
  );

  const completedTransactions = transactionsById.reduce(
    (completed, instrumentId) => {
      if (
        transactions[instrumentId].status ===
        transactionConstants.COMPLETED.label
      ) {
        return [...completed, transactions[instrumentId]];
      }
      return completed;
    },
    []
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
