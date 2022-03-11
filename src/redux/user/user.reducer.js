import { produce } from "immer";
import { TransactionActionTypes } from "../transaction/transaction.types";
import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null, // userName, userId.
  balance: {
    margin: 10000,
    withdrawableBalance: 10000, //keep a track for better ux.
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
        draft.balance.withdrawableBalance += payload;
        break;
      case UserActionTypes.WITHDRAW_BALANCE:
        if (draft.balance.withdrawableBalance >= payload) {
          draft.balance.margin -= payload; //instantly affects margin.
          draft.balance.withdrawableBalance -= payload;
        }
        break;
      case TransactionActionTypes.BUY_STOCK:
        let totalPrice = payload.quantity * payload.parsedTriggerPrice;
        if (draft.balance.withdrawableBalance - totalPrice >= 0) {
          draft.balance.withdrawableBalance -= totalPrice;
        }
        break;
      case TransactionActionTypes.SELL_STOCK:
        //place stock quantity on hold.
        //compute quantity - holdQuantity when doing transaction.
        //showing 0 is valid until transaction is completed/reverted.

        if (
          payload.quantity &&
          draft.portfolioStocks[payload.instrumentId].quantity -
            draft.portfolioStocks[payload.instrumentId].holdQuantity >=
            payload.quantity
        ) {
          //place stock on hold.
          draft.portfolioStocks[payload.instrumentId].holdQuantity +=
            payload.quantity;
        }
        break;
      case TransactionActionTypes.CANCEL_PENDING_TRANSACTION:
        if (payload.transaction.type === "buy") {
          //add funds back.
          let totalPrice =
            payload.transaction.parsedTriggerPrice *
            payload.transaction.quantity;
          draft.balance.withdrawableBalance += totalPrice;
        }

        //add quantity back.
        if (payload.transaction.type === "sell") {
          draft.portfolioStocks[
            payload.transaction.instrumentId
          ].holdQuantity -= payload.transaction.quantity;
        }
        break;
      case TransactionActionTypes.MODIFY_TRANSACTION:
        //add unutilised funds back for buy
        if (payload.transaction.type === "buy") {
          let oldPrice =
            payload.previousTransaction.parsedTriggerPrice *
            payload.previousTransaction.quantity;
          let currentPrice =
            payload.transaction.parsedTriggerPrice *
            payload.transaction.quantity;

          console.log(oldPrice, currentPrice);

          if (
            draft.balance.withdrawableBalance + oldPrice - currentPrice >=
            0
          ) {
            draft.balance.withdrawableBalance += oldPrice - currentPrice;
          }
        }

        if (payload.transaction.type === "sell") {
          // modify stocks from portfolio.
          let previousQuantity = payload.previousTransaction.quantity;
          let currentQuantity = payload.transaction.quantity;

          if (
            draft.portfolioStocks[payload.transaction.instrumentId].quantity -
              draft.portfolioStocks[payload.transaction.instrumentId]
                .holdQuantity +
              currentQuantity -
              previousQuantity >=
            0
          ) {
            draft.portfolioStocks[
              payload.transaction.instrumentId
            ].holdQuantity += currentQuantity - previousQuantity;
          }
        }
        //add stock back to portfolio for sell
        break;
      case TransactionActionTypes.HANDLE_COMPLETED_TRANSACTION:
        //if a sell transaction is completed we need to update margin, and holdQuantity.
        if (payload.transaction.type === "sell") {
          let totalPrice =
            payload.transaction.parsedTriggerPrice *
            payload.transaction.quantity;
          draft.balance.margin += totalPrice;
          draft.balance.withdrawableBalance += totalPrice;

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

            draft.portfolioStocks[
              payload.transaction.instrumentId
            ].holdQuantity -= payload.transaction.quantity;
          }
        }

        //add stock to portfolio and update margin.
        if (payload.transaction.type === "buy") {
          console.log(payload.transaction);

          //transaction completed => we can update margin.
          draft.balance.margin -=
            payload.transaction.parsedTriggerPrice *
            payload.transaction.quantity;

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
              holdQuantity: 0,
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
