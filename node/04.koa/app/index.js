const Koa = require('koa');
const app = new Koa();
const apiRouter = require('./router/api')
const cors =require('koa2-cors');
const bodyParser = require('koa-bodyparser');

// 解决跨域
app.use(cors({
  origin: 'http://192.168.1.6:8080',
  credentials: true,
  'Access-Control-Allow-Credentials': true
}));

const session = require('koa-session');
app.keys = ['some secret hurr'];
const CONFIG = {
  maxAge: 1000
}
app.use(session(CONFIG, app));
// app.use(ctx => {
//   // ignore favicon
//   if (ctx.path === '/favicon.ico') return;
 
//   let n = ctx.session.views || 0;
//   ctx.session.views = ++n;
//   ctx.body = n + ' views';
// });

// 401 错误处理
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = { code: 401, message: '用户未登陆' };
    } else if(500 == err.status) {
      ctx.status = 500;
      ctx.body = { code: 500, message: '网络错误' };
    } else {
      throw err;
    }
  });
});

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});



app.use(bodyParser());



// response
// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// 接口,使用路由
app
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods());

app.listen(3000);