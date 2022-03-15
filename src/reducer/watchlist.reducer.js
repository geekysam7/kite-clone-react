import { produce } from "immer";
import { WatchlistActionTypes } from "../types/watchlist.types";

/*

{name: "Watchlist", items: [ids], id: uuid}

*/

const INITIAL_STATE = {
  selected: 0,
  watchlist: {},
  watchlistByIds: [],
};

export const watchlistReducer = (state = INITIAL_STATE, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case WatchlistActionTypes.SET_WATCHLIST:
        let watchlist = {};
        let watchlistByIds = [];

        payload.forEach((item) => {
          watchlist[item.id] = item;
          watchlistByIds.push(item.id);
        });

        draft.watchlist = watchlist;
        draft.watchlistByIds = watchlistByIds;

        if (payload.length) draft.selected = payload[0].id;
        break;
      case WatchlistActionTypes.HANDLE_ITEM_IN_TRANSACTION:
        if (payload.id) {
          draft.transactionItem = payload.id;
        } else if (draft.transactionItem && payload.created) {
          draft.watchlist[draft.selected].items.push(draft.transactionItem);
          draft.transactionItem = null;
        } else {
          draft.transactionItem = null;
        }
        break;
      case WatchlistActionTypes.CREATE_WATCHLIST:
        draft.watchlist[payload.id] = payload;
        draft.watchlistByIds.push(payload.id);
        draft.selected = payload.id;
        break;
      case WatchlistActionTypes.ADD_ITEM:
        if (draft.selected !== 0) {
          let items = draft.watchlist[draft.selected].items;

          if (
            items.findIndex((instrumentId) => instrumentId === payload) === -1
          ) {
            draft.watchlist[draft.selected].items.push(payload);
          }
        }
        break;
      case WatchlistActionTypes.SET_NAME:
        draft.watchlist[payload].name = payload.name;
        break;
      case WatchlistActionTypes.REMOVE_ITEM:
        draft.watchlist[draft.selected].items = draft.watchlist[
          draft.selected
        ].items.filter((item) => item !== payload);
        break;
      case WatchlistActionTypes.SET_SELECTED_WATCHLIST:
        draft.selected = payload;
        break;
      case WatchlistActionTypes.DELETE_WATCHLIST:
        delete draft.watchlist[payload];
        draft.watchlistByIds = draft.watchlistByIds.filter(
          (item) => item !== payload
        );
        if (draft.watchlistByIds.length) {
          draft.selected = draft.watchlistByIds[0];
        } else {
          draft.selected = 0;
        }
        break;
      default:
        break;
    }
  });
};
