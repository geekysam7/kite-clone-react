import { WatchlistActionTypes } from "./watchlist.types";

export const setWatchlist = (watchlist) => ({
  type: WatchlistActionTypes.SET_WATCHLIST,
  payload: watchlist,
});

export const addItemToWatchlist = (item) => ({
  type: WatchlistActionTypes.ADD_ITEM,
  payload: item,
});

export const setSelectedWatchlist = (id) => ({
  type: WatchlistActionTypes.SET_SELECTED_WATCHLIST,
  payload: id,
});
