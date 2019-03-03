const http = require("http");
const fs = require("fs");
const url = require("url");
http
  .createServer((req, res) => {
    var {
      pathname,
      query
    } = url.parse(req.url);
    let options = {};
    if (query) {
      let temp = query.split("&");
      temp.map(o => {
        let a = o.split("=");
        options[a[0]] = a[1]
      });
    }
    if (pathname === "/") {
      fs.readFile("./http.index.html", (err, data) => {
        if (err) return;
        res.end(data);
      });
    } else if (pathname === "/list") {
      // jsonp 判断是否把参数callback传过来 返回数据
      const {
        callback,
        ...rest
      } = options
      if (callback) {
        data = JSON.stringify({
          message: 'jsonp传过来的数据',
          ...rest
        });
        res.end(`(${data})`);
      } else {
        // cors处理跨域
        res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.5:3000 ");

        res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf-8'
        });
        data = JSON.stringify({
          message: '不跨域请求接口',
          a: 1
        });
        res.end(data);
      }
    } else if (pathname === '/cors') {
      res.setHeader("Content-Type", "application/json");
      //  cors处理跨域
      res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.5:3000 ");
      res.end(JSON.stringify([{
        name: "tom",
        age: 20
      }]));
    }
  })
  .listen(3000);