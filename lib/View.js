module.exports = View;
var Component = require('./Component');
var functions = require('./functions');
var expect = require('chai').use(require('chai-as-promised')).expect;


/**
 * A View extends a Component
 *
 * @class View
 * @constructor
 * @param {String} name
 * @param {String} locator

 * TODO Views shouldn't require a locator
 */
function View(name, locator) {
    Component.call(this, name, locator);
}

Component.mixin(View);

/**
 * Set the name and locator of this view. Changes will recurse down to children
 *
 * @method set
 * @param {String} name
 * @param {String} locator
 * @example <pre>
 *
 *      app.getPage('Page1').getView('MyView').set('YourView', '#second-view');
 * </pre>
 */
View.prototype.set = function(name, locator) {
    if (arguments.length < 2) {
        throw new Error("ArgumentMissing: set(name, locator)");
    }
    this.setName(name);
    this.setLocator(locator);
};

/**
 * Adds a path to this View with path parameter having a colon prefix.
 * Paths should be taken directly from the application routes!
 *
 * @method addPath
 * @chainable
 * @param {String} path a parameterized form of this View's url
 * @return {View}
 * @example <pre>
 *
 *      Classes.getView('MyView').addPath("classes/:classId/assignments");
 * </pre>
 */
View.prototype.addPath = function(path) {
    path = path.replace(/^\/+|\/+$/g, '');
    this.getPath = function() {
        return path;
    };
    return this;
};

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
 *      compass.navigateTo(view.getPathTo({id: 'my-101-id'}));
 *
 *      // e.g. http://localhost/myview/my-101-id/posts?state=no_posts
 *      compass.navigateTo(view.getPathTo({id: 'my-101-id'}, {state: 'no_posts'));
 * </pre>
 */
View.prototype.getPathTo = function(routeParams, queryParams) {
    if (!this.getPath) {
        throw new Error("Undefined path for View: " + this.getName());
    }
    var path = this.getPath();
    var segment;
    for (segment in routeParams) {
        if (routeParams.hasOwnProperty(segment)) {
            path = path.replace(':'.concat(segment), routeParams[segment]);
        }
    }
    if (queryParams) {
        path =  path + '?' + functions.objectToQueryStr(queryParams);
    }
    return path;
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
View.prototype.at = function() {
    var path = this.getPathTo();
    var regex = new RegExp(path.replace(/:[\w\-]+/g, "[^\/]+"));
    expect(browser.getCurrentUrl()).to.eventually.match(regex);
};