import { combineReducers } from "redux";
import { loaderReducer } from "./loader.reducer";
import { userReducer } from "./user.reducer";
import { toDoReducer } from "./todo.reducer";

const reducers = {
  userReducer,
  toDoReducer,
  loader: loaderReducer,
};

export const allReducers = combineReducers(reducers);
