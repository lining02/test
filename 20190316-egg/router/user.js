module.exports = app1 => ({
    'get /': app => { app.ctx.body = 'user index' } ,
    'get /controller': app => { app1.$controller.user.getIndex(app) },
    'get /controller/service': app => { app.$controller.user.getDetail(app) },
    'get /service': app => { app.ctx.body = app.$service.index.getServiceDataSync() }
})