//Recommended way is to user @reduxjs/toolkit.
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./root-reducer";

const middlewares = process.env.NODE_ENV === "production" ? [] : [logger];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
