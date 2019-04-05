const KoaCopy = require('./pack/koa-copy');
const app = new KoaCopy()


function sleep() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
app.use(require('./middleware/static.js')());
app.use(require('./middleware/logger'));
app.use(require('./middleware/blacklist'));

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
// 默认以ip4的方式请求
app.listen(3000, '0.0.0.0', () => {
    console.log(1111)
});