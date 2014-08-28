module.exports = Component;
var functions = require('./functions');
var expect = require('chai').use(require('chai-as-promised')).expect;

// jshint expr:true

/**
 * A Component can be defined application-wide or be a part of a page.
 * You can define elements and methods on a Component. If no arguments 
 * are passed to the constructor, an empty Component instance is returned 
 * to faciliate cloning
 *
 * @class Component
 * @constructor
 * @param {String} name
 * @param {Object} locator the locator matching this element from its parent NOT the document root
 * @param {Object} parent can be null
 */
function Component(name, locator, parent) {
    if (!name) {
        throw new Error('Missing argument: name');
    }
    if (typeof locator === 'undefined') {
        throw new Error('Missing argument: locator');
    }

    this.getParent = function() {
        return parent;
    };

    this.parent = function() {
        return this.getParent();
    };

    this.setParent = function(newParent) {
        parent = newParent;
    };

    this.getName = function() {
        return name;
    };

    this.setName = function(newName) {
        name = newName;
    };

    this.getLocator = function() {
        return locator;
    };

    this.setLocator = function(newSelector) {
        locator = newSelector;
    };
}

/**
 * Provides access to methods that are appropriate for supporting 
 * Component in other classes such as View
 * @param [Constructor] inheritor
 */
Component.mixin = function(inheritor){
    var methods = ['getHierarchicalName', 'addComponent', 'getComponent', 'clone', 'copyComponent', 'component', 'addMethod', 'setMethods'];

    methods.forEach(function(method) {
        inheritor.prototype[method] = Component.prototype[method];
    });
};

Component.prototype.getHierarchicalName = function() {
    var parent = this.getParent();
    if (parent) {
        return parent.getHierarchicalName() + ' -> ' + this.getName();
    } 
    return this.getName();
};

/**
 * Sets the properties for a Component. Changes are recursed down to children.
 *
 * @method set
 * @param parent
 * @param {String} name
 * @param {Object} locator
 * @param {Component} [parent]
 * @example <pre>
 *
 *      component.set('list', '.itemList', null);
 * </pre>
 */
Component.prototype.set = function(name, locator, parent) {
    if (arguments.length < 3) {
        throw new Error('ArgumentMissing: set(name, locator, parent)');
    }
    this.setLocator(locator);
    this.setName(name);
    this.getParent = functions.parentFunction(parent);
};

/**
 * @method addComponent
 * @chainable
 * @param {String} name
 * @param {Object} locator
 */
Component.prototype.addComponent = function(name, locator) {
    if (this.hasOwnProperty(name) || this[name]) {
        throw new Error('Component name "' + name + '" is not available on ' + this.getName());
    } else if (!this.components) {
        this.components = [];
    }

    this.components.push(name);
    this[name] = new Component(name, locator, this);

    return this[name];
};

/**
 * @method getComponent
 * @chainable
 * @param {String} name
 */
Component.prototype.getComponent = function(name) {
    if (!this.components || this.components.indexOf(name) === -1 || !this.hasOwnProperty(name)) {
        throw new Error('no Component named "' + name + '" on ' + this.getName());
    }
    return this[name];
};

Component.prototype.equals = function(other) {
    if (!(other instanceof Component)) { return false; }
    var i, name;

    if (this.components) {
        for (i = 0; i < this.components.length; i++) {
            name = this.components[i];
            if (!this[name].equals(other[name])) { return false; }
        }
    } else if (other.components) { return false; }

    for (name in this.methodDefinitions) {
        if (this[name].toString() != other[name].toString()) { return false; }
    }

    return this.getLocator() == other.getLocator();
};

/**
 * Returns a deep copy of the component. Warning: this method also copies any methods
 * created with addMethod, which may still have reference to the original component.
 *
 * @method clone
 * @chainable
 */
Component.prototype.clone = function() {
    var copy = new Component(this.getName(), this.getLocator(), null); 
    var prop, value, isInstanceMethod;
    for (prop in this) {
        if (this.hasOwnProperty(prop) && !copy.hasOwnProperty(prop)) {
            value = this[prop];
            if (value === this) {
                copy[prop] = copy;
            } else if (value instanceof Component) {
                copy[prop] = value.clone();
            } else if (value instanceof Array) {
                copy[prop] = value.slice(0);
            } else if ((value instanceof Function) || value === null) {
                copy[prop] = value;
            } else if (value instanceof Object) {
                copy[prop] = JSON.parse(JSON.stringify(value));
            } else {
                copy[prop] = value;
            }
        }
    }
    copy.methodDefinitions = this.methodDefinitions;
    return copy;
};

/**
 * Makes a copy of a component, modifying the locator on it and its children.
 *
 * @method copyComponent
 * @chainable
 * @param {Component} component
 * @param {String} name
 * @param {Object} locator
 */
Component.prototype.copyComponent = function(component, name, locator) {
    if (!(component instanceof Component)) {
        throw new Error('you can only clone Components');
    }

    name = name || component.getName();

    if (this.hasOwnProperty(name)) {
        throw new Error('property "' + name + '" is already in use on: ' + this.getName());
    }

    var clone = component.clone();
    clone.set(name, locator || clone.getLocator(), this);

    if (clone.methodDefinitions && Object.keys(clone.methodDefinitions).length) {
        clone.setMethods.bind(clone);
        clone.setMethods();
    }

    if (!this.components) { this.components = []; }
    this.components.push(name);

    this[name] = clone;
    return this[name];
};


