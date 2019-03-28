// const util = require('../util')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增ID'
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: false,
      defaultValue: '未设置',
      comment: '昵称'
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '密码',
      validate: {
        notEmpty: {
          msg: '请输入密码'
        }
      }
    },
    // token: {
    //   type: DataTypes.STRING(256),
    //   comment: 'token值'
    // },
    
    age: {
      type: DataTypes.STRING(11),
      comment: '年龄',
      defaultValue: '18'
    },
    job: {
      type: DataTypes.STRING(11),
      comment: '职业',
      defaultValue: '自由工作者'
    }
  })

  /**
   * 根据用户名查询用户
   * @param username
   * @returns {Promise.<Model>}
   */
  User.findByUsername = function (username) {
    return this.findOne({
      where: {
        username
      }
    })
  }
  return User
}
