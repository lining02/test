const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'admin', '1234qwer', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // SQLite only
//   storage: 'path/to/database.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false // 操作符
});
/**
 * user 表名字
 * {} 表的数据结构
 * {} 配置项
 */
const User = sequelize.define('user', {
  username:{
    type:  Sequelize.STRING,
    get() {
      // 输出变化， 库不变
      const name = this.getDataValue('username')
      return `1${name}`
    }
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const pass = this.getDataValue('password')
      // password 库里为null  不输出password
      // title    库里不存    输出title为大写的password的值
      this.setDataValue('title', val.toUpperCase());
    }
  },
  age: {
    type: Sequelize.STRING,
    validate: { // 校验
      isInt: {
        msg: "Must be an integer number of pennies"
      }
    }
  },
  job: {
    type: Sequelize.STRING
  }
}, {
  timestamp: false, // 表格是否默认包含 createdAt、updatedAt、deletedAt（也可重新定义名称）
  // If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
  freezTableName: false, // 表名冻结,表明是user，并且model的名字也是user
  getterMethods:{
    dec() {
      // dec 输出18岁 库里没有
      // age       输出18   库里18
      return this.getDataValue('age') + '岁'
    }
  },
  setterMethods: {
    dec(value) {
      this.setDataValue('age', value.replace('岁', ''));
    }
  }
});


// 可给User类或者原型上添加方法
User.a = function() {}
User.prototype.b = function() {}



// force: true 代码改变的时候，会同时改变连接的表格
sequelize.sync({force: true})
  .then(() => User.create({
    username: 'janedoe',
    password: 'janedoe',
    age: 18,
    job: 'docuter'
  }))
  .then(jane => {
    console.log('create的数据', JSON.stringify(jane))
  }).then(result => {
    User.findAll({
      where: {
        username: 'janedoe'
      }
    }).then(res => {
      // 可修改数据
      res[0].dec = '20岁';
      res[0].save()

      console.log('查找的数据', JSON.stringify(res))
    })
  }).then(async () => {
      const users = await User.findAll()
      console.log('users', JSON.stringify(users))
      const user1 = await User.create({})
      console.log('user1', JSON.stringify(user1))
      const user2 = await User.update({username: 11}, {where: {username: '1janedoe'}})
      console.log('user2', JSON.stringify(user2))
  })