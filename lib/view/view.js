'use strict'

const extend = require('extend')
const Component = require('../component/component')
require('./methods').static(module)

/**
 * A View extends a Component
 *
 * @class View
 * @constructor
 * @mixes ComponentTree
 * @param {View~ViewDefinition} definition - definition for the view to be created
 */
function View (definition) {
  this.$ = definition

  if (definition.path) {
    this.$.path = definition.path.replace(/^\/+|\/+$/g, '')
  }

  Component.call(this, this.$)
}

Component.mixin(View)
extend(View.prototype, require('./dsl'))
module.exports = View
