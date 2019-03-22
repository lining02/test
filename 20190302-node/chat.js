const http = require('http')
const net = require('net')
const crypto = require('crypto')
const list = []
let server = net.createServer(socket => {
    console.log('开始链接....')
    socket.on('data', data => {
    // data是client发送过来的请求头,这里需要做处理,
    // headers是头处理成对象
        let aHeaders = data.toString().split('\r\n')
        aHeaders.shift()
        aHeaders.pop()
        aHeaders.pop()
        const headers = {}
        aHeaders.forEach(item => {
            let [key, value] = item.split(': ')
            headers[key] = value
        })
        // 判断是否存在headers,会进行两次,第一次有数据,第二次为{}
        if (headers.Connection) {
            // 判断头
            if (headers.Connection !== 'Upgrade' || headers.Upgrade !== 'websocket') {
                console.log('非socket协议....', headers)
                socket.end()
            // 判断版本号
            } else if (headers['Sec-WebSocket-Version'] !== '13') {
                console.log('不是13版本的....', headers['Sec-WebSocket-Version'])
                socket.end()
            // 处理数据
            } else {
                let str = headers['Sec-WebSocket-Key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
                let base64Key = crypto.createHash('sha1').update(str).digest('base64');
                socket.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${base64Key}\r\n\r\n`)
                // 到此,握手完成----
                
                // 服务端主动发消息 Hi, Client! l'm Server.
                let dataBuffer = new Buffer(`Hi, Client! l'm Server.`)
                let payload_len = dataBuffer.length
                let assistData = []
                assistData.push(129)
                assistData.push(payload_len)
                let assistBuffer = new Buffer(assistData)
                let message = Buffer.concat([assistBuffer, dataBuffer])
                console.log(message, 222)
                socket.write(message)

                // 对接收到的二进制数据做处理
                socket.on('data', (d) => {
                    let fin = d[0] >> 7
                    let opcode = d[0] & parseInt(1111, 2) // 1 表示文本数据帧
                    let mask = d[1] >> 7 // 标示是否进行掩码处理，客户端发送给服务端时为1，服务端发送给客户端时为0
                    let payload_len = d[1] & parseInt(1111111, 2) // 这里假设发送的数据长度小于 125
                    let masking_key = d.slice(2, 6)
                    let payload_data = new Buffer(payload_len)
                    for (let i = 0; i < payload_len; i++) {
                        let j = i % 4
                        payload_data[i] = d[6 + i] ^ masking_key[j]
                    }
                    console.log(payload_data.toString(), 111)
                    list.push(payload_data)
                })
            }
        }

    })
    server.on('error', (err) => {
        throw err;
    });
    socket.on('end', () => {
        console.log('链接断开....')
    })
})

server.listen('3001')