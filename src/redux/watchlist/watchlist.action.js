import { v4 } from "uuid";
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

export const removeSelectedWatchlistItem = (item) => ({
  type: WatchlistActionTypes.REMOVE_ITEM,
  payload: item,
});

export const createWatchlist = (item) => {
  const id = v4();
  return {
    type: WatchlistActionTypes.CREATE_WATCHLIST,
    payload: {
      id,
      ...item,
    },
  };
};

export const handleItemInTransaction = (payload) => ({
  type: WatchlistActionTypes.HANDLE_ITEM_IN_TRANSACTION,
  payload,
});

export const deleteWatchlist = (watchlist) => {
  return {
    type: WatchlistActionTypes.DELETE_WATCHLIST,
    payload: watchlist,
  };
};
