var extend = require('extend');
var Component = require('../component/component');
require('./methods').static(module);

/**
 * A View extends a Component
 *
 * @class View
 * @constructor
 * @borrows Component.$$component as $$component
 * @param {View~ViewDefinition} definition - definition for the view to be created
 */
function View(definition) {
    'use strict';

    extend(this, definition);

    if (this.$path) {
        this.$path = this.$path.replace(/^\/+|\/+$/g, '');
    }

    Component.call(this, this);
}

Component.mixin(View);
extend(View.prototype, require('./dsl'));
module.exports = View;
