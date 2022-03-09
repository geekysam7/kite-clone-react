import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import marketReducer from "./market/market.reducer";
import transactionReducer from "./transaction/transaction.reducer";
import userReducer from "./user/user.reducer";
import watchlistReducer from "./watchlist/watchlist.reducer";

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
});

export default persistReducer(persistConfig, rootReducer);