/**
 * Overloaded method that allows add, get, or copy
 *
 * @method component
 * @chainable
 * @param {mixed} arguments*
 */
Component.prototype.component = function(component) {
    if (typeof component === 'string') {
        if (arguments.length === 1) {
            // get
            return this.getComponent.apply(this, arguments);
        }
        // add
        return this.addComponent.apply(this, arguments);
    }
    // copy
    return this.copyComponent.apply(this, arguments);
};

/**
 * @method addMethod
 * @chainable
 * @param {String} name
 * @param {Function} method accesses the parent instance using 'this'
 * @example <pre>
 *
 *      component.addMethod('clickElt', function() {
 *          this.childComponent.click();
 *      });
 *
 *      component.clickElt();
 * </pre>
 */
Component.prototype.addMethod = function(name, method) {
    if (this.hasOwnProperty(name)) {
        throw new Error('method name "' + name + '" is not available on ' + this.getName());
    }

    if (!this.methodDefinitions) {
        this.methodDefinitions = {};
    } else if (this.methodDefinitions[name]) {
        throw new Error('method name "' + name + '" already in use on ' + this.getName());
    }

    this.methodDefinitions[name] = method;
    this[name] = functions.getMethodWithContext(this, method);

    return this;
};

/**
 * Inspects the method definitions for this component and its hierarchy
 * and changes their context to this component's object
 *
 * @method setMethodChain
 * @chainable
 */
Component.prototype.setMethods = function() {
    var method;
    for (var methodName in this.methodDefinitions) {
        method = this.methodDefinitions[methodName];
        this[methodName] = functions.getMethodWithContext(this, method);
    }

    return this;
};

/**
 * Copies the definition of a component with its children. Slightly more
 * convenient than copyComponent if copying to a sibling
 *
 * @method replicate
 * @chainable
 * @param {String} name
 * @param {Object} locator
 * @example <pre>
 *
 *      myComponent.component('box', '#box-1').parent()
 *          .component(myComponent.component('box'), 'box2', '#box-2');
 *
 *      // is equivalent to
 *      myComponent.component('box', '#box-1')
 *          .replicate('box2', '#box-2');
 * </pre>
 */
Component.prototype.replicate = function(name, locator) {
    if (!name) {
        throw new Error('ArgumentMissing: name');
    }

    var parent = this.parent(), clone;

    if (!parent) {
        throw new Error('No parent to replicate Component onto.');
    }

    if (parent.hasOwnProperty(name) || parent[name]) {
        throw new Error('Property "' + name + '" is already in use on ' + parent.getName());
    }

    clone = this.clone();
    clone.set(name, locator || clone.getLocator(), parent);

    if (clone.methodDefinitions) {
        clone.setMethods.bind(clone);
        clone.setMethods();
    }

    parent.components.push(name);
    parent[name] = clone;
    return parent[name];
};

/**
 * Adds an ng-model by name to an input element
 *
 * @method addModel
 * @chainable
 * @param {String} name
 */
Component.prototype.addModel = function(name) {
    if ((typeof name != 'string') || !name.length) {
        throw new Error("ArgumentError: invalid model");
    }
    this.ngModel = function() {
        return model;
    };
    return this;
};

/**
 * Removes the component and returns its parent
 *
 * @method detach
 * @chainable
 */
Component.prototype.detach = function() {
    var parent = this.getParent();
    if (!parent) {
        throw new Error('No parent to detach Component from.');
    }
    var record = parent.components;
    record.splice(record.indexOf(this.getName()), 1);
    delete parent[this.getName()];
    return parent;
};

/**
 * @method element
 */
Component.prototype.element = function() {
    var parent = this.getParent();
    if (parent instanceof Component) {
        return parent.element().element(this.getLocator());
    }
    return element(this.getLocator());
};

/**
 * Retrieves the text from an element and passes the value to the provided callback function
 *
 * @method text
 * @example <pre>
 *
 *      expect(myElement.text()).to.match(/hello world/ig);
 * </pre>
 */
Component.prototype.text = function() {
    return this.element().getText();
};

/**
 * Enters a value into an input field
 *
 * @method enter
 * @param {String} value
 */
Component.prototype.enter = function(value) {
    this.element().sendKeys(value);
};

/**
 * Retrieves or enters a value into an input field
 *
 * @method value
 * @param {String} value
 */
Component.prototype.value = function(value) {
    if (typeof value === 'undefined') {
        return this.element().getAttribute('value');
    }
    this.enter(value);
};

/**
 * Checks that all children are visible. For a component without children, use
 * isVisible()
 *
 * @method isFullyDisplayed
 */
Component.prototype.isFullyDisplayed = function() {
    var i;
    this.isVisible();
    if (this.components) {
        for ( i = this.components.length - 1; i >= 0; i--) {
            this[this.components[i]].isFullyDisplayed();
        }
    }
};

