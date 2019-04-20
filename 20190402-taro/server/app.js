const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const router = require('./router')
var cors = require('koa2-cors');
app.use(static(__dirname + '/public'))


app.use(cors({
    origin: function(ctx) {
      if (ctx.url === '/test') {
        return false;
      }
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));


app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);