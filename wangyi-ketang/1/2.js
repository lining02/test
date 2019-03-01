(function(root) {
    const _ = () => {
        if(!(this instanceof _)) {
            return new _()
        }
    }
    _.uniq = (target, cb) => {
        let result = []
        target.forEach((item, idx) => {
            let compute = cb ? cb(item) : item
            target.indexOf(compute) === idx && result.push(compute)
        })
        return result
    }
    _.reduce = () => {

    }

    _.each = function(arr) {
        console.log(arr)
    }
    _.functions = (obj) => {
        const result = []
        for(let key in obj) {
            result.push(key)
        }
        return result;
    }
    _.mixin = function(obj) {
        _.each(_.functions(obj), () => {

        })
    }
    _.mixin(_) // _ = {uniq, reduce, each, functions, mixin,...}
    root._ = _
})(this)