'use strict'

const extend = require('extend')
const View = require('../view')
const Component = require('../component')
require('./methods').static(module)

/**
 * A Page represents one of the main application pages.
 *
 * @class Page
 * @constructor
 * @param {Page~PageDefinition} definition
 */
function Page (definition) {
  this.$ = definition

  if (definition.views) {
    definition.views.forEach(viewDefinition => {
      this.$view(viewDefinition)
    })
  }

  if (definition.components) {
    definition.components.forEach(componentDefinition => {
      this.$component(componentDefinition)
    })
  }
}

/**
 * Adds a View to a Page
 *
 * @method $view
 * @memberof Page.prototype
 * @param {View~ViewDefinition} definition
 * @return {View}
 */
Page.prototype.$view = function (definition) {
  const { name } = definition
  const view = new View(definition)

  view.$.parent = this
  this[name] = view
  return this[name]
}

/**
 * Adds a Component to the page
 *
 * @method $component
 * @memberof Page.prototype
 * @param  {Component~ComponentDefinition} definition
 * @return {Component}
 */
Page.prototype.$component = function (definition) {
  const { name } = definition

  this[name] = new Component(definition)
  return this[name]
}

extend(Page.prototype, require('./dsl'))
module.exports = Page