/**
 * Performs an angular expectation testing whether this element contains any text
 *
 * @method containsText
 */
Component.prototype.containsText = function() {
    expect(this.text()).to.eventually.match(/[a-zA-Z0-9]+/);
};

/**
 * Performs an angular expectation testing whether this element is not empty
 *
 * @method isNotEmpty
 */
Component.prototype.isNotEmpty = function() {
    // TODO - whitespace and newlines will return in a true. Add a flag in future to allow/disallow
    expect(this.element().getInnerHtml()).to.eventually.not.be.empty;
};

/**
 * Performs an angular expectation testing whether this element's text matches the given
 * string or regular expression
 *
 * @method matches
 * @param {RegExp} match
 * @example <pre>
 *
 *      myElement.matches(/hello world/);
 * </pre>
 */
Component.prototype.matches = function(match) {
    expect(this.text()).to.eventually.match(match);
};

/**
 * Performs an expectation testing whether this component is visible
 *
 * @method isVisible
 */
Component.prototype.isVisible = function() {
   expect(this.element().isDisplayed()).to.eventually.be.true;
};

/**
 * Performs an expectation testing whether component is hidden on page
 *
 * @method isHidden
 */
Component.prototype.isHidden = function() {
    expect(this.element().isDisplayed()).to.eventually.be.false;
};

/**
 * Clicks on the element using the custom angular.anchor dsl
 *
 * @method click
 */
Component.prototype.click = function() {
    this.element().click();
};

/**
 * Simulates keypress of given keycode
 *
 * @method keypress
 */
Component.prototype.keypress = function(keyCode) {
    this.element().keypress(keyCode);
};

Component.prototype.focus = function() {
    this.element().click();
};

/**
 * Simulates browser drag and drop
 *
 * @method dragTo
 * @param {Number} x
 * @param {Number} y
 */
Component.prototype.dragTo = function(x, y) {
    browser.actions().
        dragAndDrop(this.element(), {x: x, y: y}).
        perform();
};

/**
 * Tests this component for having the 'active' class
 *
 * @method isActive
 */
Component.prototype.isActive = function() {
    expect(this.element().getAttribute('class')).to.eventually.match(/active/);
};

/**
 * Tests this component for having the 'selected' class
 *
 * @method isSelected
 */
Component.prototype.isSelected = function() {
    expect(this.element().isSelected()).to.eventually.be.true;
};

/**
 * Tests that this component does not have a 'selected' class
 *
 * @method isNotSelected
 */
Component.prototype.isNotSelected = function() {
    expect(this.element().isSelected()).to.eventually.be.false;
};

/**
 * Tests this component for having the 'disabled' class
 *
 * @method isDisabled
 */
Component.prototype.isDisabled = function() {
    expect(this.element().isEnabled()).to.eventually.be.false;
};

/**
 * Tests this component for not having the 'disabled' class
 *
 * @method isEnabled
 */
Component.prototype.isEnabled = function() {
    expect(this.element().isEnabled()).to.eventually.be.true;
};

/**
 * Tests this component for having the '_blank' href target
 *
 * @method opensNewWindow
 */
Component.prototype.opensNewWindow = function() {
    expect(this.element().getAttribute('target')).to.eventually.match(/_blank/);
};

/**
 * @method count
 */
Component.prototype.count = function() {
    var parent = this.getParent();
    if (parent instanceof Component) {
        return parent.element().all(this.getLocator()).count();
    }
    return element.all(this.getLocator()).count();
};

/**
 * @method expectCount
 * @return {Object} greaterThan, lessThan, toBe
 * @example <pre>
 *
 *      component.expectCount().greaterThan(3);
 *      component.expectCount().lessThan(7);
 *      component.expectCount().toBe(2);
 * </pre>
 */
Component.prototype.expectCount = function() {
    var count = this.count();
    return {
        greaterThan : function(cnt) {
            expect(count).to.be.above(cnt);
        },
        lessThan : function(cnt) {
            expect(count).to.be.at.least(cnt);
        },
        toBe : function(cnt) {
            expect(count).to.equal(cnt);
        }
    };
};

/**
 * Creates an iterator for all the elements matching this component's locator and accepts a
 * function of that component type
 *
 * @method all
 * @param {Function} method
 * @param {Function} then - callback function
 * @example <pre>
 *
 *      component.all(function(element) { element.click(); });
 * </pre>
 */
Component.prototype.all = function(method, then) {
    then = then || function(){};

    var parent = this.getParent();
    var all;

    if (parent instanceof Component) {
        all = parent.element().all(this.getLocator());
    } else {
        all = element.all(this.getLocator());
    }

    all.each(function(element) {
        method(element);
    });

    then();
};

/**
 * Return the nth element matching this component's locator
 *
 * @method nth
 * @param {int} number
 * @example <pre>
 *
 *      component.nth(3).isDisplayed();
 * </pre>
 */
Component.prototype.nth = function(number) {
    var parent = this.getParent();
    if (parent instanceof Component) {
        return parent.element().all(this.getLocator()).get(number);
    }
    return element.all(this.getLocator()).get(number);
};
