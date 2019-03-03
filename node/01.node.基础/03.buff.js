// 定义buffer
const buf1 = Buffer.alloc(10)
const buf2 = Buffer.allocUnsafe(10)
const buf3 = Buffer.from('HELLO 我')
const buf4 = Buffer.from(['H'])
console.log(buf1, buf2, buf3, buf4)
// 写入buffer
buf1.write('helloworld');
console.log(buf1)
// buffer转码读取
console.log(buf1.toString('utf-8'), buf2, buf3.toString('utf-8'), buf4)
// buffer合并
const buf5 = Buffer.concat([buf1, buf2])
console.log('buf5:', buf5)