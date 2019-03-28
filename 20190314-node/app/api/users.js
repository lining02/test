// const db = require('../model');
exports.getUsers = async ctx => {
    const users = await db.User.findAll()
    ctx.body ={
        data: users,
        code: '000',
        message: '请求成功'
    }
}

exports.getUserById = async ctx => {
    const { id } = ctx.params
    const user = await db.User.findOne({where: { id }})
    ctx.body ={
        data: user,
        code: '000',
        message: '请求成功'
    }
}

exports.createUser = async ctx => {
    const a = Math.random()
    const user = await db.User.create({
        username: a,
        password: a,
        job: a
    })
    ctx.body ={
        data: user,
        code: '000',
        message: '请求成功'
    }
}
exports.editUser = async ctx => {
    const a = Math.random().toFixed(2)
    const { id } = ctx.params
    const user = await db.User.update({
        username: a,
        password: a,
        job: a
    }, {where: {id}})
    ctx.body ={
        code: '000',
        message: '请求成功'
    }
}

exports.deleteUser = async ctx => {
    const { id } = await ctx.params
    user = await db.User.destroy({where: {id}})
    ctx.body ={
        code: '000',
        message: '请求成功'
    }
}