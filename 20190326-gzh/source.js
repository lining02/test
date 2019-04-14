// 不引用库来实现自动回复


const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const Router = require('koa-router');
const xml2js = require('xml2js');
const url = require('url');
const crypto = require('crypto')
const xmlParser = require('koa-xml-body')
const router = new Router();
const { wxConfig } = require('./config')
const { appID, appsecret } = wxConfig

app.use(xmlParser())
app.use(bodyParser());
app.use(static(__dirname + '/'))


// 统一的错误处理
app.on('error', (err, ctx) => {
    console.log(ctx.request.body, err)
})

// session
app.keys = ['some secret hurr'];
app.use(session(app));


router.get('/wechat', async (ctx, next) => {
    console.log('get 请求')
    const { query } = url.parse( ctx.url, true);
    const { token } = wxConfig
    const {
        signature, // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
        timestamp, // 时间戳
        nonce, // 随机数
        echostr // 随机字符串
    } = query
    let str = [token, timestamp, nonce].sort().join('');
    let strSha1 = crypto.createHash('sha1').update(str).digest('hex');
    console.log(`自己加密后的字符串为：${strSha1}`);
    console.log(`微信传入的加密字符串为：${signature}`);
    console.log(`两者比较结果为：${signature == strSha1}`);
    if (signature == strSha1) {
        ctx.body = echostr
    } else {
        ctx.body = "你不是微信"
    }
})

router.post('/wechat', async (ctx, next) => {
    console.log('post 请求');
    const { xml } = ctx.request.body;
    const builder = new xml2js.Builder()
    const result = builder.buildObject({
        xml: {
            ToUserName: xml.FromUserName,
            FromUserName: xml.ToUserName,
            CreateTime: Date.now(),
            MsgType: xml.MsgType,
            Content: 'Hello ' + xml.Content
        }
    })
    ctx.body = result
    return result;
})

// 路由
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);