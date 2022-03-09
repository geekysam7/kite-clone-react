import { produce } from "immer";
import { TransactionActionTypes } from "../transaction/transaction.types";
import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null, // userName, userId.
  balance: {
    margin: 10000,
  },
  portfolioStocks: {},
  portfolioStocksById: [],
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case UserActionTypes.SET_CURRENT_USER:
        if (payload.currentUser) {
          draft.currentUser = payload.currentUser;
        }
        if (payload.balance) {
          draft.balance = payload.balance;
        }
        break;
      case UserActionTypes.ADD_BALANCE:
        draft.balance.margin += payload;
        break;
      case UserActionTypes.WITHDRAW_BALANCE:
        if (draft.balance.margin >= payload) draft.balance.margin -= payload;
        break;
      case TransactionActionTypes.BUY_STOCK:
        let totalPrice = payload.quantity * payload.parsedTriggerPrice;
        if (draft.balance.margin >= totalPrice) {
          draft.balance.margin -= totalPrice;
        }
        break;
      case TransactionActionTypes.CANCEL_PENDING_TRANSACTION:
        if (payload.transaction.type === "buy") {
          //add funds back.
          let totalPrice =
            payload.transaction.parsedTriggerPrice * payload.quantity;
          draft.balance.margin += totalPrice;
        }
        break;
      case TransactionActionTypes.HANDLE_COMPLETED_TRANSACTION:
        //if a sell transaction is completed we need to update margin, investment.
        if (payload.transaction.type === "sell") {
          let totalPrice =
            payload.transaction.parsedTriggerPrice *
            payload.transaction.quantity;
          draft.balance.margin += totalPrice;

          let quantity =
            draft.portfolioStocks[payload.transaction.instrumentId].quantity;

          if (quantity - payload.transaction.quantity === 0) {
            delete draft.portfolioStocks[payload.transaction.instrumentId];
            draft.portfolioStocksById = draft.portfolioStocksById.filter(
              (instrument) => instrument !== payload.transaction.instrumentId
            );
          } else {
            draft.portfolioStocks[payload.transaction.instrumentId].quantity -=
              payload.transaction.quantity;
          }
        }

        //add stock to portfolio.
        if (payload.transaction.type === "buy") {
          console.log(payload.transaction);

          let isStockInPortfolio =
            draft.portfolioStocks[payload.transaction.instrumentId];
          if (isStockInPortfolio) {
            draft.portfolioStocks[payload.transaction.instrumentId] = {
              ...isStockInPortfolio,
              quantity:
                isStockInPortfolio.quantity + payload.transaction.quantity,
              avgPrice: Number(
                (isStockInPortfolio.avgPrice * isStockInPortfolio.quantity +
                  payload.transaction.parsedTriggerPrice *
                    payload.transaction.quantity) /
                  (isStockInPortfolio.quantity + payload.transaction.quantity)
              ).toFixed(2),
            };
          } else {
            draft.portfolioStocks[payload.transaction.instrumentId] = {
              symbol: payload.transaction.symbol,
              quantity: payload.transaction.quantity,
              avgPrice: payload.transaction.parsedTriggerPrice,
            };

            draft.portfolioStocksById.push(payload.transaction.instrumentId);
          }
        }

        break;
      default:
        break;
    }
  });
};

export default userReducer;
