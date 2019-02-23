// redux-thunk 做redux数据全局管理
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import counter from "./counter.redux.thunk";
import user from "./user.redux.thunk";
export default createStore(
  // reducer模块化
  combineReducers({ counter, user }),
  applyMiddleware(logger, thunk)
);