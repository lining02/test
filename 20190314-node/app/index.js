const Koa = require('koa');
const app = new Koa();
const router = require('./router')
const static = require('koa-static');
const  bodyParser = require('koa-bodyparser');
const session = require('koa-session');




app.use(bodyParser());
app.use(static(__dirname + '/public'))

// 表单校验
const bouncer = require('koa-bouncer');
app.use(bouncer.middleware());

app.use(async (ctx, next) => {
    try {
      await next();
    } catch(err) {
      if (err instanceof bouncer.ValidationError) {
        ctx.status = 500;
        ctx.body = {
          message: ['danger', err.message],
          params: ctx.request.body
        };
        return;
      }
      throw err;
    }
  });

// 统一的错误处理
app.on('error', (err, ctx) => {
    console.log(ctx.request.body, error)
})

// session
app.keys = ['some secret hurr'];
app.use(session(app));



// 路由
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);