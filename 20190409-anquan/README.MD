## 点
1. mac 下直接输入`ssh root@10.122.11.11 `可直接登陆
2. [mactalk](http://macshuo.com/?p=676)
3. nginx的access.log打印日志。可以做埋点
4. [夏老师github](https://github.com/su37josephxia/frontend-basic)
5. [夏老师博客](https://www.josephxia.com//)
6. [https协议](https://www.techug.com/post/https-ssl-tls.html)
7. [md5解密](https://www.cmd5.com/)
8. [ddos](http://www.ruanyifeng.com/blog/2018/06/ddos.html)
9. docker
10. 爬虫
11. [安全策略](https://juejin.im/post/5c6ad29ff265da2da00ea459)

## 常见的web攻击

1. XSS
2. CSRF
3. 点击劫持
4. SQL注入
5. OS注入
6. 请求劫持
7. DDOS

## XSS-跨站脚本攻击
1. 反射性,url注入
2. 存储性
 防范方式
 1. 转义<>等符号
 2. cookie 设置成仅后端可改
 3. header设置： X-XSS-Protection： 1 // XSS过滤
 4. header设置：Content-Security-Policy: default-src 'self' // 只允许加载本站资源
 5. header设置： Content-Security-Policy: img-src https://* // 只允许加载 HTTPS 协议图片
 6. header设置： Content-Security-Policy: child-src 'none' // 不允许加载任何来源框架
 7. 验证referer
 8. 验证码之类的人机校验