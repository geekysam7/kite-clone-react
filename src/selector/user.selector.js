import { createSelector } from "reselect";

const selectUser = (state) => state.user;

const selectPortfolioStocks = (state) => state.user.portfolioStocks;
const selectPortfolioStocksById = (state) => state.user.portfolioStocksById;

//createSelector produces memoized selector function.

//NOTE: Create multiple instances if using same selector in multiple areas as caching depth is only 1.
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectPortfolioStocksMapped = createSelector(
  [selectPortfolioStocks, selectPortfolioStocksById],
  (portfolioStocks, portfolioStocksById) =>
    portfolioStocksById.map((id) => portfolioStocks[id])
);

export const selectUserInvestment = createSelector(
  [selectPortfolioStocks, selectPortfolioStocksById],
  (portfolioStocks, portfolioStocksById) =>
    portfolioStocksById.reduce(
      (acc, item) =>
        Number(portfolioStocks[item].avgPrice) *
          portfolioStocks[item].quantity +
        acc,
      0
    )
);
