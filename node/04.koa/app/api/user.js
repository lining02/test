const db = require('../model')
const getList = async (ctx, next) => {
    console.log(db)
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
const login = async (ctx, next) => {
    const { username, password } = ctx.query
    await db.User.findOne(
        { 
            where: { username, password },
            attributes: ['id', 'username', 'age', 'job', 'createdAt', 'updatedAt']
        }
    ).then(data => {
        if(data) {
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
module.exports = {
    getList, login
}