const koa = require('koa')
const { initRouter, initController, initService, initSchedule, initConfig } = require('./loader')
class KoaCopy {
    constructor() {
        // 全部挂载到this上
        this.$app = new koa()
        this.$config = initConfig(this);
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes());
        this.$service = initService(this)
        this.$controller = initController(this)
        this.$schedule = initSchedule(this);
    }
    start(port = 3000) {
        this.$app.listen(port, () => {
            console.log(`服务器启动成功${port}`)
        })
    }
}

module.exports = {
    KoaCopy
}