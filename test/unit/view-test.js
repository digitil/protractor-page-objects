const { sinon, expect, View } = require('./deps');

describe('View', () => {
    describe('constructor', () => {
        let view;

        it('should remove any leading slash from the $path', () => {
            view = new View({
                name: 'name',
                locator: '.selector',
                path: '/some/path'
            });
            expect(view.$.path).to.equal('some/path');
        });

        it('should remove any trailing slash from the $path', () => {
            view = new View({
                name: 'name',
                locator: '.selector',
                path: 'some/path/'
            });
            expect(view.$.path).to.equal('some/path');
        });
    });

    describe('mixins', () => {
        let view;

        beforeEach(() => {
            view = new View({
                name: 'name',
                locator: '.selector'
            });
        });

        it('should provide $component method', () => {
            expect(view).to.respondTo('$component');
        });
    });

    describe('goTo method', () => {
        let view;

        beforeEach(() => {
            global.browser = { get: sinon.spy() };
            view = new View({
                name: 'name',
                locator: '.selector',
                path: '/sample/:parameter/path'
            });
        });

        it('should accept route params object as first positional argument', () => {
            view.goTo({parameter: 'home'});
            expect(browser.get).to.have.been.calledWith('sample/home/path');
        });

        it('should ignore unrecognized route params', () => {
            view.goTo({parameter: 'home', foo: 'bar'});
            expect(browser.get).to.have.been.calledWith('sample/home/path');
        });

        it('should accept query param object as second positional argument', () => {
            view.goTo(null, {hello: 'world', foo: 'bar'});
            expect(browser.get).to.have.been.calledWith('sample/:parameter/path?hello=world&foo=bar');

            view.goTo({parameter: 'home'}, {hello: 'world', foo: 'bar'});
            expect(browser.get).to.have.been.calledWith('sample/home/path?hello=world&foo=bar');
        });
    });
});