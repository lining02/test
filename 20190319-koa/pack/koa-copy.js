const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const compose = require('koa-compose');
class KoaCopy {
    constructor() {
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.middleware = [];
    }
    listen(...args) {
        const server = http.createServer( async (req, res) => {
            const fn = await this.compose(this.middleware);
            const ctx = await this.createContext(req, res);
            await fn(ctx);
            await res.end(ctx.body)
        })
        server.listen(...args)
    }
    use(fn) {
        this.middleware.push(fn);
    }
    compose(ware) {
        return ctx => {
            return dispatch(0);
            function dispatch(i) {
                let fn = ware[i];
                if (!fn) {
                  // 执行任务结束
                  return Promise.resolve();
                }
                return Promise.resolve(
                  fn(ctx, function next() {
                    return dispatch(i + 1);
                  })
                );
              }
        }
    }
    createContext(req, res) {
        const context = Object.create(this.context);
        const request = context.request = Object.create(this.request);
        const response = context.response = Object.create(this.response);
        context.app = request.app = response.app = this;
        context.req = request.req = response.req = req;
        context.res = request.res = response.res = res;
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        context.state = {};
        return context;
      }
}

module.exports = KoaCopy