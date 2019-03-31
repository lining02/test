# 20190316-node



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org



koa的不足
1. 缺乏约束
2. 需要手动配置
3. 开发效率低下
4. 维护性、测试性不好
egg： 阿里的mvc框架
1. `npm i mysql2 egg-sequlize`
2. 公司的项目
    - 约定>配置
    - 可维护性
    - 开发效率


1. 模板引擎出错
2. middleware、helper没有写