// 路由是对象格式的
module.exports = {
    'get /': app => {
        app.ctx.body = 'index index'
    },
    'get /controller': async app => {
        await app.$controller.index.getIndex(app)
    },
    'get /controller/service': async app => {
        await app.$controller.index.getDetail(app)
    },
    'get /service': async app => {
        let a = 'nnnn'
        a = await app.$service.index.getServiceData()
        app.ctx.body = await 'index service' + a
    }
}