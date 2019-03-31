'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequlize: {
    enable: true,
    package: 'egg-sequelize'
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  }
};