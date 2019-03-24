const Koa = require('koa');
const app = new Koa();
const router = require('./router')
const static = require('koa-static');
const  bodyParser = require('koa-bodyparser');

app.use(bodyParser());
app.use(static(__dirname + '/public'))

// session 的用法
// const session = require('koa-session');
// app.keys = ['some secret hurr'];
// app.use(session(app));

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


// 路由
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);