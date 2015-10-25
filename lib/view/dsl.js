var expect = require('chai').use(require('chai-as-promised')).expect;
var getPathTo = require('./methods').getPathTo;

/**
 * Navigates to the path for this View given the appropriate route parameters.
 * Query params may also be added.
 *
 * @method goTo
 * @param {Object} routeParams
 * @param {Object} queryParams
 * @example <pre>
 *
 *      // e.g. http://localhost/myview/my-101-id/posts
 *      view.goTo({id: 'my-101-id'});
 *
 *      // e.g. http://localhost/myview/my-101-id/posts?state=no_posts
 *      view.goTo({id: 'my-101-id'}, {state: 'no_posts');
 * </pre>
 */
exports.goTo = function (routeParams, queryParams) {
    var path = getPathTo.apply(this, arguments);
    browser.get(path);
};

/**
 * Performs an expectation testing that the current route matches the path set for
 * this View
 *
 * @method at
 * @example <pre>
 *
 *      it('should do something', function(){ myView.at(); });
 * </pre>
 */
exports.at = function() {
    var regex = new RegExp(this.$path.replace(/:[\w\-]+/g, "[^\/]+"));
    expect(browser.getCurrentUrl()).to.eventually.match(regex);
};