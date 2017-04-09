module.exports = {
  sinon: require('sinon'),
  expect: require('chai').use(require('sinon-chai')).expect,
  PageObjects: require('../../src/index'),
  Page: require('../../src/page/page'),
  View: require('../../src/view/view'),
  Component: require('../../src/component/component')
}
