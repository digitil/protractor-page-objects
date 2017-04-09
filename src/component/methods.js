'use strict'

const extend = require('extend')
const Component = require('./component')

/**
 * Adds a subcomponent to this Component
 *
 * @ignore
 * @param {ComponentDefinition} definition
 * @returns {Component}
 */
exports.addComponent = function (definition) {
  const { name } = definition
  definition.parent = this

    // TODO: remove 'components' property from Components
  if (!this.components) {
    this.components = []
  }

  this.components.push(name)
  this[name] = new Component(definition)

  return this[name]
}

exports.getComponent = function (name) {
  if (!this.components || this.components.indexOf(name) === -1 || !this.hasOwnProperty(name)) {
    throw new ReferenceError(`No Component ${name} on ${this.$.name}`)
  }

  return this[name]
}

exports.copyComponent = function (component, definition) {
  if (component instanceof Component) {
    const clone = exports.cloneComponent.call(component)
    let name

    definition = extend({
      name: component.$.name,
      locator: component.$.locator,
      parent: this
    }, definition)

    clone.$set(definition)

    if ('methods' in clone) {
      exports.setMethods.call(clone)
    }

    if (!this.components) { this.components = [] }

    name = definition.name
    this.components.push(name)
    this[name] = clone
    return this[name]
  }
}

exports.cloneComponent = function cloneComponent () {
  const copy = new Component({
    name: this.$.name,
    locator: this.$.locator,
    parent: null
  })

  Object.keys(this).forEach(prop => {
    if (!copy.hasOwnProperty(prop)) {
      copy[prop] = cloneObject(this[prop])
    }
  })

  copy.$.methods = this.$.methods
  return copy
}

/**
 * Makes a deep copy of an object
 *
 * @ignore
 * @method cloneObject
 * @param  {Object} object
 * @return {Object}
 */
function cloneObject (object) {
  let clone = object

  if (object instanceof Component) {
    clone = exports.cloneComponent.call(object)
  } else if (object instanceof Array) {
    clone = object.slice(0)
  } else if (object instanceof Function || object === null) {
    clone = object
  } else if (object instanceof Object) {
    clone = JSON.parse(JSON.stringify(object))
  }

  return clone
}

/**
 * Inspects the method definitions for a component and its hierarchy and changes their context
 *
 * @ignore
 * @method setMethods
 * @returns {Component}
 */
exports.setMethods = function () {
  let method

  for (let name in this.$.methods) {
    method = this.$.methods[name]
    this[name] = getMethodWithContext(this, method)
  }

  return this
}

/**
 * @ignore
 * @method
 * @param {Function|Object} context
 * @param {Function} fn
 * @returns {Function} new function with context updated
 */
function getMethodWithContext (context, fn) {
  return function () {
    const args = arguments

        // Performance optimization: http://jsperf.com/apply-vs-call-vs-invoke
    switch (args.length) {
      case 0: return fn.call(context)
      case 1: return fn.call(context, args[0])
      case 2: return fn.call(context, args[0], args[1])
      case 3: return fn.call(context, args[0], args[1], args[2])
      case 4: return fn.call(context, args[0], args[1], args[2], args[3])
      case 5: return fn.call(context, args[0], args[1], args[2], args[3], args[4])
      default: return fn.apply(context, args)
    }
  }
}

exports.static = function (scope) {
  for (let name in exports) {
    scope[name] = exports[name]
  }
}
