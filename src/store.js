import { flattenArray, floatParser } from "./utils/functions";

function reducer(state, action) {
  let payload = action.payload;

  console.log(action);

  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "buy":
      if (
        state.userBalance.margin >=
        payload.quantity * floatParser(payload.triggerPrice)
      ) {
        state.pendingTransactions.push({
          ...payload,
          timestamp: new Date().getTime(),
        });

        state.userBalance = {
          ...state.userBalance,
          margin:
            state.userBalance.margin -
            payload.quantity * floatParser(payload.triggerPrice),
          investment:
            state.userBalance.investment +
            Number(payload.quantity) * floatParser(payload.triggerPrice),
        };
      }
      return { ...state };
    case "sell":
      if (
        state.userStocks[payload.symbol] &&
        state.userStocks[payload.symbol].quantity >= payload.quantity
      ) {
        //stocks can be sold.
        state.pendingTransactions.push({
          ...payload,
          timestamp: new Date().getTime(),
        });
      }
      return { ...state };
    case "evaluate-pending-transactions":
      let flattenPendingTransaction = flattenArray(state.pendingTransactions);
      let pendingTransactions = [];
      let completedTransactions = [];

      const nifty50 = flattenArray(payload.data);
      console.log(flattenPendingTransaction);
      state.pendingTransactions.forEach((transaction) => {
        let currentTransaction = nifty50[transaction.symbol];

        if (currentTransaction) {
          if (
            transaction.type === "buy" &&
            floatParser(transaction.triggerPrice) >= currentTransaction.ltP
          ) {
            completedTransactions.push(transaction);

            let currentInstrumentState = {};
            let previousInstrumentState = state.userStocks[transaction.symbol];
            if (previousInstrumentState) {
              let quantity =
                Number(previousInstrumentState.quantity) +
                Number(transaction.quantity);

              currentInstrumentState = {
                quantity,
                average: Number(
                  (previousInstrumentState.average *
                    previousInstrumentState.quantity +
                    transaction.triggerPrice * transaction.quantity) /
                    quantity
                ).toFixed(2),
                symbol: transaction.symbol,
              };
            } else {
              currentInstrumentState = {
                quantity: transaction.quantity,
                average: transaction.triggerPrice,
                symbol: transaction.symbol,
              };
            }

            state.userStocks[transaction.symbol] = currentInstrumentState;
          } else if (
            transaction.type === "sell" &&
            floatParser(transaction.triggerPrice) <= currentTransaction.ltP
          ) {
            completedTransactions.push(transaction);

            let currentInstrumentState = null;
            let previousInstrumentState = state.userStocks[transaction.symbol]; //guaranteed to be present.

            if (previousInstrumentState) {
              //handle margin

              let quantity =
                Number(previousInstrumentState.quantity) -
                Number(transaction.quantity);

              if (quantity === 0) {
                currentInstrumentState = null;
              } else {
                currentInstrumentState = {
                  quantity,
                  average: previousInstrumentState.average,
                  symbol: transaction.symbol,
                };
              }

              let sellingPrice =
                Number(transaction.quantity) *
                floatParser(transaction.triggerPrice);

              state.userBalance = {
                ...state.userBalance,
                margin: state.userBalance.margin + sellingPrice,
                investment:
                  state.userBalance.investment - sellingPrice > 0
                    ? state.userBalance.investment - sellingPrice
                    : 0,
              };

              if (currentInstrumentState) {
                state.userStocks[transaction.symbol] = currentInstrumentState;
              } else {
                delete state.userStocks[transaction.symbol];
              }
            }
          } else {
            pendingTransactions.push(transaction);
          }
        }
      });

      state.pendingTransactions = pendingTransactions;
      state.completedTransactions = [
        ...state.completedTransactions,
        ...completedTransactions,
      ];

      return { ...state };
    default:
      throw new Error();
  }
}

export default reducer;
