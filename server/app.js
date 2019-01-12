var httpServe = require('http').createServer()
var mysql = require('mysql')
var db = mysql.createPool({
    host: '106.12.95.131',
    user: 'root',
    password: 'FiVa7&q)K+oa',
    database: 'db_server'
})
var io = require('socket.io')
var wsServer = io.listen(httpServe)
wsServer.on('connection', (sock) => {
    sock.on('login', (res) => {
        db.query(`SELECT * from users WHERE password=${res.password}`, (err, data) => {
            if(err) {
                console.log(err)
            } else {
                console.log(data)   
            }
        })
        console.log(res)
    })
})
console.log(JSON.stringify(httpServe))
console.log('3000端口')
httpServe.listen('3000')