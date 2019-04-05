class Router {
    constructor(){
        this.stacks = []
    }
    get(path, ware) {
       this.register(path, 'post', ware)
    }
    post(path, ware) {
        this.register(path, 'get', ware)
    }
    register(path, type, ware) {
        this.stacks.push({path, type, ware})
    }
    routes() {
        return async (ctx, next) => {
            let idx = this.stacks.findIndex(item => {
                return item.path === ctx.url
            })
            if(idx > -1) {
                this.stacks[idx].ware(ctx, next)
            } else {
               await next()
            }
            // return {ctx, next}
        }
    }
}

module.exports = Router