const { injectBabelPlugin } = require("react-app-rewired");
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  console.log(injectBabelPlugin);
  config = injectBabelPlugin(
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css" // `style: true` 会加载 less 文件
      }
    ],
    config
  );
  config = injectBabelPlugin(
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    config
  );
  return config;
};
