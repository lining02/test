exports.authSession = async (ctx, next) => {
    if(!ctx.session.userInfo) {
        ctx.status = 401;
        ctx.body = {
            code: '401',
            message: '请登录'
        }
    } else {
        await next()
        console.log(111)
    }
}

exports.authToken = async (ctx, next) => {
    const jwtAuth = require("koa-jwt");
    const secret = "it's a secret";
    console.log(jwtAuth({ secret }))
    await next()
}