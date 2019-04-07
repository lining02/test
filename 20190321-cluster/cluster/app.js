const Koa = require('koa');
const app = new Koa();
const log4js = require('log4js');
const logger = log4js.getLogger('cheese');


app.use(async (ctx, next) => {
    logger.level = 'trace'
    logger.error("Some debug messages");

    logger.info('app call....')
    if(Math.random() > 0.9) {
        logger.info('Cheese is Comté.');
    } else {
        logger.error('Cheese is too ripe!');
    }
    await next()
    ctx.response.body = `<div>hello Koa</div>`
})

app.on('error', (err, ctx) => {
    logger.error(err);
})
if(!module.parent) {
    app.listen(3001)
    console.log('app start on 3001')
} else {
    module.exports = app
}

