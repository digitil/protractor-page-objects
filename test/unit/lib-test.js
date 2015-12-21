var expect = require('./deps').expect;
var PageObjects = require('./deps').PageObjects;
var Page = require('./deps').Page;

describe('PageObjects', function () {
    var app;

    describe('constructor', function () {
        it('should create Page objects from an array of PageDefinition objects', function () {
            app = new PageObjects([
                {name: 'pageOne'},
                {name: 'pageTwo'},
                {name: 'pageThree'}
            ]);

            expect(app).to.have.property('pageOne');
            expect(app).to.have.property('pageTwo');
            expect(app.pageThree).to.be.an.instanceof(Page);
        });

        it('should create Page objects from PageDefinition arguments', function () {
            app = new PageObjects(
                {name: 'pageOne'},
                {name: 'pageTwo'},
                {name: 'pageThree'}
            );

            expect(app).to.have.property('pageOne');
            expect(app).to.have.property('pageTwo');
            expect(app.pageThree).to.be.an.instanceof(Page);
        });
    });

    describe('$$page factory method', function () {
        beforeEach(function() {
            app = new PageObjects();
        });

        it('should create a new Page', function () {
            app.$page({
                name: 'Home'
            });

            expect(app).to.have.property('Home');
            expect(app.Home).to.be.an.instanceof(Page);
        });
    });

});