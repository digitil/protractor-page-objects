module.exports = {
  sinon: require('sinon'),
  expect: require('chai').use(require('sinon-chai')).expect,
  PageObjects: require('../../src'),
  Page: require('../../src/page'),
  View: require('../../src/view'),
  Component: require('../../src/component')
}
