const { assetsVersion } = require('../package.json');

module.exports = {
  ASSETS_VERSION: `"${assetsVersion}"`, // 资源版本号
  NODE_ENV: '"production"'
}
