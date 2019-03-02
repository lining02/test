const fs = require('fs');
// 异步读取， data都是二进制数据
fs.readFile('./config1.js', (err, data) => {
    if(err) throw err;
    console.log(1)
})
// 同步读取
fs.readFileSync('./config1.js', (err, data) => {
    if(err) throw err;
    console.log(2)
})
console.log(3)


// promise .then的方式
const util = require('util');
util.promisify(fs.readFile)('./config1.js').then((err, data) => {
    console.log(4, err, data)
});
