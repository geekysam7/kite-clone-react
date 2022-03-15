import { createSelector } from "reselect";

const selectMarket = (state) => state.market;

//createSelector produces memoized selector function.

//NOTE: Create multiple instances if using same selector in multiple areas as caching depth is only 1.
export const selectMarketData = createSelector(
  [selectMarket],
  (market) => market.data
);
