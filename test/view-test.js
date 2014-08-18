var sinon = require('sinon');
var expect = require('chai').use(require('sinon-chai')).expect;
var View = require('../lib/View');

// jshint expr:true
describe('View', function() {
    var view;

    it('should require a name and selector as positional arguments', function() {
        View = sinon.spy(View);

        try { view = new View(); } catch(error) {}
        expect(View).to.have.thrown('Error');

        try { view = new View('name'); } catch(error) {}
        expect(View).to.have.thrown('Error');

        view = new View('name', '.selector');
        expect(view.getName()).to.equal('name');
        expect(view.getLocator()).to.equal('.selector');
    });

    describe('Component mixins', function() {
        beforeEach(function() {
            view = new View('name', '.selector');
        });

        it('should provide addComponent method', function() {
            expect(view).to.respondTo('addComponent');
        });

        it('should provide getComponent method', function() {
            expect(view).to.respondTo('getComponent');
        });

        it('should provide copyComponent method', function() {
            expect(view).to.respondTo('copyComponent');
        });

        it('should provide component method', function() {
            expect(view).to.respondTo('component');
        });

        it('should provide addMethod', function() {
            expect(view).to.respondTo('addMethod');
        });
    });

    describe('instance', function() {
        beforeEach(function() {
            view = new View('name', '.selector');
        });
        
        describe('set method', function() {
            it('should set the name and selector of the View', function() {
                view.set('newName', '#selector');
                expect(view.getName()).to.equal('newName');
                expect(view.getLocator()).to.equal('#selector');
            });

            it('should update parent reference in child components', function() {
                var child = view.addComponent('bottle', '[cap]');
                expect(child.parent().getName()).to.equal('name');
                expect(child.parent().getLocator()).to.equal('.selector');
                expect(child.getHierarchicalName()).to.equal('name -> bottle');
                view.set('newName', '#selector');
                expect(child.parent().getName()).to.equal('newName');
                expect(child.parent().getLocator()).to.equal('#selector');
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

        describe('getPathTo method', function() {
            beforeEach(function() {
                view.addPath('/sample/:parameter/path');
            });

            it('should accept route params object as first positional argument', function() {
                expect(view.getPathTo({parameter: 'home'})).to.equal('sample/home/path');
            });

            it('should ignore unrecognized route params', function() {
                expect(view.getPathTo({parameter: 'home', foo: 'bar'})).to.equal('sample/home/path');
            });

            it('should accept query param object as second positional argument', function() {
                expect(view.getPathTo(null, {hello: 'world', foo: 'bar'})).to.equal('sample/:parameter/path?hello=world&foo=bar');
                expect(view.getPathTo({parameter: 'home'}, {hello: 'world', foo: 'bar'})).to.equal('sample/home/path?hello=world&foo=bar');
            });

            it('should throw Error if no path is defined', function() {
                view = new View('name', '.selector');
                sinon.spy(view, 'getPathTo');
                try { view.getPathTo(); } catch(error) {}
                expect(view.getPathTo).to.have.thrown('Error');
            });
        });
    });

});