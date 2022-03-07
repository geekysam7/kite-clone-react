import { MarketActionTypes } from "./market.types";

const INITIAL_STATE = {
  market: null,
};

const marketReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MarketActionTypes.SET_MARKET_DATA:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};

export default marketReducer;
