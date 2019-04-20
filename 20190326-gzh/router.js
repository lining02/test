const Router = require('koa-router');
const router = new Router();
const axios = require('axios')
const { wxConfig } = require('./config')
const { appID, appsecret } = wxConfig


// 认证
var OAuth = require('co-wechat-oauth');
var auth = new OAuth(appID, appsecret);

// 服务端
var WechatAPI = require('co-wechat-api');
var api = new WechatAPI(appID, appsecret);

// 自动回复
const wechat = require('co-wechat');
router.all('/wechat', wechat(wxConfig).middleware(
    async (message, ctx) => {
        console.log(message, typeof message.Content)
        const { Content: content } = message
        // 文本
        if (content.includes('文本') ) {
            return '文本';
        // 有type的类型的文本
        } else if (content.includes('text')) {
            return {
              content: '还是文本',
              type: 'text'
            };
        // 回复音乐
        } else if (content.includes('音乐')) {
            return {
              type: "music",
              content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3"
              }
            };
        // 转到客服
        } else if (content.includes('客服')) {
            return {
              type: "customerService",
              kfAccount: "test1@test"
            };
        // 回复图文
        } else if(content.includes('图文')){
            return [
              {
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
              }
            ];
        } else {
            return `请回复'text'、'文本'、'音乐'、'客服'或则'图文'。`
        }
    })
    
)
const wxDomain = 'https://api.weixin.qq.com';
let tokenCache = {}
router.get('/getTokens', async (ctx, next) => {
    let tokenInfo = await axios.get(`${wxDomain}/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`)
    Object.assign(tokenCache, tokenInfo.data)
    ctx.body = tokenInfo.data
})

router.get('/getFollowers', async (ctx, next) => {
    // 不用库实现
    // const { access_token } = tokenCache
    // const info = await axios(`${wxDomain}/cgi-bin/user/get?access_token=${access_token}`)
    // ctx.body = info.data
    console.log(api)
    // co-wechat-api库实现
    ctx.body = await api.getFollowers()
})
router.get('/wxAuthorize', (ctx, next) => {
    const state = ctx.query.id;
    const redirectUrl = ctx.href.replace('wxAuthorize', 'wxCallback');
    console.log('redirectUrl:', redirectUrl, state)
    const scope = 'snsapi_userinfo' //授权类型
    console.log(redirectUrl)
    const url = auth.getAuthorizeURL(redirectUrl, state, scope)
    console.log('url:', url)
    ctx.redirect(url)
})

router.get('/wxCallback', async (ctx, next) => {
    const code = ctx.query.code
    console.log('wxCallback....', code)
    const token = await auth.getAccessToken(code);
    var accessToken = token.data.access_token;
    var openid = token.data.openid;
    ctx.redirect('/?openid=' + openid)
})

router.get('/getUser', async (ctx, next) => {
    console.log(ctx.query)
    const { openId } = ctx.query
    let userInfo = await auth.getUser(openId)
    ctx.body = userInfo;
})


router.get('/getJsConfig', async ctx => {
    let config = await api.getJsConfig(ctx.query);
    ctx.body = config
})

module.exports = router