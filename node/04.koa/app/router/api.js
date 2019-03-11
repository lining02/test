const Router = require('koa-router');
const router = new Router();
const UserApi = require('../api/user')
router.get('/', (ctx, next) => {
  ctx.body = `index`
});
router.get('/user', UserApi.getList);
router.get('/login', UserApi.login);

module.exports = router
