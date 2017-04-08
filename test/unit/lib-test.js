const { expect, PageObjects, Page } = require('./deps')

describe('PageObjects', () => {
  let app

  describe('constructor', () => {
    it('should create Page objects from an array of PageDefinition objects', () => {
      app = new PageObjects([
                {name: 'pageOne'},
                {name: 'pageTwo'},
                {name: 'pageThree'}
      ])

      expect(app).to.have.property('pageOne')
      expect(app).to.have.property('pageTwo')
      expect(app.pageThree).to.be.an.instanceof(Page)
    })

    it('should create Page objects from PageDefinition arguments', () => {
      app = new PageObjects(
                {name: 'pageOne'},
                {name: 'pageTwo'},
                {name: 'pageThree'}
            )

      expect(app).to.have.property('pageOne')
      expect(app).to.have.property('pageTwo')
      expect(app.pageThree).to.be.an.instanceof(Page)
    })
  })

  describe('$$page factory method', () => {
    beforeEach(() => {
      app = new PageObjects()
    })

    it('should create a new Page', () => {
      app.$page({
        name: 'Home'
      })

      expect(app).to.have.property('Home')
      expect(app.Home).to.be.an.instanceof(Page)
    })
  })
})
