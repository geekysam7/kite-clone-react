import { TransactionActionTypes } from "./transaction.types";

const INITIAL_STATE = {
  formCoordinates: null,
};

const transactionReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TransactionActionTypes.BUY_STOCK:
      return {
        ...state,
        buyStock: payload,
      };
    default:
      return state;
  }
};

export default transactionReducer;
