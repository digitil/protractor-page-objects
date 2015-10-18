module.exports = Page;
var functions = require('../functions');
var View = require('../view/view');
var Component = require('../component/component');
var extend = require('extend');
var querystring = require('querystring');
require('./methods').static(module);

/**
 * A Page represents one of the main application pages.
 *
 * @class Page
 * @constructor
 * @param {PageDefinition} definition
 */
 function Page(definition) {
    'use strict';

    var self = this;
    var queryParams = '';

    extend(this, definition);

    this.getQueryParams = function() {
        return queryParams;
    };

    this.path = this.$path + this.getQueryParams();

    if (this.$params) {
        queryParams = '?' + querystring.stringify(this.$params);
    }

    if (definition.$views) {
        definition.$views.forEach(function (viewDefinition) {
            self.$$view(viewDefinition);
        });
    }

    if (definition.$components) {
        definition.$components.forEach(function (componentDefinition) {
            self.$$component(componentDefinition);
        });
    }
}

/**
 * Adds a View component to a Page
 *
 * @method $$view
 * @chainable
 * @param {ViewDefinition} definition
 * @return {View}
 */
Page.prototype.$$view = function(definition) {
    var self = this;
    var name = definition.$name;

    this[name] = new View(definition);
    this[name].getParent = functions.parentFunction(self);
    return this[name];
}

/**
 * Adds a Component to the page
 *
 * @method $$component
 * @chainable
 * @param  {ComponentDefinition} definition 
 * @return {Component}
 */
Page.prototype.$$component = function(definition) {
    var name = definition.$name;
    this[name] = new Component(definition);
    return this[name];
};

extend(Page.prototype, require('./dsl'));