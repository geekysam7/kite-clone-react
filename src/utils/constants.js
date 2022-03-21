export const appConstants = Object.freeze({
  WATCHLIST: {
    label: "WATCHLIST",
    mapping: "Watchlist",
  },
  TRANSACTION: { label: "TRANSACTION", mapping: "Transaction" },
  FUNDS: { label: "FUNDS", mapping: "Funds" },
  EDIT_WATCHLIST: {
    label: "EDIT_WATCHLIST",
    mapping: "Edit Watchlist",
  },
  INSTRUMENT: {
    label: "INSTRUMENT",
    mapping: "INSTRUMENT",
  },
});

//transaction.constants.js
export const transactionConstants = Object.freeze({
  BUY: { label: "BUY", mapping: "Buy" },
  SELL: { label: "SELL", mapping: "Sell" },
  COMPLETED: { label: "COMPLETED", mapping: "Completed" },
  PENDING: { label: "PENDING", mapping: "Pending" },
  CANCELLED: { label: "CANCELLED", mapping: "Cancelled" },
  EXECUTED: { label: "EXECUTED", mapping: "Executed" },
});
