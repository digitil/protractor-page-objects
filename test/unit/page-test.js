const { sinon, expect, Page, View, Component } = require('./deps')

describe('Page', () => {
  let page

  describe('constructor', () => {
    it('should create Views for any defined in the PageDefinition', () => {
      page = new Page({
        views: [
          {
            name: 'UserSettings'
          },
          {
            name: 'AppSettings'
          }
        ]
      })
      expect(page.UserSettings).to.be.an.instanceof(View)
      expect(page.AppSettings).to.be.an.instanceof(View)
    })

    it('should create Components on the Page for any defined in the PageDefinition', () => {
      page = new Page({
        components: [
          {
            name: 'Modal'
          },
          {
            name: 'Panel'
          }
        ]
      })
      expect(page.Modal).to.be.an.instanceof(Component)
      expect(page.Panel).to.be.an.instanceof(Component)
    })
  })

  describe('goTo method', () => {
    beforeEach(() => {
      global.browser = { get: sinon.spy() }
      page = new Page({path: 'home'})
    })

    it('should go to the path defined for the Page when called with no arguments', () => {
      page.goTo()
      expect(browser.get).to.have.been.calledWith('home')
    })

    it('should return a path relative to the path defined for the Page', () => {
      page.goTo('welcome/landing')
      expect(browser.get).to.have.been.calledWith('home/welcome/landing')
    })

    it('should return the path with a query string if params are given', function () {
      page = new Page({
        path: 'home',
        params: {forever: 'young'}
      })
      page.goTo('welcome/landing')
      expect(browser.get).to.have.been.calledWith('home/welcome/landing?forever=young')
    })

    it('should handle a request object as first positional argument', () => {
      page.goTo({state: 'first'})
      expect(browser.get).to.have.been.calledWith('home?state=first')
    })

    it('should merge query params if params are defined for the Page and provided as an argument', function () {
      page = new Page({
        path: 'home',
        params: {forever: 'young'}
      })
      page.goTo({state: 'first'})
      expect(browser.get).to.have.been.calledWith('home?forever=young&state=first')
    })

    it('should handle a string path as first positional argument and request object as second', () => {
      page.goTo('welcome/landing', {state: 'first'})
      expect(browser.get).to.have.been.calledWith('home/welcome/landing?state=first')

      page = new Page({
        path: 'home',
        params: {forever: 'young'}
      })
      page.goTo('welcome/landing', {state: 'first'})
      expect(browser.get).to.have.been.calledWith('home/welcome/landing?forever=young&state=first')
    })
  })

  describe('$view factory method', function () {
    it('should create a new View attached to this page', () => {
      page = new Page({$path: 'home/page'})
      page.$view({
        name: 'myView',
        locator: '#myView'
      })

      expect(page).to.have.property('myView')
      expect(page.myView).to.be.an.instanceof(View)
      expect(page.myView.$.parent).to.equal(page)
    })
  })

  describe('$component factory method', () => {
    beforeEach(() => {
      page = new Page({path: 'home/page'})
    })

    it('should create Component children', () => {
      page.$component({
        name: 'componentName',
        locator: '.componentSelector'
      })
      expect(page).to.have.property('componentName')
      expect(page.componentName).to.be.an.instanceof(Component)
    })

    it('should return the created Component', () => {
      var component = page.$component({
        name: 'componentName',
        locator: '.componentSelector'
      })
      expect(component).to.be.an.instanceof(Component)
      expect(component).to.equal(page.componentName)
    })
  })
})
