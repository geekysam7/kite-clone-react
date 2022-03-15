import produce from "immer";
import { marketData } from "../data/market.data";
import { MarketActionTypes } from "types";

const INITIAL_STATE = {
  market: {},
  marketById: [],
  data: marketData, //not normalized, imitating backend api call.
};

export const marketReducer = (state = INITIAL_STATE, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case MarketActionTypes.SET_MARKET_DATA:
        if (payload) draft.data = payload;

        let market = {};
        let marketById = [];

        draft.data.forEach((instrument) => {
          market[instrument.id] = instrument;
          marketById.push(instrument.id);
        });

        draft.market = market;
        draft.marketById = marketById;
        break;
      default:
        break;
    }
  });
};
