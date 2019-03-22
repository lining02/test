// hbs的帮助方法
const hbs = require('koa-hbs');

const helpers = require('handlebars-helpers');
helpers.comparison({ handlebars: hbs.handlebars });
hbs.registerHelper('toDate', (date, pattern) => {
    return new Date().getFullYear() + '年'
})