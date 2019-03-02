const stream = require('stream');
const fs = require('fs');


const a = fs.createReadStream('./favicon.ico') // 读取
const b = fs.createWriteStream('./favicon-copy.ico') // 写入
a.pipe(b) // 传输