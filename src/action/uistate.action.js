import { UistateTypes } from "../types/uistate.types";

export const setModalType = (type) => ({
  type: UistateTypes.TOGGLE_MODAL_TYPE,
  payload: type,
});

export const setTransactionState = (transaction = {}) => ({
  type: UistateTypes.SET_TRANSACTION_STATE,
  payload: {
    isModified: transaction.isModified,
    current: transaction.current,
    previous: transaction.previous,
  },
});
