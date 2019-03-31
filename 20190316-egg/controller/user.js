// app1 是在initController传过来的 app.ctx 不存在
// app 是在router传过来的 app.ctx 存在
module.exports = app1 => ({
    getIndex: app => {
        app.ctx.body = '路径为 controller\index.js\getIndex'
    },
    getDetail: async app => {
        app.ctx.body = await app.$service.index.getServiceDataSync()
    },
})