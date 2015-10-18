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

    extend(this, definition)

    this.$$parent = function() {
        return this.$parent;
    };

    if ('$methods' in definition) {
        setMethods.call(this);
    }

    if ('$components' in definition) {
        definition.$components.forEach(function (componentDefinition) {
            self.$$component(componentDefinition);
        });
    }
}

/**
 * Provides access to methods that are appropriate for supporting
 * Component in other classes such as View
 * 
 * @param [Constructor] inheritor
 */
Component.mixin = function(inheritor) {
    var methods = ['getHierarchicalName', '$$component'];

    methods.forEach(function(method) {
        inheritor.prototype[method] = Component.prototype[method];
    });
};

/**
 * @method getHierarchicalName
 * @return {String}
 */
Component.prototype.getHierarchicalName = function() {
    if (this.$parent) {
        return this.$parent.getHierarchicalName() + ' -> ' + this.$name;
    }

    return this.$name;
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
Component.prototype.set = function(definition) {
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
 * Determines whether two components are equal by deep comparison
 *
 * @method equals
 * @param  {Component} other - the component to compare to
 * @return {Boolean}
 */
Component.prototype.equals = function(other) {
    if (!(other instanceof Component)) { return false; }

    var i, name;

    if (this.components) {
        for (i = 0; i < this.components.length; i++) {
            name = this.components[i];
            if (!this[name].equals(other[name])) { return false; }
        }
    } else if (other.components) { return false; }

    for (name in this.$methods) {
        if (this[name].toString() != other[name].toString()) { return false; }
    }

    return this.$locator == other.$locator;
};

/**
 * Copies the definition of a component, and its children, as a sibling.
 *
 * @method replicate
 * @chainable
 * @param {ComponentDefinition} definition
 * @example <pre>
 *
 *      myComponent
 *          .$$component({$name: 'box', $locator: '#box-1'})
 *          .$parent
 *          .$$component(myComponent.component('box'), 'box2', '#box-2');
 *
 *      // is equivalent to
 *      myComponent
 *          .$$component({$name: 'box', $locator: '#box-1'})
 *          .replicate({$name: 'box2', $locator: '#box-2'});
 * </pre>
 * @deprecated
 */
Component.prototype.replicate = function(definition) {
    var parent = this.$parent;
    var clone, name;

    if (!parent) {
        throw new Error('No parent to replicate Component onto.');
    }

    definition = extend({
        $locator: this.$locator,
        $parent: parent
    }, definition);

    clone = cloneComponent.call(this);
    clone.set(definition);

    if (clone.methodDefinitions) {
        setMethods.call(clone);
    }

    name = definition.$name;
    parent.components.push(name);
    parent[name] = clone;
    return parent[name];
};

extend(Component.prototype, require('./dsl'));