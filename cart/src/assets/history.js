const History = {
    _history: [],
    push(o) {
        this._history.push(o)
    },
    pop() {
        this._history.pop()
    },
    canBack() {
        return this._history.length > 1
    },
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$isCanBack', {
            get() {
                return History
            }
        })
    }
}

export default History;
