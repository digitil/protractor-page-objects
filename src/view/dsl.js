'use strict'

const { expect } = require('chai').use(require('chai-as-promised'))
const { getPathTo } = require('./methods')

/**
 * Navigates to the path for this View given the appropriate route parameters.
 * Query params may also be added.
 *
 * @method goTo
 * @memberof View.prototype
 * @param {Object} routeParams - a map of replacements for path parameters
 * @param {Object} queryParams - a map of url query parameters
 *
 * @example <pre>
 * view.$path = 'http://localhost/myview/:id/posts'
 *
 * // http://localhost/myview/my-101-id/posts
 * view.goTo({id: 'my-101-id'});
 *
 * // http://localhost/myview/my-101-id/posts?state=no_posts
 * view.goTo({id: 'my-101-id'}, {state: 'no_posts');
 * </pre>
 */
exports.goTo = function (routeParams, queryParams) {
  const path = getPathTo.call(this, routeParams, queryParams)
  browser.get(path)
}

/**
 * Performs an expectation testing that the current route matches the path set for this View
 *
 * @method at
 * @memberof View.prototype
 *
 * @example
 * it('should do something', function(){ myView.at(); });
 */
exports.at = function () {
  const regex = new RegExp(this.$.path.replace(/:[\w-]+/g, '[^/]+'))
  expect(browser.getCurrentUrl()).to.eventually.match(regex)
}
