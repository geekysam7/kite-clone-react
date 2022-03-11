import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const addBalance = (balance) => ({
  type: UserActionTypes.ADD_BALANCE,
  payload: balance,
});

export const withdrawBalance = (balance) => ({
  type: UserActionTypes.WITHDRAW_BALANCE,
  payload: balance,
});
