// https://github.com/michael-ciniawsky/postcss-load-config

const path = require('path');

module.exports = {
  "plugins": {
    "postcss-import": {
      addModulesDirectories: [
        path.join(__dirname, 'src/styles')
      ],
    },
    "postcss-nested": {},
    "postcss-cssnext": {}
  }
}
