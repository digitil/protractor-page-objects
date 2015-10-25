var sinon = require('./deps').sinon;
var expect = require('./deps').expect;
var View = require('./deps').View;

describe('View', function() {
    describe('constructor', function () {
        var view;

        it('should set properties based on ViewDefinition', function() {
            view = new View({$name: 'name', $locator: '.selector'});
            expect(view.$name).to.equal('name');
            expect(view.$locator).to.equal('.selector');
        });

        it('should add the path provided in the ViewDefinition object', function () {
            view = new View({$name: 'name', $locator: '.selector', $path: 'hello/world'});
            expect(view.$path).to.equal('hello/world');
        });

        it('should remove any leading slash from the $path', function() {
            view = new View({$name: 'name', $locator: '.selector', $path: '/some/path'});
            expect(view.$path).to.equal('some/path');
        });

        it('should remove any trailing slash from the $path', function() {
            view = new View({$name: 'name', $locator: '.selector', $path: 'some/path/'});
            expect(view.$path).to.equal('some/path');
        });
    });

    describe('mixins', function() {
        var view;

        beforeEach(function () {
            view = new View({$name: 'name', $locator: '.selector'});
        });

        it('should provide $$component method', function() {
            expect(view).to.respondTo('$$component');
        });
    });

    describe('goTo method', function() {
        var view;

        beforeEach(function() {
            global.browser = { get: sinon.spy() };
            view = new View({
                $name: 'name',
                $locator: '.selector',
                $path: '/sample/:parameter/path'
            });
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