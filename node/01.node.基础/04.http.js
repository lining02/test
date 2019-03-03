const http = require('http');
const fs = require('fs')
const path = require('path')
const {
    promisify
} = require('util')
http.createServer((req, res) => {
    console.log(req.url)
    res.setHeader('Content-type', 'text/html')
    res.statusCode === 200
    if (req.url === '/') {
        promisify(fs.readFile)('./config1.js').then(data => {
            res.end(data)
        })
    } else if (req.url === '/favicon.ico') {
        promisify(fs.readFile)('./favicon.ico').then(data => {
            res.end(data)
        })
    } else if (/^\/(\w+).(jpg)$/.test(req.url)) {
        fs.createReadStream(path.resolve('./01.jpg')).pipe(res);
    } else {
        res.end('404')
    }
}).listen(3000)