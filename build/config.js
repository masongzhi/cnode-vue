'use strict'
const pkg = require('../package')

module.exports = {
  port: 4000,
  title: 'klg-invest-client',
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: '/',
  // disable babelrc by default
  babel: {
    babelrc: false,
    presets: ['vue-app', 'es2015'],
    plugins: [['component', [
      {
        'libraryName': 'element-ui',
        // 'styleLibraryName': 'theme-default'
      }
    ]],
      'transform-vue-jsx'
    ]
  },
  postcss: [
    // add prefix via postcss since it's faster
    require('autoprefixer')({
      // Vue does not support ie 8 and below
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('postcss-nested')
  ],
  cssModules: true,
  jsx: true
}
