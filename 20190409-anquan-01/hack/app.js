const Koa = require('koa');
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const axios = require('axios')

const app = new Koa();
const router = new Router()
app.use(bodyParser());
app.use(static(__dirname + '/public'))
app.use(async ctx => {
  console.log(ctx.request.url)
  ctx.body = 'Hello World';
});


app.use(router.routes());
app.use(router.allowedMethods());
module.exports = app