import { createSelector } from "reselect";

const selectTransactions = (state) => state.transaction.transactions;
const selectTransactionStatus = (_, status) => status;

export const selectTransactions = createSelector(
  [selectTransactions, selectTransactionStatus],
  (transactions, status) =>
    transactions.filter((transaction) => transaction.status === status)
);
