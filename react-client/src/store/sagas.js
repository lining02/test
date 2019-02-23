import { call, put, takeEvery, /** takeLatest **/ } from 'redux-saga/effects'
const Api ={
  fetchUser: ({random}) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(random > 0.5) {
          resolve({user: 'amy', age: 18, userId: 1, random})
        } else {
          reject({message: `网络错误${random}`})
        }
      }, 1000)
    })
  },
  fetchCount: (actions) => {
    return new Promise((resolve, reject) => {
      let flag = 'add'
      setTimeout(() => {
        if(flag === 'add') {
          resolve({flag})
        } else if(flag === 'minus'){
          resolve({flag})
        } else {
          reject({message: `网络错误`})
        }
      }, 1000)
    })
  }
}
// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, {random: Math.random()});
      yield put({type: "login_sucess", user: user});
   } catch ({message}) {
      yield put({type: "login_error", message});
   }
}
function* fetchCount({type, flag}) {
  try {
     const user = yield call(Api.fetchCount, {flag});
     yield put({type: flag, user});
  } catch (message) {
     yield put({type: "login_error", message});
  }
}

/*
  在每个 `USER_FETCH_REQUESTED` action 被 dispatch 时调用 fetchUser
  允许并发（译注：即同时处理多个相同的 action）
*/
function* mySaga() {
  yield takeEvery("async_login", fetchUser);
  yield takeEvery("async_count", fetchCount);
}

/*
  也可以使用 takeLatest

  不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
  如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default mySaga;