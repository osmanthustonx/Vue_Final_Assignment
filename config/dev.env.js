'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


/* 每次更新要重新起動 */
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH:'"https://vue-course-api.hexschool.io"',
  CUSTOMPATH:'"sunbu0331"'
})
