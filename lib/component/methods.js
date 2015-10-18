var extend = require('extend');
var Component = require('./component');

exports.addComponent = function (definition) {
    var name = definition.$name;
    var locator = definition.$locator;

    if (!this.components) {
        this.components = [];
    }

    this.components.push(name);
    this[name] = new Component({$name: name, $locator: locator, $parent: this});

    return this[name];
}

exports.getComponent = function (name) {
    if (!this.components || this.components.indexOf(name) === -1 || !this.hasOwnProperty(name)) {
        throw new ReferenceError('No Component "' + name + '" on ' + this.$name);
    }

    return this[name];
}

exports.copyComponent = function (component, definition) {
    if (!(component instanceof Component)) {
        throw new Error('Expected {Component}, but argument is of type {' + component.constructor.name + '}');
    }

    var clone = cloneComponent.call(component);
    var name;

    definition = extend({
        $name: component.$name,
        $locator: component.$locator,
        $parent: this
    }, definition);

    clone.set(definition);

    if ('$methods' in clone) {
        setMethods.call(clone);
    }

    if (!this.components) { this.components = []; }

    name = definition.$name;
    this.components.push(name);
    this[name] = clone;
    return this[name];
}

exports.cloneComponent = function () {
    var copy = new Component({$name: this.$name, $locator: this.$locator, $parent: null});
    var prop, value;

    for (prop in this) {
        if (this.hasOwnProperty(prop) && !copy.hasOwnProperty(prop)) {
            value = this[prop];
            if (value === this) {
                copy[prop] = copy;
            } else if (value instanceof Component) {
                copy[prop] = cloneComponent.call(value);
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

    copy.$methods = this.$methods;
    return copy;
}

// Inspects the method definitions for a component and its hierarchy
// and changes their context
exports.setMethods = function () {
    var method;

    for (var name in this.$methods) {
        method = this.$methods[name];
        this[name] = getMethodWithContext(this, method);
    }

    return this;
}

// @method
// @param {Function|Object} context
// @param {Function} method
// @returns {Function} new function with context updated
function getMethodWithContext(context, fn) {
    'use strict';

    return function() {
        var args = arguments;
        // Performance optimization: http://jsperf.com/apply-vs-call-vs-invoke
        switch (args.length) {
            case  0: return fn.call(context);
            case  1: return fn.call(context, args[0]);
            case  2: return fn.call(context, args[0], args[1]);
            case  3: return fn.call(context, args[0], args[1], args[2]);
            case  4: return fn.call(context, args[0], args[1], args[2], args[3]);
            case  5: return fn.call(context, args[0], args[1], args[2], args[3], args[4]);
            default: return fn.apply(context, args);
        }
    };
}

exports.static = function (scope) {
    for (var name in exports) {
        scope[name] = exports[name];
    }
};
