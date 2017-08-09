// https://github.com/michael-ciniawsky/postcss-load-config

const path = require('path');

module.exports = {
  "plugins": {
    "postcss-import": {
      path: [
        path.join(__dirname, 'src/styles')
      ],
    },
    "postcss-nested": {},
    "postcss-sassy-mixins": {},
    "postcss-cssnext": {}
  }
}
