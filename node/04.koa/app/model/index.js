const Sequelize = require('sequelize');
const config = require('../config');
const fs = require('fs')
const path = require('path')
const moment = require('moment')
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    define: {
      getterMethods: {
        createdAt() {
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD hh:mm:ss')
        },
        updatedAt() {
          return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD hh:mm:ss')
        }
      }
    }
});


const db = {}
fs.readdirSync(__dirname).filter(file => {
  return file.endsWith('js') && file !== 'index.js'
}).forEach(file => {
  const model = sequelize.import(path.join(__dirname, file))
  if (model && model.name) {
    db[model.name] = model
  }
})
module.exports = db