// 主要文件，规范化项目
const path = require('path');
const fs = require('fs');
const Router = require('koa-router')
const router = new Router();
const schedule = require('node-schedule'); // 定时器
const Sequelize = require("sequelize");

// 公共加载文件夹下的文件的函数
const loader = (dir, cb) => {
    const dirUrl = path.resolve(dir);
    const files = fs.readdirSync(dirUrl)
    files.forEach(file => {
        cb(file.replace('.js', ''), require(`${dirUrl}/${file}`))
    })
}

// 加载路由
const initRouter = (app) => {
    loader('router', (filename, routers) => {
        const prefix = filename === 'index' ? '' : `/${filename}`;
        // 这里app娶不到ctx， 所以函数形的router不能直接取app.ctx = '***'
        console.log('app.ctx:', app.ctx)
        routers = typeof routers === 'function' ? routers(app) : routers
        Object.keys(routers).forEach(route => {
            const [method, endPath] = route.split(' ');
            console.log('router:', filename, method, `${prefix}${endPath}`)
            // router.get('/user', async ctx => {ctx.body = await 111})
            router[method](`${prefix}${endPath}`, ctx => {
                app.ctx = ctx
                routers[route](app)
            })
        })
    })
    return router;
}

// 初始化 控制器controller
const initController = app => {
    const controllers = []
    loader('controller', (filename, controller) => {
        controllers[filename] = typeof controller === 'function' ? controller(app) : controller
    })
    return controllers;
}
// 初始化 service
const initService = app => {
    const services = []
    loader('service', (filename, service) => {
        services[filename] = typeof service === 'function' ? service(app) : service
    })
    return services;
}

// 初始化定时器
const initSchedule = app => {
    const schedules = []
    loader('schedule', (filename, scheduleItem) => {
        Object.keys(scheduleItem).forEach(o => {
            var j = schedule.scheduleJob(o, scheduleItem[o]);
        })
    })
    return schedules;
}
const initConfig =  (app) => {
     loader('config', (filename, configItem) => {
        // 从config获取mysql的配置项， sequlize 初始化定义
        if(configItem.mysql) {
            app.$db = new Sequelize(configItem.mysql);
        }
        // 获取中间件
        if(configItem.middleware) {
            configItem.middleware.forEach((ware, next) => {
                const aa = path.resolve(__dirname, 'middleware', ware+ '.js')
                app.$app.use(require(aa));
            })
        }
    })
    // 定义model
     loader('model', (filename, configItem) => {
        app.$model = {}
        const {schema, options}  = configItem
        app.$model[filename] = app.$db.define(filename, schema, options);
        app.$db.sync();
    })
}
module.exports = { initRouter, initController, initService, initSchedule, initConfig }