module.exports = {
  sinon: require('sinon'),
  expect: require('chai').use(require('sinon-chai')).expect,
  PageObjects: require('../../index'),
  Page: require('../../lib/page/page'),
  View: require('../../lib/view/view'),
  Component: require('../../lib/component/component')
}
