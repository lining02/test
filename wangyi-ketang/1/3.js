(function(root) {
    const _ =function(obj) {
        if(!(this instanceof _)) {
            return new _(obj)
        }
        this.wrap = obj
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
        console.log(11)
    }
    // arr=[uniq, reduce, each....]
    _.each = function(arr, callback) {
        for(let i=0;i<arr.length;i++) {
            callback.call(arr, arr[i])
        }
    }
    _.functions = (obj) => {
        const result = []
        for(let key in obj) {
            result.push(key)
        }
        return result;
    }
    _.chain = (obj) => {
        var instance = _(obj)
        instance._chain = true
        return instance;
    }
    _.result = (instance, obj) => {
        console.log(instance, obj)
        return instance._chain ? _(obj).chain() : obj
    }
    _.prototype.value = function() {
        console.log(this.wrap)
        return this.wrap
    }
    _.mixin = function(obj) {
        _.each(_.functions(obj), (key) => {
            var func = obj[key]
            obj.prototype[key] = function() {
                const args = [this.wrap]
                Array.prototype.push.call(args, arguments[0])
                console.log(args)

               return _.result(this, func.apply(this, args))
            }
        })
    }
    _.mixin(_) // _ = {uniq, reduce, each, functions, mixin,...}
    root._ = _
})(this)