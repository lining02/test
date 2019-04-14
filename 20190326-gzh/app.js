const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const  bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const router = require('./router');

app.use(bodyParser());
app.use(static(__dirname + '/'))


// 统一的错误处理
app.on('error', (err, ctx) => {
    console.log(ctx.request.body, err)
})

// session
app.keys = ['some secret hurr'];
app.use(session(app));

// 路由
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
