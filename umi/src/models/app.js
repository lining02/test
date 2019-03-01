import api from '@/services/index'
import router from 'umi/router';
const { loginUser, getList } = api
export default {
    namespace: 'app',
    state: {
        menus: JSON.parse(sessionStorage.getItem('menus')) || [],
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
        columns: JSON.parse(sessionStorage.getItem('columns')) || [],
        list: JSON.parse(sessionStorage.getItem('list')) || []
    },
    subscriptions: {},
    effects: {
        *login({ payload }, { put, call, select }) {
              const data = yield call(loginUser, payload)
              if (data.success) {
                const {menus, userInfo} = data
                yield put({ type: 'updateState', payload: {
                  userInfo,
                  menus
                } })
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                sessionStorage.setItem('menus', JSON.stringify(menus))
                router.push('/user')
              } else {
                throw data
              }
            },

      *getData({ payload }, { put, call, select }) {
        const data = yield call(getList)
        const {list, columns} = data
        yield put({ type: 'updateState', payload: {
          columns,
          list
        } })
        sessionStorage.setItem('columns', JSON.stringify(columns))
        sessionStorage.setItem('list', JSON.stringify(list))
      }
    },
    reducers: {
      updateState(state, { payload }) {
        console.log(state, payload)
        return {
          ...state,
          ...payload,
        }
      },
    }
}