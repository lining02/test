/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553841555728_1640';


// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};


  // add your middleware config here
  config.middleware = [];
  
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    sequelize: {
      username: 'root',
      password: '1234qwer',
      database: 'test',
      host: '127.0.0.1',
      dialect: 'mysql'
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
