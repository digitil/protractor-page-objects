module.exports = {
    sinon: require('sinon'),
    expect: require('chai').use(require('sinon-chai')).expect,
    compass: require('../../index'),
    Page: require('../../lib/Page'),
    View: require('../../lib/View'),
    Component: require('../../lib/Component'),
}