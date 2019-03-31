'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async detail() {
    const { ctx } = this;
    ctx.body = 'hi, egg user id ' + ctx.params.id ;
  }
}

module.exports = HomeController;
