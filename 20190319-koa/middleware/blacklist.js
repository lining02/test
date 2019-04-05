module.exports = async (ctx, next) => {
    const {req, res} = ctx;
    const blackList = ["127.0.0.1"];
    
    let ip = req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress


    if (blackList.includes(ip) ) {
        ctx.body = 'not allowed'
    } else {
        await next();
    }
}