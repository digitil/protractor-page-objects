const PageObjects = require('../../lib')

const form = {
  name: 'Form',
  locator: '[ng-view]',
  path: '#/form',
  components: [
        { name: 'sliderBar', locator: by.name('points') },
        { name: 'alertButton', locator: by.id('alertbutton') },
        { name: 'username', locator: by.model('username') }
  ]
}

const repeater = {
  name: 'Repeater',
  locator: '[ng-view]',
  path: '#/repeater'
}

const page = {
  name: 'Page',
  path: '#/',
  views: [form, repeater],
  components: [
        { name: 'repeaterLink', locator: by.linkText('repeater') }
  ]
}

const app = new PageObjects([page])

module.exports = app
