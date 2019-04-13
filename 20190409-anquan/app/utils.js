const crypto = require('crypto');
const query = require('./db');


// md5加密
const md5 = (str) => {
    return crypto.createHash('md5').update(str).digest('hex')
}

/**
 * 加盐加密
 * 1. salt是存在数据库的，
 * 2. ？加salt还要加key => salt是数据库存储的，key是前端存储的。相当于同时拥有两把钥匙才能打开锁
 * 3. ？不加salt和key，两次md5安全么 => 不，只有md5加密，加密的类型太简单，还是容易被破解 
**/
const encryptPassword = (str, salt) => {
    let key = '1wedcxwefg'
    return md5(`${str}${key}${salt}`)
}

// 批量修改salt
const setSalts = async () => {
    let res = await query(`select * from users`);
    res.forEach(item => {
        const salt = Math.random()*90000+''+new Date().getTime();
        const { password, username } = item;
        const pass = encryptPassword(password, salt);
        query(`
        update users
        set salt = ? ,
        password = ?
        where username = ?`, [salt, pass, username])
    });
}
setSalts()
module.exports = { md5, encryptPassword };