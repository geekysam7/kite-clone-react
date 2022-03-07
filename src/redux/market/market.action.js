import { MarketActionTypes } from "./market.types";

export const setMarketData = (market) => ({
  type: MarketActionTypes.SET_MARKET_DATA,
  payload: market,
});
