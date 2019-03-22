var Router = require('koa-router');
var router = new Router({prefix: '/api'});
router.get('/',  ctx => {
    ctx.render('index', {
        title: '首页',
        userInfo: {
            name: 'amyli',
            age: 18
        },
        author: {
            website: 'http://localhost:3000/api'
        },
        posts: [{name: 'name1', birthday: new Date()}, {name: 'name2', birthday: new Date()}]
    })
    
});
router.get('/users', async ctx => {
    let isCookie;
    // cookie中查询一周内是否看过视频
    if (ctx.cookies.get('isCookie')) {
        isCookie = false;
    }else{
        isCookie = true;
        ctx.cookies.set('isCookie', true, {maxAge: 7*24*3600000})
    }
    await ctx.render('users', {
        title: "用户列表",
        isCookie
    })
});
module.exports = router
