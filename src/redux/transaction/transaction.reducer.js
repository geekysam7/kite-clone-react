import produce from "immer";
import { TransactionActionTypes } from "./transaction.types";

//transactions will contain a status property to filter pending/completed
const INITIAL_STATE = {
  formCoordinates: null,
  transactions: {},
  transactionsById: [],
  isTransactionModalOpen: false,
};

const transactionReducer = (state = INITIAL_STATE, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case TransactionActionTypes.TOGGLE_TRANSACTION_FORM:
        draft.isTransactionModalOpen = !draft.isTransactionModalOpen;
        break;
      case TransactionActionTypes.BUY_STOCK:
        draft.transactions[payload.id] = { ...payload, status: "pending" };
        draft.transactionsById.unshift(payload.id);
        break;
      case TransactionActionTypes.SELL_STOCK:
        draft.transactions[payload.id] = { ...payload, status: "pending" };
        draft.transactionsById.unshift(payload.id);
        break;
      case TransactionActionTypes.CANCEL_PENDING_TRANSACTION:
        delete draft.transactions[payload.transaction.id];
        draft.transactionsById = draft.transactionsById.filter(
          (instrument) => instrument !== payload.transaction.id
        );
        break;
      case TransactionActionTypes.HANDLE_COMPLETED_TRANSACTION:
        draft.transactions[payload.transaction.id].status = "completed";
        break;
      default:
        break;
    }
  });
};

export default transactionReducer;
