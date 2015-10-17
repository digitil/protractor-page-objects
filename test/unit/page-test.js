var sinon = require('./deps').sinon;
var expect = require('./deps').expect;
var Page = require('./deps').Page;
var View = require('./deps').View;
var Component = require('./deps').Component;

// jshint expr:true

describe('Page', function() {
    var page;

    it('should accept path as a positional argument', function(){
        page = new Page('home/page');
        expect(page.getPath()).to.equal('home/page');
    });

    it('should accept object for url query params as positional argument', function() {
        page = new Page('home/page');
        expect(page.getQueryParams()).to.equal('');
        page = new Page('home/page', {test: true, fail: false});
        expect(page.getQueryParams()).to.equal('?test=true&fail=false');
    });

    describe('getPathTo method', function() {
        var path;

        beforeEach(function() {
            page = new Page('home');
        });

        it('should go to the path defined for the Page when called with no arguments', function() {
            path = page.getPathTo();
            expect(path).to.equal('home');
        });

        it('should handle a string path as first positional argument', function() {
            path = page.getPathTo('welcome/landing');
            expect(path).to.equal('home/welcome/landing');
            page = new Page('home', {forever: 'young'});
            path = page.getPathTo('welcome/landing');
            expect(path).to.equal('home/welcome/landing?forever=young');
        });

        it('should handle a request object as first positional argument', function() {
            path = page.getPathTo({state: "first"});
            expect(path).to.equal('home?state=first');
            page = new Page('home', {forever: 'young'});
            path = page.getPathTo({state: "first"});
            expect(path).to.equal('home?forever=young&state=first');
        });

        it('should handle a string path as first positional argument and request object as second', function() {
            path = page.getPathTo('welcome/landing', {state: "first"});
            expect(path).to.equal('home/welcome/landing?state=first');
            page = new Page('home', {forever: 'young'});
            path = page.getPathTo('welcome/landing', {state: "first"});
            expect(path).to.equal('home/welcome/landing?forever=young&state=first');
        });
    });

    it('should create View children', function() {
        page = new Page('home/page');
        page.addView('myView', '#myView');
        expect(page).to.have.property('myView');
        expect(page.myView).to.be.an.instanceof(View);
        expect(page.myView.getParent()).to.equal(page);
    });

    it('should retrieve View children', function() {
        page = new Page('home/page');
        page.addView('myView', '#myView');
        expect(page.getView('myView')).to.be.an.instanceof(View);
    });

    it('should throw Error if requested View does not exist', function() {
        page = new Page('home/page');
        sinon.spy(page, 'getView');
        try { page.getView('myView'); } catch(error) {}
        expect(page.getView).to.have.thrown('Error');
    });

    describe('addComponent method', function() {
        beforeEach(function() {
            page = new Page('home/page');
        });

        it('should create Component children', function() {
            page.addComponent('componentName', '.componentSelector');
            expect(page).to.have.property('componentName');
            expect(page.componentName).to.be.an.instanceof(Component);
        });

        it('should return the created Component', function() {
            var component = page.addComponent('componentName', '.componentSelector');
            expect(component).to.be.an.instanceof(Component);
        });

        it('should be available as alias "component"', function() {
            expect(page.addComponent).to.equal(page.component);
        });
    });
});