export function createStore(reducer, enhancer) {
    if(enhancer) {
        return enhancer(createStore(reducer))
    }
    let currentState = {},
        currentListeners = [];
    
    const getState = () => {
        return currentState
    }
    const subscribe = (listener) => {
        currentListeners.push(listener)
    }
    const dispatch = (action) => {
        currentState = reducer(currentState, action)
        currentListeners.forEach(v => v());
        return action
    }
    return {getState, subscribe, dispatch}
}

export function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = store.dispatch
        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(args)
        }
        const middlewareChain = middlewares.map(middleware => middleware(midApi))
        dispatch = compose(...middlewareChain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}

export function compose(...funcs) {
    if(funcs.length === 0) {
        return arg => arg
    }
    if(funcs.length === 1) {
        return funcs[1]
    }
    return funcs.reduce((ret, item) => {
        (...args) => {
            ret(item)(...args)
        }
    })
}

export function bindActionCreators(creators, dispatch) {
    return Object.keys(creators).reduce((ret, item) => {
        ret[item] = dispatch(creators[item(...args)])
    })
}