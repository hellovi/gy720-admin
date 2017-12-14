// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var package = require('../package.json')
var proxySetting = {
  target: 'https://l.gy720.com',
  changeOrigin: true,
  secure: false,
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: `assets/${package.assetsVersion}/vue`,
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: `assets/${package.assetsVersion}/vue`,
    assetsPublicPath: '/',
    proxyTable: {
      '/user/': proxySetting,
      '/api/': proxySetting,
      '/make/': proxySetting,
      '/data/': proxySetting,
      [`/assets/${package.assetsVersion}/lib/`]: proxySetting,
      [`/assets/${package.assetsVersion}/images/`]: proxySetting,
      '/sms/': proxySetting,
      '/mail/': proxySetting,
      '/pano/': proxySetting,
      '/captcha/': proxySetting,
      // '/lib/': proxySetting,
      '/login': Object.assign({
        pathRewrite: {
          '^/login': '/'
        },
      }, proxySetting)
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
