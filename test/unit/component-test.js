const { sinon, expect, Component } = require('./deps');

describe('Component', () => {
    let component;

    beforeEach(() => {
        component = new Component({
            name: 'name',
            locator: '.selector'
        });
    });

    describe('constructor', () => {
        it('should create child Components for any defined in ComponentDefinition', () => {
            component = new Component({
                components: [
                    { name: 'toolbox' },
                    { name: 'header' }
                ]
            });
            expect(component.toolbox).to.be.an.instanceof(Component);
            expect(component.header).to.be.an.instanceof(Component);
        });
    });

    describe('mixin class method', () => {
        it('should have mixin method for inheritable methods', () => {
            function MyClass() {}
            Component.mixin(MyClass);
            const instance = new MyClass();
            expect(instance).to.respondTo('$component');
        });
    });

    describe('$component as factory method', () => {
        it('should create component instances', () => {
            const button = component.$component({
                name: 'button',
                locator: '.btn'
            });
            expect(button).to.be.an.instanceof(Component);
        });

        it('should create a property on the instance', () => {
            const button = component.$component({
                name: 'button',
                locator: '.btn'
            });
            expect(component).to.have.property('button');
            expect(component.button).to.equal(button);
        });
    });

    describe('$component as accessor method', () => {
        let child;

        beforeEach(() => {
            child = component.$component({
                name: 'button',
                locator: '.btn'
            });
        });

        it('should retrieve a defined Component', () => {
            expect(component.$component('button')).to.equal(child);
        });

        it('should throw Error if requested Component is not defined', () => {
            const spy = sinon.spy(component, '$component');
            try { component.$component('foo'); } catch(error) {}
            expect(spy).to.have.thrown('ReferenceError');
        });
    });

    describe('$component as clone method', () => {
        let copied;

        beforeEach(() => {
            copied = new Component({
                name: 'copied',
                locator: '.copied',
                methods: {
                    whoami() {
                        return `I am ${this.$.name} with selector ${this.$.locator}`;
                    }
                }
            });
        });

        it('should add the copied Component as a child', () => {
            component.$component(new Component({
                name: 'copied',
                locator: '.copied'
            }));
            expect(component).to.have.property('copied');
            expect(component.copied).to.be.instanceof(Component);
        });

        it('should accept a new name and locator', () => {
            component.$component(copied, {
                name: 'foo',
                locator: '.bar'
            });
            expect(component).not.to.have.property('copied');
            expect(component).to.have.property('foo');
            expect(copied.$.locator).to.equal('.copied');
            expect(component.foo.$.locator).to.equal('.bar');
        });

        it('should update reference to `this` in any added methods', () => {
            component.$component(copied, {
                name: 'changed',
                locator: '.changed'
            });
            expect(copied.whoami()).to.equal("I am copied with selector .copied");
            expect(component.changed.whoami()).to.equal("I am changed with selector .changed");
        });
    });

    describe('$methods property', () => {
        beforeEach(function () {
            component = new Component({
                name: 'name', 
                locator: '.selector',
                methods: {
                    foo(bar) { return bar; },
                    getButtonSelector() {
                        return this.button.$.locator;
                    }
                }
            });
        });

        it('should define methods on the component', () => {
            expect(component).to.respondTo('foo');
            expect(component.foo('bar')).to.equal('bar');
        });

        it('should define instance methods', () => {
            component.$component({
                name: 'button',
                locator: '.my-button-selector'
            });
            expect(component.getButtonSelector()).to.equal('.my-button-selector');
        });
    });

    describe('set method', () => {
        let parent;

        beforeEach(() => {
            parent = new Component({
                name: 'parent',
                locator: '#parent'
            });
        });

        it('should update name, selector and parent', () => {
            component.$set({
                name: 'newName',
                locator: '.newSelector',
                parent
            });
            expect(component.$.name).to.equal('newName');
            expect(component.$.locator).to.equal('.newSelector');
            expect(component.$.parent).to.equal(parent);
            expect(component.$parent()).to.equal(parent);
        });

        it('should update hierarchical information', () => {
            component.$set({
                name: 'newName',
                locator: '.newSelector',
                parent
            });
            const hierarchy = component.$hierarchy().map(c => c.$.name).join(' -> ');
            expect(hierarchy).to.equal('parent -> newName');
        });

        it('should update hierarchical information in child Component', () => {
            const child = component.$component({
                name: 'child',
                locator: '.child'
            });
            component.$set({
                name: 'newName',
                locator: '.newSelector',
                parent: parent
            });
            const hierarchy = child.$hierarchy().map(c => c.$.name).join(' -> ');
            expect(hierarchy).to.equal('parent -> newName -> child');
        });
    });

    describe('$parent method', () => {
        it('should return the parent Component when called without an argument', () => {
            const child = component.$component({
                name: 'hello',
                locator: '.world'
            });
            expect(child.$.parent).to.equal(component);
            expect(child.$parent()).to.equal(component);
        });
    });

    describe('equals method', () => {
        it('should return false if either argument is not a Component', () => {
            const a = new Component({name: 'hello'});
            const b = {name: 'hello'};
            const c = new Component({name: 'hello'});
            expect(Component.equals(a, b)).to.be.false;
            expect(Component.equals(a, c)).to.be.true;
        });

        it('should return false if there are missing subcomponents', () => {
            const a = new Component({
                components: [
                    {name: 'hello'},
                    {name: 'world'}
                ]
            });
            const b = new Component({
                components: [
                    {name: 'hello'}
                ]
            });
            const c = new Component({
                components: [
                    {name: 'hello'},
                    {name: 'world'}
                ]
            });
            const d = new Component({});
            expect(Component.equals(a, b)).to.be.false;
            expect(Component.equals(a, d)).to.be.false;
            expect(Component.equals(a, c)).to.be.true;
        });

        it('should return false if subcomponents are not equal', () => {
            console.log('should return false if subcomponents are not equal');
            const a = new Component({
                components: [
                    {name: 'hello', locator: '.world'}
                ]
            });
            const b = new Component({
                components: [
                    {name: 'hello', locator: '#world'}
                ]
            });
            expect(Component.equals(a, b)).to.be.false;
        });

        it('should return false if there are missing methods', () => {
            const a = new Component({
                methods: {
                    hello() { return 'world'; }
                }
            });
            const b = new Component({
                methods: {
                    hello() { return 'world'; },
                    foo(bar) { return bar; }
                }
            });
            const c = new Component({
                methods: {
                    hello() { return 'world'; },
                    foo(bar) { return bar; }
                }
            });
            expect(Component.equals(a, b)).to.be.false;
            expect(Component.equals(b, c)).to.be.true;
        });

        it('should return false if methods are defined in one component and not the other', () => {
            const a = new Component({
                methods: {
                    hello() { return 'world'; }
                }
            });
            const b = new Component({});
            expect(Component.equals(a, b)).to.be.false;
            expect(Component.equals(b, a)).to.be.false;
        });

        it('should return false if methods are not equivalent', () => {
            const a = new Component({
                methods: {
                    hello() { return 'world'; }
                }
            });
            const b = new Component({
                methods: {
                    hello(world) { return world; }
                }
            });
            expect(Component.equals(a, b)).to.be.false;
        });
    });
});