const path = require('path');
const fs = require('fs');

module.exports =  (filepath = 'public') => {
    return async (ctx, next) => {
        const filename = path.resolve(__dirname, `../${filepath}`, ctx.url.replace(/(\/)(.*)/, '$2'));
        try {
            const body = fs.readFileSync(filename)
            ctx.body = body
        } catch (error) {
            console.log(error.message)
            ctx.body = '404 NOT FOUND'
        }
        await next()
    }
}