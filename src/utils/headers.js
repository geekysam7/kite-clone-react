const transactionHeaders = [
  { label: "Symbol", value: "symbol" },
  { label: "Time", value: "timestamp" },
  { label: "Type", value: "type" },
  { label: "Qty.", value: "quantity" },
  { label: "Price", value: "triggerPrice" },
  { label: "Status", value: "completionType" },
];

const pendingTransactionHeaders = [
  { label: "Symbol", value: "symbol" },
  { label: "Time", value: "timestamp" },
  { label: "Type", value: "type" },
  { label: "Qty.", value: "quantity" },
  { label: "Price", value: "triggerPrice" },
  { label: "Action", value: "action" },
];

const portfolioHeaders = [
  { label: "Symbol", value: "symbol" },
  { label: "Qty.", value: "quantity" },
  { label: "Average", value: "average" },
  { label: "Total", value: "total" },
  { label: "Current Value", value: "currentValue" },
  { label: "Action", value: "action" },
];

const transactionsOnHoldHeaders = [
  { label: "Symbol", value: "symbol" },
  { label: "Hold Qty.", value: "holdQuantity" },
  { label: "Action", value: "action" },
];

export {
  transactionHeaders,
  portfolioHeaders,
  pendingTransactionHeaders,
  transactionsOnHoldHeaders,
};
