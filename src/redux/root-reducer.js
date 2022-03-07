import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import transactionReducer from "./transaction/transaction.reducer";
import userReducer from "./user/user.reducer";
import watchlistReducer from "./watchlist/watchlist.reducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  watchlist: watchlistReducer,
  transaction: transactionReducer,
});

export default persistReducer(persistConfig, rootReducer);
