const mysql = require('mysql2');
// 下面的两种写法选其一
// 1. 普通的连接
// 2. 连接池--一直保持数据库的连接状态
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'test',
//     password: '1234qwer',
// });
const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: '1234qwer',
})
  // 用Promise封装函数
  const query = (sql, ...rest) => {
      console.log(rest)
      return new Promise((resolve, reject) => {
        connection.query(
            sql,
            rest,
            function(err, results, fields) {
                if(err) reject(err)
                resolve(results)
            }
          );
      })
  }

  const sql1 = "SELECT * FROM `users`",
        sql2 = "INSERT INTO `test`.`users` (`username`, `password`) VALUES (?, ?)",
        sql3 = "UPDATE `test`.`users` SET `password`=? WHERE  `username`=? ",
        sql4 = "DELETE FROM `test`.`users` WHERE  `username`=? AND `password`=?"
  query(sql1).then(res => {
      console.log('查询列表', res)
  }).then(() => {
      query(sql2, 11, 22).then(res => {
          console.log('插入一条数据', res)
      })
  }).then(() => {
      query(sql3, '1234qwer', 'amy').then(res => {
        console.log('更新数据', res)
  }).then(() => {
      query(sql4, 11, 22).then(res => {
          console.log('删除数据', res)
      }).catch(err => {
         console.log(err)
      })
  })
})
