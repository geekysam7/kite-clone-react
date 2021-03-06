import { v4 } from "uuid";
import { TransactionActionTypes } from "../types/transaction.types";

//each transaction will have it's unique id => helps when changing transaction state.

export const buyInstrument = (instrument) => ({
  type: TransactionActionTypes.BUY_STOCK,
  payload: {
    id: v4(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    ...instrument,
    parsedTriggerPrice: instrument.triggerPrice,
  },
});

export const sellInstrument = (instrument) => ({
  type: TransactionActionTypes.SELL_STOCK,
  payload: {
    id: v4(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    ...instrument,
    parsedTriggerPrice: instrument.triggerPrice,
  },
});

export const cancelPendingTransaction = (transaction) => ({
  type: TransactionActionTypes.CANCEL_PENDING_TRANSACTION,
  payload: {
    transaction,
  },
});

export const handleModifiedTransaction = (transaction) => ({
  type: TransactionActionTypes.MODIFY_TRANSACTION,
  payload: {
    transaction: {
      ...transaction.current,
      updatedAt: new Date().getTime(),
    },
    previousTransaction: transaction.previous,
  },
});

export const handleCompletedTransactions = (transaction) => ({
  type: TransactionActionTypes.HANDLE_COMPLETED_TRANSACTION,
  payload: {
    transaction,
    updatedAt: new Date().getTime(),
  },
});
