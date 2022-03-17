import produce from "immer";
import { UistateTypes } from "types";

const INITIAL_STATE = {
  modalTypeOpen: "",
  modalState: {},
  transactionWindowCoordinates: {}, // x, y
  isTransactionWindowOpen: false,
  transactionState: {}, //currentTransaction, previousTransaction.
};

export const uistateReducer = (state = INITIAL_STATE, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case UistateTypes.TOGGLE_MODAL_TYPE:
        draft.modalTypeOpen = payload || "";

        if (!payload) draft.modalState = {}; //empty any state set when modal was open
        break;
      case UistateTypes.SET_TRANSACTION_STATE:
        //no current value implies set transaction state to default.
        if (payload.current) {
          draft.isTransactionWindowOpen = true;
          draft.transactionState = payload;
        } else {
          draft.isTransactionWindowOpen = false;
          draft.transactionState = {};
        }
        break;
      case UistateTypes.SET_MODAL_STATE:
        draft.modalState = payload;
        break;
      default:
        break;
    }
  });
};
