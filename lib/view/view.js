module.exports = View;
var Component = require('../component/component');
var extend = require('extend');
require('./methods').static(module);


/**
 * A View extends a Component
 *
 * @class View
 * @constructor
 * @param {ViewDefinition} definition
 */
function View(definition) {
    extend(this, definition);

    if (this.$path) {
        this.$path = this.$path.replace(/^\/+|\/+$/g, '');
    }

    Component.call(this, this);
}

Component.mixin(View);

extend(View.prototype, require('./dsl'));