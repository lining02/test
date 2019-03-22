const Koa = require('koa');
const app = new Koa();
const router = require('./router')
const static = require('koa-static');
const hbs = require('koa-hbs');
const helper = require('./utils/helper')
// 错误处理
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.app.emit('error', error)
    }
})
// 统一的错误处理
app.on('error', (err) => {
    console.log('统一的错误处理', err, err.message);
})
app.use(hbs.middleware({
    viewPath: __dirname + '/views',
    defaultLayout: 'layout',
    // layoutsPath: 'layout',
    partialsPath:  __dirname + '/views/partials',
    disableCache: false
}));

app.use(static(__dirname + '/public'))

// 路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);