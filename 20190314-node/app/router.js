const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const db = require('./model');
// 接口的实现
const UserApi = require('./api/users');
router.get('/users', UserApi.getUsers)
router.get('/user/:id', UserApi.getUserById)
router.post('/user', UserApi.createUser)
router.put('/user/:id', UserApi.editUser)
router.delete('/user/:id', UserApi.deleteUser)

router.get('/', ctx => {
    ctx.body ="Hello world!"
})

// 上传图片
const upload = require('koa-multer')({ dest: 'uploads/' }); // 在uploads文件夹下生成文件
router.post('/profile', upload.single('file'), ctx => {
    console.log(ctx.req.file, ctx.req.body);
    ctx.body = '上传成功'
})

// 图片验证码
const fs = require('fs')
const captcha = require('trek-captcha')
router.get('/imgcode', async ctx => {
    const { token, buffer } = await captcha()
    ctx.session.captcha = token
    ctx.body = buffer
})


// 校验
router.post('/validate', async (ctx) => {

  ctx.validateBody('username')
    .required('请输入用户名')
    .isString()
    .trim()


  ctx.validateBody('password')
    .required('请输入密码')
    .isString()
    .isLength(6, 100, 'Password must be 6-100 chars')

  ctx.validateBody('imgCode')
    .required('请输入图片验证码')
    .isString()
    .eq(ctx.session.captcha, 'Passwords must match')

  ctx.validateBody('username')
    .check(await db.findOne({username: ctx.vals.username}), '已经存在该用户，请换个名字')

  const user = await db.User.insert({
    username: ctx.vals.username,
    password: ctx.vals.password
  })

  ctx.redirect(`/users/${user.id}`)
})


module.exports = router