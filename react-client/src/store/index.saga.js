// redux-sage 做redux数据全局管理
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga'
import counter from "./counter.redux.saga";
import user from "./user.redux.saga";
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  // reducer模块化
  combineReducers({ counter, user }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(mySaga)
export default store;