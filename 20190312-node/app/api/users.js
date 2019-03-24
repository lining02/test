const db = require('../model');



exports.LoginToken = async ctx => {
    const { username, password } = ctx.request.body
    const jwt = require("jsonwebtoken");
    const secret = "it's a secret";
    let data = await db.User.findOne({where: {
        username, password
    }})
    if(data) {
        const {username} = data
        ctx.body = {
            data,
            code: '000',
            token: jwt.sign({
                data: username,
                exp: Math.floor(Date.now() / 1000) + 3600 // 过期时间1小时
            },secret),
            message: '登陆成功（token）',
        }
    } else {
        ctx.body = {
            data,
            code: 'S101',
            message: '登陆失败（token）'
        }
    }
}

exports.LoginSession = async ctx => {
    const { username, password } = ctx.request.body
    let data = await db.User.findOne({where: {
        username, password
    }})
    if(data) {
        ctx.session.userInfo = data
        ctx.body = {
            data,
            code: '000',
            message: '登陆成功（session）'
        }
    } else {
        ctx.body = {
            data,
            code: 'S101',
            message: '登陆失败（session）'
        }
    }
}
exports.UsersToken = async ctx => {
    let list = await db.User.findAll()
    ctx.body = {
        list,
        code: '000',
        message: '请求成功（token）'
    }
}
exports.UsersSession = async (ctx, next) => {
    let list = await db.User.findAll()
    ctx.body = {
        list,
        code: '000',
        message: '请求成功（session）',
    }
}
