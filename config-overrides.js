const path = require("path");

module.exports = function override(config, env) {
  // 添加别名配置
  config.resolve.alias["@"] = path.resolve(__dirname, "src");

  return config;
};
