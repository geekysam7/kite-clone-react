import { produce } from "immer";
import { WatchlistActionTypes } from "./watchlist.types";

const INITIAL_STATE = {
  selected: 0,
  watchlist: [
    { name: "Big name of the watchlist", items: [] },
    { name: "2", items: [] },
    { name: "3", items: [] },
    { name: "4", items: [] },
    { name: "5", items: [] },
    { name: "6", items: [] },
    { name: "7", items: [] },
  ],
};

const watchlistReducer = (state = INITIAL_STATE, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case WatchlistActionTypes.SET_WATCHLIST:
        draft.watchlist = payload;
        break;
      case WatchlistActionTypes.ADD_ITEM:
        draft[payload.position].items.push(payload.item);
        break;
      case WatchlistActionTypes.SET_NAME:
        draft[payload.position].name = payload.name;
        break;
      case WatchlistActionTypes.REMOVE_ITEM:
        draft[payload.position] = draft[payload.position].filter(
          (item) => item.symbol !== payload.symbol
        );
        break;
      case WatchlistActionTypes.SET_SELECTED_WATCHLIST:
        draft.selected = payload;
        break;
      default:
        break;
    }
  });
};

export default watchlistReducer;
