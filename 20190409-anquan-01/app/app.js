const Koa = require('koa');
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const axios = require('axios')
const session = require('koa-session');
const views = require('koa-views');


const app = new Koa();
const router = new Router()


app.use(bodyParser());
app.use(static(__dirname + '/'))
app.use(views(__dirname + '/views', { extension: 'ejs' }))
app.use(async (ctx, next) => {
    await next()
    // 设置XSS是否拦截 (0-不拦截XSS, 1, 拦截XSS;默认拦截)
    ctx.set('X-XSS-Protection', 0)

})

app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: false, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

router.get('/', async (ctx) => {
    await ctx.render('index', {
        from: ctx.query.from,
        username: ctx.session.username,
        text: ''
    });
});
router.get('/login', async (ctx) => {
    await ctx.render('login');
});
router.post('/login', async (ctx) => {
    const { username, password } = ctx.request.body
    ctx.session.username = username
    ctx.session.password = password
    ctx.redirect('/?from=henan')
});
router.post('/updateText', async (ctx) => {
    console.log(ctx.request.body)
    ctx.redirect('/?from=henan')
});

app.use(router.routes());
app.use(router.allowedMethods());
module.exports = app