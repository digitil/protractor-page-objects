module.exports = Page;
var functions = require('./functions');
var View = require('./View');
var Component = require('./Component');
var expect = require('chai').use(require('chai-as-promised')).expect;

/**
 * A Page represents one of the main application pages.
 *
 * @class Page
 * @constructor
 * @param {String} path
 * @param {Object} params
 */
 function Page(path, params) {
    var queryParams = "";

    this.getPath = function() {
        return path;
    };

    if (params) {
        queryParams = '?' + functions.objectToQueryStr(params);
    }

    this.getQueryParams = function() {
        return queryParams;
    };

    this.path = this.getPath() + this.getQueryParams();
}

/**
 * Use to navigate within the views for a Page.
 *
 * @method goTo
 * @uses browser
 * @param {String|Object} [pathOrRequest]
 * @param {String} [request] if provided will also to the path with the specified request
 * @example <pre>
 *
 *      ClassesPage.goTo("create");
 * </pre>
 * @example <pre>
 *
 *      // go to the data page with no options
 *      compass.navigateTo(page.getPathTo());
 *
 *      // go to the data page with options, e.g. http://localhost/data/page?state=zero%20classes
 *      compass.navigateTo(page.getPathTo({state: "zero classes"}));
 *
 *      // go to a view, specifying options, e.g. http://localhost/data/page/reports/overview?state=zero_classes
 *      compass.navigateTo(page.getPathTo("reports/overview", {state: "zero_classes"}));
 *
 * </pre>
 */
 Page.prototype.getPathTo = function(pathOrRequest, request) {
    var params;
    var path = this.path;

    if ('string' == typeof pathOrRequest) {
        if (request && 'object' == typeof request) {
            params = functions.joinQueryStrings(this.getQueryParams(), functions.objectToQueryStr(request));
            path = [this.getPath(), pathOrRequest].join('/') + params;
        } else {
            path = [this.getPath(), pathOrRequest].join('/') + this.getQueryParams();
        }
    } else if ('object' == typeof pathOrRequest) {
        params = functions.joinQueryStrings(this.getQueryParams(), functions.objectToQueryStr(pathOrRequest));
        path = this.getPath() + params;
    }

    return path;
};

/**
 * Performs an expectation on whether the browser is at the path for a Page
 *
 * @method at
 */
 Page.prototype.at = function() {
    expect(protractor.getCurrentUrl()).to.match(this.path);
};

/**
 * Adds a View component to a Page
 *
 * @method addView
 * @chainable
 * @param {String} name
 * @param {String} selector
 * @return {View}
 */
 Page.prototype.addView = function(name, selector) {
    if (this.hasOwnProperty(name) || this[name]) {
        throw new Error("View name '" + name + "' is not available on Page with path " + this.getPath());
    } else if (!this.views) {
        this.views = [];
    }

    this.views.push(name);
    this[name] = new View(name, selector);
    var self = this;
    this[name].getParent = functions.parentFunction(self);
    return this[name];
};

/**
 * Retrieves a View and throws an error if that View is not found
 *
 * @method getView
 * @chainable
 * @param {String} name
 * @return {View}
 */
 Page.prototype.getView = function(name) {
    if (!this.views || this.views.indexOf(name) === -1 || !this.hasOwnProperty(name)) {
        throw new Error("no View named '" + name + "' on Page with path " + this.getPath());
    }
    return this[name];
};

Page.prototype.addComponent = function(name, locator) {
    this[name] = new Component(name, locator);
    return this[name];
};

Page.prototype.component = Page.prototype.addComponent;
