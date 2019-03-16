const jwt = require('jsonwebtoken')
// 密钥
const secret = 'gomemyf-active-config-system'
// 加密
exports.encode = userId => {
    return jwt.sign({
        userId
    }, secret, {
        expiresIn: '1h'
    })
}
// 解密
exports.decode = token => {
    return jwt.verify(token, secret)
}