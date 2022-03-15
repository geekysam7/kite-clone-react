import { createSelector } from "reselect";
import { sortAlphabetically } from "utils/general.utils";

const selectWatchlist = (state) => state.watchlist;
const selectWatchlistId = (state, itemId) => itemId;
const selectSortingToggle = (state, itemId, toggle) => state.toggle;

export const selectWatchlistId = createSelector(
  [selectWatchlist, selectWatchlistId],
  (watchlist, watchlistId) => watchlist[watchlistId]
);

export const selectAlphabeticallySortedWatchlistId = createSelector(
  [selectWatchlistId, selectSortingToggle],
  (watchlist, toggle) =>
    watchlist.sort((a, b) => sortAlphabetically("name", toggle)(a, b))
);
