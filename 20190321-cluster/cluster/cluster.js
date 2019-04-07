const cluster = require('cluster');
const os = require('os');
const process = require('process')
const numCpus = os.cpus().length;
const log4js = require('log4js');



log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'info' } }
});

console.log(`这台电脑是${numCpus}核的处理器 ${cluster.isMaster ? '' : '不' }是主进程`);
const workers = [];
/**
 * cluster.isMaster 是否是主进程
 * 如果是主进程，则创建多个子进程
 * 如果是子进程，则自启动
 */
if(cluster.isMaster) {
    // 当进程结束，重开一个进程
    cluster.on('death', (worker) => {
        worker = cluster.fork();
        workers[worker.pid] = worker
    })
    // 开启子进程
    for(let i=0; i<numCpus; i++) {
        const worker = cluster.fork();
        workers[worker.pid] = worker;
    }
} else {
    const app = require('./app');
    app.use(async (ctx, next) => {
        console.log(`我是子进程： worker ${cluster.worker.id} , PID: ${process.pid}`)
        await next()
    })
    app.listen('3001')
}

// 终止所有进程
process.on('SIGTERM', () => {
    for(let pid in workers) {
        process.kill(pid);
    }
    process.exit(0);
})

// require('./test')