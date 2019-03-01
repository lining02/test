(function(root) {
    const _ = {}
    _.uniq = (target, cb) => {
        let result = []
        target.forEach((item, idx) => {
            let computed = cb ? cb(item) : item
            if(target.indexOf(computed) === idx) {
                result.push(computed)
            }
        });
        return result
    }
    root._ = _
})(this)