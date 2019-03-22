const os = require('os');
const {
    totalmem,
    freemem
} = os
const config1 = require('./config1.js')
const config2 = require('./config2.js')(5)
console.log(`
总内存： ${totalmem()},
空闲内存： ${freemem()},
内存占用率： ${((totalmem()-freemem())/totalmem()).toFixed(2)}%,
`)

os.cpus().forEach(cpu => {
    console.log(`${cpu.model}的速度是${cpu.speed}`)
});
console.log(config1)
console.log(config2(2))