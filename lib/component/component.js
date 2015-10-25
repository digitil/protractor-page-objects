module.exports = Component;
var extend = require('extend');
require('./methods').static(global);

/**
 * A Component can be defined application-wide or be a part of a page.
 * You can define elements and methods on a Component.
 *
 * @class Component
 * @constructor
 * @param {ComponentDefinition} definition
 */
function Component(definition) {
    var self = this;

    extend(this, definition);

    this.$$parent = function() {
        return this.$parent;
    };

    if ('$methods' in definition) {
        setMethods.call(this);
    }

    if ('$components' in definition) {
        definition.$components.forEach(function(componentDefinition) {
            self.$$component(componentDefinition);
        });
    }
}

/**
 * Travels up the component's tree and returns an array containing the
 * component and all of its parents, in the order found.
 *
 * @method $$hierarchy
 * @return {Array}
 */
Component.prototype.$$hierarchy = function() {
    var hierarchy = [];
    var node = this;

    while (node) {
        hierarchy.unshift(node);
        node = node.$parent;
    }

    return hierarchy;
};

/**
 * Sets the properties for a Component. Changes are recursed down to children.
 *
 * @method set
 * @param {ComponentDefinition} definition
 * @example <pre>
 *
 *      component.set({$name: 'list', $locator: '.itemList', $parent: null});
 * </pre>
 */
Component.prototype.$$set = function(definition) {
    this.constructor(definition);
};

/**
 * Add a new component to this component
 *
 * @chainable
 * @param {ComponentDefinition} definition
 *//**
 * Get a previously defined component
 *
 * @chainable
 * @param {String} name
 * @throws {ReferenceError} If the requested component doesn't exist
 *//**
 * Copy an existing component onto this component.
 * The locator for the copied component and its children will become relative to this component.
 * Warning: this method also copies any methods, which may still have reference to the original component.
 * 
 * @chainable
 * @param {Component} component - the component to be copied
 * @param {ComponentDefinition} [definition]
 * @returns {Component} A deep copy of the component
 * @throws {Error} If first argument is not a Component
 */
Component.prototype.$$component = function(component) {
    if (typeof component === 'string') {
        return getComponent.apply(this, arguments);
    }

    if (component instanceof Component) {
        return copyComponent.apply(this, arguments);
    }

    return addComponent.apply(this, arguments);
};

/**
 * Provides access to methods that are appropriate for supporting
 * Component in other classes such as View
 *
 * @param [Constructor] inheritor
 */
Component.mixin = function(inheritor) {
    var methods = ['$$hierarchy', '$$component'];

    methods.forEach(function(method) {
        inheritor.prototype[method] = Component.prototype[method];
    });
};

/**
 * Determines whether two components are equal by deep comparison
 *
 * @method equals
 * @param  {Component} a
 * @param  {Component} b
 * @return {Boolean}
 */
Component.equals = function(a, b) {
    if (!(a instanceof Component && b instanceof Component)) { return false; }

    var i, name;

    if (a.$components) {
        for (name in a.$components) {
            if (!Component.equals(a[name], b[name])) {
                return false;
            }
        }
    } else if (b.$components) {
        return false;
    }

    for (name in a.$methods) {
        if (a[name].toString() != b[name].toString()) {
            return false;
        }
    }

    return a.$locator == b.$locator;
};

extend(Component.prototype, require('./dsl'));