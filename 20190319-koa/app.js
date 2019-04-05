const KoaCopy = require('./pack/koa-copy');
const app = new KoaCopy()
const Router = require('./middleware/router')
const router = new Router()

function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

app.use(router.routes())
app.use(require('./middleware/static.js')());
app.use(require('./middleware/logger'));
app.use(require('./middleware/blacklist'));


/**
 * 洋葱
app.use(async (ctx, next) => {
  ctx.body = "1";
  // await sleep();
  await next();
  ctx.body += "2";
});
app.use(async (ctx, next) => {
  ctx.body += "3";
  await next();
  ctx.body += "4";
});
app.use(async (ctx, next) => {
  ctx.body += "5";
});
**/

// 路由
router.get('/user', ctx => {
  ctx.body = 'user'
})
router.get('/list', ctx => {
  ctx.body = 'list'
})



// 默认以ip4的方式请求
app.listen(3001, '0.0.0.0', () => {
    console.log(`开启3001端口`)
});