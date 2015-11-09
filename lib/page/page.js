'use strict';

var extend = require('extend');
var View = require('../view/view');
var Component = require('../component/component');
require('./methods').static(module);

/**
 * A Page represents one of the main application pages.
 *
 * @class Page
 * @constructor
 * @param {Page~PageDefinition} definition
 */
function Page(definition) {
    var self = this;

    extend(this, definition);

    if (definition.$views) {
        definition.$views.forEach(function(viewDefinition) {
            self.$$view(viewDefinition);
        });
    }

    if (definition.$components) {
        definition.$components.forEach(function(componentDefinition) {
            self.$$component(componentDefinition);
        });
    }
}

/**
 * Adds a View to a Page
 *
 * @method $$view
 * @param {View~ViewDefinition} definition
 * @return {View}
 */
Page.prototype.$$view = function(definition) {
    var name = definition.$name;
    var view = new View(definition);
    view.$parent = this;
    this[name] = view;
    return this[name];
};

/**
 * Adds a Component to the page
 *
 * @method $$component
 * @param  {Component~ComponentDefinition} definition
 * @return {Component}
 */
Page.prototype.$$component = function(definition) {
    var name = definition.$name;
    this[name] = new Component(definition);
    return this[name];
};

extend(Page.prototype, require('./dsl'));
module.exports = Page;
