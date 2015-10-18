var expect = require('chai').use(require('chai-as-promised')).expect;
var getPathTo = require('./methods').getPathTo;

/**
 * Use to navigate within the views for a Page.
 *
 * @method goTo
 * @uses browser
 * @param {String|Object} [pathOrRequest]
 * @param {Object} [request] if provided will also to the path with the specified request
 * @example <pre>
 *
 *      /todo/create
 *      Todo.goTo("create");
 *      
 *      /todo?priority=high
 *      Todo.goTo({priority: 'high'});
 *
 *      /todo/edit?id=foo
 *      Todo.goTo("edit", {id: 'foo'});
 *
 * </pre>
 */
exports.goTo = function(pathOrRequest, request) {
    var path = getPathTo.apply(this, arguments);
    browser.get(path);
};

/**
 * Performs an expectation on whether the browser is at the path for a Page
 *
 * @method at
 */
exports.at = function() {
    expect(protractor.getCurrentUrl()).to.match(this.path);
};