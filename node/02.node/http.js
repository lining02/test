const http = require("http");
const fs = require("fs");
const url = require("url");
http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true"); // 是否允许发送cookie
    res.setHeader('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
    //res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
    var {
      pathname,
      query,
      path
    } = url.parse(req.url);
    const { method } = req
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
    
      res.end(JSON.stringify([{
        name: "tom",
        age: 20
      }]));
    } else if(req.headers.accept.indexOf('image/*') > -1) {
      fs.createReadStream('../01.node.基础/01.jpg').pipe(res);
    } else if (method == "OPTIONS") {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "http://192.168.1.5:3000/",
        "Access-Control-Allow-Headers": "X-Token,Content-Type",
        "Access-Control-Allow-Methods": "GET,POST,PUT",
        "Access-Control-Allow-Credentials": "true"
      });
      res.end();
    }
  })
  .listen(3000);