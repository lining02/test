const db = require('../model')
const jwt = require("jsonwebtoken");
// koa的jwt中间件，作用是认证令牌合法性
const secret = "it's a secret";
const loginToken = async (ctx, next) => {
    const {
        username,
        password
    } = ctx.request.body
    await db.User.findOne({
        where: {
            username,
            password
        },
        attributes: ['id', 'username', 'age', 'job', 'createdAt', 'updatedAt']
    }).then(data => {
        if (data) {
            console.log(data.username)
            ctx.body = {
                code: 200,
                message: '登陆成功',
                data,
                token: jwt.sign(
                    // 签名只是防篡改
                    {
                        data, // 由于签名不是加密，令牌中不要存放敏感数据
                        exp: Math.floor(Date.now() / 1000) + 3600 // 过期时间1分钟
                    },
                    secret
                )
            }
        } else {
            ctx.body = {
                code: 500,
                message: '登陆失败'
            }
        }
    }).catch(err => {
        console.log(err)
    })
    await next()
}


const getTokenUserList = async (ctx, next) => {
    await db.User.findAll().then(res => {
        console.log(222, JSON.stringify(res));
        ctx.body = {
            code: 200,
            message: '获取成功',
            res
        }
    })
    await next()
}


const config = {
    client_id: "d38d1d9466195489a6ca",
    client_secret: "1c23019fc50ab33ebab30ba01b6547bd2d710fbe"
};
const loginGithub = async (ctx, next) => {
    const path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}`;
    ctx.redirect(path)
    next()
}
const githubcallback = async ctx => {
    const code = ctx.query.code;
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    };
    let res = await axios.post(
        "https://github.com/login/oauth/access_token",
        params
    );
    console.log(res.data);
    const access_token = querystring.parse(res.data).access_token;
    res = await axios.get(
        "https://api.github.com/user?access_token=" + access_token
    );
    console.log("userAccess:", res.data);
    ctx.redirect("/hello.html");
};

const loginSession = async (ctx, next) => {
    const {
        username,
        password
    } = ctx.request.body
    await db.User.findOne({
        where: {
            username,
            password
        },
        attributes: ['id', 'username', 'age', 'job', 'createdAt', 'updatedAt']
    }).then(data => {
        if (data) {
            // ctx.session.userinfo = data;
            ctx.body = {
                code: 200,
                message: '登陆成功',
                data
            }
        } else {
            ctx.body = {
                code: 500,
                message: '登陆失败'
            }
        }
    }).catch(err => {
        console.log(err)
    })
    await next()
}
const getSessionUserList = async (ctx, next) => {
    await db.User.findAll().then(res => {
        if(!ctx.session.userinfo) {
            ctx.status = 401;
            return;
        }
        ctx.body = {
            code: 200,
            message: '获取成功',
            res,
            userinfo: ctx.session.userinfo
        }
    })
    await next()
}
module.exports = {
    getTokenUserList,
    loginToken,
    loginGithub,
    githubcallback,
    loginSession,
    getSessionUserList
}