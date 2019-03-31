module.exports = {
    getIndex: async app => {
        app.ctx.body = await JSON.stringify(app.$model.user.findAll())
    },
    getDetail: async app => {
        let aa = await app.$service.index
        console.log(11, aa.getServiceData())
        app.ctx.body = aa.getServiceData()
    },
}