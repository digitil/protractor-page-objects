var sinon = require('./deps').sinon;
var expect = require('./deps').expect;
var Component = require('./deps').Component;

// jshint expr:true
describe('Component', function() {
    var component;

    it('should require a name and locator as positional arguments', function() {
        Component = sinon.spy(Component);
        try { component = new Component(); } catch(error) {}
        expect(Component).to.have.thrown('Error');
        try { component = new Component('name'); } catch(error) {}
        expect(Component).to.have.thrown('Error');
        component = new Component('name', '.selector');
        expect(component.getName()).to.equal('name');
        expect(component.getLocator()).to.equal('.selector');
    });

    it('should have mixin method for inheritable properties', function() {
        function MyClass() {}
        Component.mixin(MyClass);
        var instance = new MyClass();
        expect(instance).to.respondTo('addComponent');
        expect(instance).to.respondTo('getComponent');
        expect(instance).to.respondTo('copyComponent');
        expect(instance).to.respondTo('component');
        expect(instance).to.respondTo('addMethod');
    });

    describe('instance', function() {
        beforeEach(function() {
            component = new Component('name', '.selector');
        });

        describe('addComponent method', function() {
            it('should create component instances', function() {
                var button = component.addComponent('button', '.btn');
                expect(button).to.be.an.instanceof(Component);
            });

            it('should create a property on the instance', function() {
                var button = component.addComponent('button', '.btn');
                expect(component).to.have.property('button');
                expect(component.button).to.equal(button);
            });
        });

        describe('getComponent method', function() {
            var child;

            beforeEach(function() {
                child = component.addComponent('button', '.btn');
            });

            it('should retrieve a defined Component', function() {
                expect(component.getComponent('button')).to.equal(child);
            });

            it('should throw Error if requested Component is not defined', function() {
                var spy = sinon.spy(component, 'getComponent');
                try { component.getComponent('foo'); } catch(error) {}
                expect(spy).to.have.thrown('Error');
            });
        });

        describe('addMethod method', function() {
            it('should provide addMethod', function() {
                component.addMethod('foo', function(bar) {
                    return bar;
                });
                expect(component).to.respondTo('foo');
                expect(component.foo('bar')).to.equal('bar');
            });

            it('show throw Error if addMethod requests a property in use', function() {
                spy = sinon.spy(component, 'addMethod');
                component.addMethod('foo', function() {});
                try {
                    component.addMethod('foo', function(){});
                } catch(error) {}
                expect(component.addMethod).to.have.thrown('Error');
            });

            it('should the instance as the value of `this` within the function', function() {
                component.addMethod('getButtonSelector', function() {
                    return this.button.getLocator();
                });
                component.addComponent('button', '.my-button-selector');
                expect(component.getButtonSelector()).to.equal('.my-button-selector');
            });
        });

        describe('set method', function() {
            it('should throw Error if any argument missing', function() {
                sinon.spy(component, 'set');
                try { component.set(); } catch(error) {}
                expect(component.set).to.have.thrown('Error');
                try { component.set('name'); } catch(error) {}
                expect(component.set).to.have.thrown('Error');
                try { component.set('name', '.selector'); } catch(error) {}
                expect(component.set).to.have.thrown('Error');
            });

            it('should update name, selector and parent', function(){
                var parent = new Component('parent', '#parent');
                component.set('newName', '.newSelector', parent);
                expect(component.getName()).to.equal('newName');
                expect(component.getLocator()).to.equal('.newSelector');
                expect(component.getParent()).to.equal(parent);
                expect(component.parent()).to.equal(parent);
            });

            it('should update hierarchical information', function(){
                var parent = new Component('parent', '#parent');
                component.set('newName', '.newSelector', parent);
                expect(component.getHierarchicalName()).to.equal('parent -> newName');
            });

            it('should update hierarchical information in child Component', function(){
                var child = component.addComponent('child', '.child');
                var parent = new Component('parent', '#parent');
                component.set('newName', '.newSelector', parent);
                expect(child.getHierarchicalName()).to.equal('parent -> newName -> child');
            });
        });

        describe('clone method', function(){
            var clone;

            it('should create a copy of the component', function() {
                clone = component.clone();
                expect(component.equals(clone)).to.be.true;
            });

            it('should copy any child elements', function() {
                component.addComponent('child', '.child');
                clone = component.clone();
                expect(component.equals(clone)).to.be.true;
            });

            it('should copy any defined methods', function() {
                component.addMethod('foo', function(bar) { return bar; });
                clone = component.clone();
                expect(component.equals(clone)).to.be.true;
            });
        });

        describe('copyComponent method', function() {
            var copied;

            beforeEach(function() {
                copied = new Component('copied', '.copied');
            });

            it('should require a Component as first positional argument', function() {
                sinon.spy(component, 'copyComponent');
                try { component.copyComponent(); } catch(error) {}
                expect(component.copyComponent).to.have.thrown('Error');
                try { component.copyComponent('string'); } catch(error) {}
                expect(component.copyComponent).to.have.thrown('Error');
                try { component.copyComponent(42); } catch(error) {}
                expect(component.copyComponent).to.have.thrown('Error');
                try { component.copyComponent({}); } catch(error) {}
                expect(component.copyComponent).to.have.thrown('Error');
                try { component.copyComponent(null); } catch(error) {}
                expect(component.copyComponent).to.have.thrown('Error');
            });

            it('should add the copied Component as a child', function() {
                component.copyComponent(new Component('copied', '.copied'));
                expect(component).to.have.property('copied');
                expect(component.copied).to.be.instanceof(Component);
            });

            it('should accept the new name and locator as positional arguments', function() {
                component.copyComponent(copied, 'foo', '.bar');
                expect(component).not.to.have.property('copied');
                expect(component).to.have.property('foo');
                expect(copied.getLocator()).to.equal('.copied');
                expect(component.foo.getLocator()).to.equal('.bar');
            });

            it('should update reference to `this` in any added methods', function() {
                copied.addMethod('whoami', function() {
                    return "I am " + this.getName() + " with selector " + this.getLocator();
                });
                component.copyComponent(copied, 'changed', '.changed');
                expect(copied.whoami()).to.equal("I am copied with selector .copied");
                expect(component.changed.whoami()).to.equal("I am changed with selector .changed");
            });
        });

        describe('setMethods method', function(){
            it('should change the context of `this` for all methodDefinitions of the Component', function(){
                var methods = {
                    sayHello: function() {
                        return "Hi my name is " + this.getName();
                    }
                };
                component.methodDefinitions = methods;
                component.setMethods();
                expect(component.sayHello()).to.equal("Hi my name is name");
            });
        });

        describe('replicate method', function() {
            it('should throw Error if name not provided as first positional argument', function() {
                sinon.spy(component, 'replicate');
                try { component.replicate(); } catch(error) {}
                expect(component.replicate).to.have.thrown('Error');
            });

            it('should throw Error if Component has no parent', function() {
                sinon.spy(component, 'replicate');
                try { component.replicate('name'); } catch(error) {}
                expect(component.replicate).to.have.thrown('Error');
            });

            it('should create a sibling Component', function() {
                var child = component.addComponent('child', '.child');
                child.replicate('sibling', '.sibling');
                expect(component).to.have.property('sibling');
                expect(component.sibling).to.be.instanceof(Component);
            });

            it('should copy all elements of the replicated Component', function() {
                var child = component.addComponent('child', '.child');
                child.addMethod('foo', function() { return 'bar'; });
                child.addComponent('grand', '.gc');
                child.replicate('sibling');
                component.sibling.setName('child');
                expect(child.equals(component.sibling)).to.be.true;
            });
        });

        describe('addModel method', function() {
            it('should create ngModel method', function() {
                expect(component).not.to.respondTo('ngModel');
                component.addModel('username');
                expect(component).to.respondTo('ngModel');
            });

            it('should throw Error if name is not provided', function() {
                sinon.spy(component, 'addModel');
                try { component.addModel(null); } catch(error) {}
                expect(component.addModel).to.have.thrown('Error');
            });
        });

        describe('detach method', function() {
            it('should remove the Component from its parent', function() {
                var orphan = component.addComponent('orphan', '.orphan');
                orphan.detach();
                expect(component).not.to.have.property('orphan');
                sinon.spy(component, 'getComponent');
                try { component.getComponent('orphan'); } catch(error) {}
                expect(component.getComponent).to.have.thrown('Error');
            });

            it('should throw Error if Component has no parent', function() {
                sinon.spy(component, 'detach');
                try { component.detach(); } catch(error) {}
                expect(component.detach).to.have.thrown('Error');
            });
        });

        describe('getParent method', function() {
            it('should return the parent Component', function() {
                var child = component.addComponent('hello', '.world');
                expect(child.getParent()).to.equal(component);
                expect(child.parent()).to.equal(component);
            });
        });
    });
});