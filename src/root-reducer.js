import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  marketReducer,
  transactionReducer,
  watchlistReducer,
  userReducer,
  uistateReducer,
} from "reducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  watchlist: watchlistReducer,
  transactions: transactionReducer,
  market: marketReducer,
  uistate: uistateReducer,
});

export default persistReducer(persistConfig, rootReducer);
