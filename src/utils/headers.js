const transactionHeaders = [
  { label: "Symbol", value: "symbol" },
  { label: "Time", value: "timestamp" },
  { label: "Type", value: "type" },
  { label: "Qty.", value: "quantity" },
  { label: "Price", value: "triggerPrice" },
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
  { label: "Action", value: "action" },
];

export { transactionHeaders, portfolioHeaders, pendingTransactionHeaders };
