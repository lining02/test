const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});
const UserApi = require('../api/user')
router.get('/', (ctx, next) => {
  ctx.body = `index`
});



router.post('/public/token/login', UserApi.loginToken);
const jwtAuth = require("koa-jwt");
const secret = "it's a secret";
router.get('/token/users',jwtAuth({
  // 对传入令牌进行校验
  secret
}), UserApi.getTokenUserList);


router.post('/public/session/login', UserApi.loginSession);
router.get('/session/users', UserApi.getSessionUserList);
router.get('/login-github', UserApi.loginGithub);
router.get("/oauth/github/callback", UserApi.githubcallback)
module.exports = router
