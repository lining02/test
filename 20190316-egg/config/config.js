module.exports = {
    // 数据库
    mysql: {
        username: 'root',
        password: '1234qwer',
        database: 'test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    // 中间件
    middleware: ['logger']
}