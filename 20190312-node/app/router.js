const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const UserApi = require('./api/users');
const middleware = require('./middleware/auth');
router.get('/', ctx => {
    ctx.body = '1111'
})
router.post('/token/login',UserApi.LoginToken)
router.post('/session/login', UserApi.LoginSession)
router.get('/token/users', middleware.authToken, UserApi.UsersToken)
router.get('/session/users', middleware.authSession, UserApi.UsersSession)
module.exports = router