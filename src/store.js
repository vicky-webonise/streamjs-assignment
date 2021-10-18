import { applyMiddleware, createStore, compose } from "redux";
import { allReducers } from "./reducers";
import ReduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
