const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const path = require('path')
const fs = require('fs')

router.get('/goods', async (ctx, next) => {
    const { start = 0, limit = 10 } = ctx.query
    try {
        const list = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'public/json/goods.json')).toString())
        ctx.body = {
            total: list.length,
            list: list.splice(start, limit),
        }
    } catch (error) {
        console.log(1, error.message)
    }
})

module.exports = router