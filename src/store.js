import { flattenArray, floatParser } from "./utils/functions";

function reducer(state, action) {
  let { type, payload } = action;

  // console.log(action);

  switch (type) {
    case "login":
      return { ...state, userName: payload.userName, user: true };
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "buy":
      if (
        state.userBalance.margin >=
        payload.quantity * floatParser(payload.triggerPrice)
      ) {
        const pendingTransactions = [
          ...state.pendingTransactions,
          {
            ...payload,
            timestamp: new Date().getTime(),
          },
        ];

        const userBalance = {
          ...state.userBalance,
          margin:
            state.userBalance.margin -
            payload.quantity * floatParser(payload.triggerPrice),
          investment:
            state.userBalance.investment +
            Number(payload.quantity) * floatParser(payload.triggerPrice),
        };

        return { ...state, pendingTransactions, userBalance };
      }
      return state;
    case "sell":
      if (
        state.userStocks[payload.symbol] &&
        state.userStocks[payload.symbol].quantity >= payload.quantity
      ) {
        //stocks can be sold.

        const pendingTransactions = [
          ...state.pendingTransactions,
          {
            ...payload,
            timestamp: new Date().getTime(),
          },
        ];

        return { ...state, pendingTransactions };
      }
      return state;
    case "evaluate-pending-transactions":
      let pendingTransactions = [];
      let completedTransactions = [];

      let userBalance = { ...state.userBalance };
      let userStocks = { ...state.userStocks };

      const nifty50 = flattenArray(payload.data);

      state.pendingTransactions.forEach((transaction) => {
        let currentTransaction = nifty50[transaction.symbol];

        if (currentTransaction) {
          if (
            transaction.type === "buy" &&
            floatParser(transaction.triggerPrice) >= currentTransaction.ltP
          ) {
            completedTransactions.push(transaction);

            let currentInstrumentState = {};
            let previousInstrumentState = userStocks[transaction.symbol];
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

            userStocks[transaction.symbol] = currentInstrumentState;
          } else if (
            transaction.type === "sell" &&
            floatParser(transaction.triggerPrice) <= currentTransaction.ltP
          ) {
            completedTransactions.push(transaction);

            let currentInstrumentState = null;
            let previousInstrumentState = userStocks[transaction.symbol]; //guaranteed to be present.

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

              userBalance = {
                ...userBalance,
                margin: userBalance.margin + sellingPrice,
                investment:
                  userBalance.investment - sellingPrice > 0
                    ? userBalance.investment - sellingPrice
                    : 0,
              };

              if (currentInstrumentState) {
                userStocks[transaction.symbol] = currentInstrumentState;
              } else {
                delete userStocks[transaction.symbol];
              }
            }
          } else {
            pendingTransactions.push(transaction);
          }
        }
      });

      console.log("PENDING", pendingTransactions);
      console.log("COMPLETED", completedTransactions);

      completedTransactions = [
        ...state.completedTransactions,
        ...completedTransactions,
      ];

      return {
        ...state,
        pendingTransactions,
        completedTransactions,
        userBalance,
        userStocks,
      };
    default:
      throw new Error();
  }
}

export default reducer;
