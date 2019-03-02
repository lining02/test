const http = require('http')
const url = require('url')
let router = []

// class 构造函数
class Application {
    get(path, handler) {
        router.push({
            path,
            method: 'get',
            handler
        })
    }
    listen() {
        http.createServer((req, res) => {
            let {
                pathname
            } = url.parse(req.url, true);
            for (let route of router) {
                if (route.path === pathname) {
                    route.handler(req, res)
                }
            }
        }).listen(3000)
    }
}

module.exports = function () {
    return new Application()
}