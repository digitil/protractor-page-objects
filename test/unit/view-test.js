var sinon = require('./deps').sinon;
var expect = require('./deps').expect;
var View = require('./deps').View;

describe('View', function() {
    var view;

    beforeEach(function() {
        view = new View({$name: 'name', $locator: '.selector'});
    });

    describe('constructor', function () {
        it('should set properties based on ViewDefinition', function() {
            expect(view.$name).to.equal('name');
            expect(view.$locator).to.equal('.selector');
        });

        it('should add the path provided in the ViewDefinition object', function () {
            var view = new View({$name: 'name', $locator: '.selector', $path: '/hello/world/'});
            expect(view).to.respondTo('getPath');
            expect(view.getPath()).to.equal('hello/world');
        });
    });

    describe('mixins', function() {
        it('should provide $$component method', function() {
            expect(view).to.respondTo('$$component');
        });
    });

    describe('set method', function() {
        it('should set the name and selector of the View', function() {
            view.set('newName', '#selector');
            expect(view.$name).to.equal('newName');
            expect(view.$locator).to.equal('#selector');
        });

        it('should update parent reference in child components', function() {
            var child = view.$$component({$name: 'bottle', $locator: '[cap]'});
            expect(child.$parent.$name).to.equal('name');
            expect(child.$parent.$locator).to.equal('.selector');
            expect(child.getHierarchicalName()).to.equal('name -> bottle');
            view.set('newName', '#selector');
            expect(child.$parent.$name).to.equal('newName');
            expect(child.$parent.$locator).to.equal('#selector');
            expect(child.getHierarchicalName()).to.equal('newName -> bottle');
        });

        it('should throw Error if any argument missing', function() {
            sinon.spy(view, 'set');
            try { view.set(); } catch(error) {}
            expect(view.set).to.have.thrown('Error');
            try { view.set('name'); } catch(error) {}
            expect(view.set).to.have.thrown('Error');
        });
    });

    describe('addPath method', function() {
        it('should be chainable', function() {
            var returnValue = view.addPath('some/path');
            expect(returnValue).to.equal(view);
        });

        it('should create a getPath method', function() {
            expect(view).to.not.respondTo('getPath');
            view.addPath('some/path');
            expect(view).to.respondTo('getPath');
            expect(view.getPath()).to.equal('some/path');
        });

        it('should replace any previously added path', function() {
            view.addPath('some/path');
            view.addPath('another/path');
            expect(view.getPath()).to.equal('another/path');
        });

        it('should remove any leading slash', function() {
            view.addPath('/some/path');
            expect(view.getPath()).to.equal('some/path');
        });

        it('should remove any trailing slash', function() {
            view.addPath('some/path/');
            expect(view.getPath()).to.equal('some/path');
        });
    });

    describe('goTo method', function() {
        beforeEach(function() {
            global.browser = { get: sinon.spy() };
            view.addPath('/sample/:parameter/path');
        });

        it('should accept route params object as first positional argument', function() {
            view.goTo({parameter: 'home'});
            expect(browser.get).to.have.been.calledWith('sample/home/path');
        });

        it('should ignore unrecognized route params', function() {
            view.goTo({parameter: 'home', foo: 'bar'})
            expect(browser.get).to.have.been.calledWith('sample/home/path');
        });

        it('should accept query param object as second positional argument', function() {
            view.goTo(null, {hello: 'world', foo: 'bar'});
            expect(browser.get).to.have.been.calledWith('sample/:parameter/path?hello=world&foo=bar');

            view.goTo({parameter: 'home'}, {hello: 'world', foo: 'bar'});
            expect(browser.get).to.have.been.calledWith('sample/home/path?hello=world&foo=bar');
        });
    });
});