/* global setMethods, getComponent, copyComponent, addComponent */
'use strict'

module.exports = Component
const extend = require('extend')
require('./methods').static(global)

/**
 * A Component can be defined application-wide or be a part of a page.
 * You can define elements and methods on a Component.
 *
 * @class Component
 * @constructor
 * @mixes ComponentTree
 * @param {Component~ComponentDefinition} definition
 */
function Component (definition) {
  this.$ = definition

  if ('methods' in definition) {
    setMethods.call(this)
  }

  if ('components' in definition) {
    definition.components.forEach(componentDefinition => {
      this.$component(componentDefinition)
    })
  }
}

/**
 * Provides methods that are appropriate for supporting Component
 *
 * @private
 * @mixin
 */
const ComponentTree = {
  $parent () {
    return this.$.parent
  },

    /**
     * Travels up the Component tree and returns an array containing the
     * Component and all of its parents, in the order found.
     *
     * @return {Array.<Component|View|Page>}
     */
  $hierarchy () {
    let hierarchy = []
        // jscs:disable safeContextKeyword
    let node = this
        // jscs:enable

    while (node) {
      hierarchy.unshift(node)
      node = node.$.parent
    }

    return hierarchy
  },

    /**
     * Add a new component to this component
     *
     * @param {Component~ComponentDefinition} definition
     *
    *//**
     *
     * Get a previously defined component
     *
     * @param {String} name
     * @returns {Component}
     * @throws {ReferenceError} If the requested component doesn't exist
     *
    *//**
     *
     * Copy an existing component onto this component.
     * The locator for the copied component and its children will become relative to this component.
     * Warning: this method also copies any methods, which may still have reference to the original component.
     *
     * @param {Component} component
     * @param {Component~ComponentDefinition} [definition]
     * @returns {Component} A deep copy of the component
     * @throws {Error} If first argument is not a Component
     */
  $component (component) {
    if (typeof component === 'string') {
      return getComponent.apply(this, arguments)
    }

    if (component instanceof Component) {
      return copyComponent.apply(this, arguments)
    }

    return addComponent.apply(this, arguments)
  }
}

/**
 * Sets the properties for a Component. Changes are recursed down to children.
 *
 * @method set
 * @memberof Component.prototype
 * @param {Component~ComponentDefinition} definition
 *
 * @example
 * component.set({name: 'list', locator: '.itemList', parent: null});
 */
Component.prototype.$set = function (definition) {
  definition = extend({}, this.$, definition)
  this.constructor(definition)
}

/**
 * Provides access to methods that are appropriate for supporting
 * Component in other classes such as View
 *
 * @param {Constructor} inheritor
 */
Component.mixin = function (inheritor) {
  const methods = Object.keys(ComponentTree)

  methods.forEach(method => {
    inheritor.prototype[method] = ComponentTree[method]
  })
}

/**
 * Determines whether two components are equal by deep comparison
 *
 * @method equals
 * @memberof Component
 * @param  {Component} a
 * @param  {Component} b
 * @return {Boolean}
 */
Component.equals = function (a, b) {
  if (!(a instanceof Component && b instanceof Component)) {
    return false
  }

  if (!isEquivalentComponents(a, b)) {
    return false
  }

  if (!isEquivalentMethods(a.$.methods, b.$.methods)) {
    return false
  }

  return a.$.locator === b.$.locator
}

/**
 * @ignore
 * @param  {Component}  a
 * @param  {Component}  b
 * @return {Boolean}
 */
function isEquivalentComponents (a, b) {
  let name

  if (a.$.components && b.$.components) {
    if (a.$.components.length !== b.$.components.length) {
      return false
    }

    for (let i = a.$.components.length - 1; i >= 0; i--) {
      name = a.$.components[i].name

      if (!Component.equals(a[name], b[name])) {
        return false
      }
    }
  } else if (a.$.components || b.$.components) {
    return false
  }

  return true
}

/**
 * @ignore
 * @param  {Object.<String,Function>}  aMethods
 * @param  {Object.<String,Function>}  bMethods
 * @return {Boolean}
 */
function isEquivalentMethods (aMethods, bMethods) {
  if ((aMethods || bMethods) && !(aMethods && bMethods)) {
    return false
  } else if (!(aMethods || bMethods)) {
    return true
  }

  const aNames = Object.keys(aMethods)
  const bNames = Object.keys(bMethods)

  if (aNames.length !== bNames.length) {
    return false
  }

  for (let i = aNames.length - 1, name; i >= 0; i--) {
    name = aNames[i]
    if (aMethods[name].toString() !== bMethods[name].toString()) {
      return false
    }
  }

  return true
}

Component.mixin(Component)
extend(Component.prototype, require('./dsl'))
