import { MarketActionTypes } from "../types/market.types";

export const setMarketData = (market) => ({
  type: MarketActionTypes.SET_MARKET_DATA,
  payload: market,
});
