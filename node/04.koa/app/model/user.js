
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增ID'
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '用户名',
      validate: {
        notEmpty: {
          msg: '用户名不能为空'
        }
      }
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
    }
  })

  return User
}
