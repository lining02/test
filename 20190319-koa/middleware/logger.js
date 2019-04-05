module.exports = async (ctx, next) => {
    const startTime = new Date().getTime();
    await next();
    const endTime = new Date().getTime();
    console.log(`请求${ctx.url}, 耗时${parseInt(endTime-startTime)}ms`)
}