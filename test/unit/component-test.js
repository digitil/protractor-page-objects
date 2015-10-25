var sinon = require('./deps').sinon;
var expect = require('./deps').expect;
var Component = require('./deps').Component;

describe('Component', function() {
    var component;

    beforeEach(function() {
        component = new Component({$name: 'name', $locator: '.selector'});
    });

    describe('constructor', function () {
        it('should set properties based on provided ComponentDefinition', function() {
            expect(component.$name).to.equal('name');
            expect(component.$locator).to.equal('.selector');
        });
    });

    describe('mixin class method', function () {
        it('should have mixin method for inheritable methods', function() {
            function MyClass() {}
            Component.mixin(MyClass);
            var instance = new MyClass();
            expect(instance).to.respondTo('$$component');
        });
    });

    describe('$$component as factory method', function() {
        it('should create component instances', function() {
            var button = component.$$component({$name: 'button', $locator: '.btn'});
            expect(button).to.be.an.instanceof(Component);
        });

        it('should create a property on the instance', function() {
            var button = component.$$component({$name: 'button', $locator: '.btn'});
            expect(component).to.have.property('button');
            expect(component.button).to.equal(button);
        });
    });

    describe('$$component as accessor method', function() {
        var child;

        beforeEach(function() {
            child = component.$$component({$name: 'button', $locator: '.btn'});
        });

        it('should retrieve a defined Component', function() {
            expect(component.$$component('button')).to.equal(child);
        });

        it('should throw Error if requested Component is not defined', function() {
            var spy = sinon.spy(component, '$$component');
            try { component.$$component('foo'); } catch(error) {}
            expect(spy).to.have.thrown('ReferenceError');
        });
    });

    describe('$$component as clone method', function() {
        var copied;

        beforeEach(function() {
            copied = new Component({
                $name: 'copied',
                $locator: '.copied',
                $methods: {
                    whoami:  function() {
                        return "I am " + this.$name + " with selector " + this.$locator;
                    }
                }
            });
        });

        it('should add the copied Component as a child', function() {
            component.$$component(new Component({$name: 'copied', $locator: '.copied'}));
            expect(component).to.have.property('copied');
            expect(component.copied).to.be.instanceof(Component);
        });

        it('should accept the new name and locator as positional arguments', function() {
            component.$$component(copied, {$name: 'foo', $locator: '.bar'});
            expect(component).not.to.have.property('copied');
            expect(component).to.have.property('foo');
            expect(copied.$locator).to.equal('.copied');
            expect(component.foo.$locator).to.equal('.bar');
        });

        it('should update reference to `this` in any added methods', function() {
            component.$$component(copied, {$name: 'changed', $locator: '.changed'});
            expect(copied.whoami()).to.equal("I am copied with selector .copied");
            expect(component.changed.whoami()).to.equal("I am changed with selector .changed");
        });
    });

    describe('$methods property', function() {
        beforeEach(function () {
            component = new Component({
                $name: 'name', 
                $locator: '.selector',
                $methods: {
                    foo: function (bar) { return bar; },
                    getButtonSelector: function () {
                        return this.button.$locator;
                    }
                }
            });
        });

        it('should define methods on the component', function () {
            expect(component).to.respondTo('foo');
            expect(component.foo('bar')).to.equal('bar');
        });

        it('should define instance methods', function() {
            component.$$component({$name: 'button', $locator: '.my-button-selector'});
            expect(component.getButtonSelector()).to.equal('.my-button-selector');
        });
    });

    describe('set method', function() {
        var parent;

        beforeEach(function () {
            parent = new Component({$name: 'parent', $locator: '#parent'});
        });

        it('should update name, selector and parent', function(){
            component.$$set({$name: 'newName', $locator: '.newSelector', $parent: parent});
            expect(component.$name).to.equal('newName');
            expect(component.$locator).to.equal('.newSelector');
            expect(component.$parent).to.equal(parent);
            expect(component.$$parent()).to.equal(parent);
        });

        it('should update hierarchical information', function(){
            component.$$set({$name: 'newName', $locator: '.newSelector', $parent: parent});
            var hierarchy = component.$$hierarchy().map(function (c) { return c.$name; }).join(' -> ');
            expect(hierarchy).to.equal('parent -> newName');
        });

        it('should update hierarchical information in child Component', function(){
            var child = component.$$component({$name: 'child', $locator: '.child'});
            component.$$set({$name: 'newName', $locator: '.newSelector', $parent: parent});
            var hierarchy = child.$$hierarchy().map(function (c) { return c.$name; }).join(' -> ');
            expect(hierarchy).to.equal('parent -> newName -> child');
        });
    });

    describe('$$parent method', function() {
        it('should return the parent Component when called without an argument', function() {
            var child = component.$$component({$name: 'hello', $locator: '.world'});
            expect(child.$parent).to.equal(component);
            expect(child.$$parent()).to.equal(component);
        });
    });
});