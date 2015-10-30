/*global protractor, browser */

var expect = require('chai').use(require('chai-as-promised')).expect;
var getPathTo = require('./methods').getPathTo;

/**
 * Use to navigate within the views for a Page.
 *
 * @method goTo
 * @param {String} [pathOrRequest] - the path to navigate to relative to this page
 *
 * @example
 * // /todo/create
 * Todo.goTo("create");
 *   
 *//**
 * @method goTo
 * @param {Object} [pathOrRequest] - a map of params to add to path as a query string
 * 
 * @example
 * // /todo?priority=high
 * Todo.goTo({priority: 'high'});
 *
 *//**
 * @method goTo
 * @param {String} [pathOrRequest] - the path to navigate to relative to this page
 * @param {Object} [request] - a map of params to add to path as a query string
 * 
 * @example
 * //todo/edit?id=foo
 * Todo.goTo("edit", {id: 'foo'});
 * 
 */
exports.goTo = function(pathOrRequest, request) {
    'use strict';
    var path = getPathTo.call(this, pathOrRequest, request);
    browser.get(path);
};

/**
 * Performs an expectation on whether the browser is at the path defined for a Page
 *
 * @method at
 */
exports.at = function() {
    'use strict';
    expect(protractor.getCurrentUrl()).to.match(this.path);
};
