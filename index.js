var changeCase = require('change-case');
var functions = require('./lib/functions');

/**
 * @module compass-for-protractor
 */
var compass = function(options) {
    options = options || {};
    var queryParams;

    if (options.queryParams) {
        queryParams = functions.objectToQueryStr(options.queryParams);
    }

    this.getQueryParams = function() {
        return queryParams;
    };
};

compass.prototype.addPage = function(name, path, params) {
    name = changeCase.pascalCase(name);
    this[name] = new compass.Page(path, params);
    return this[name];
};

/**
 * @param {Page|View} pageOrView
 * @param {String|Object} [pathOrRequest, ...]
 * @param {Object} request
 */
compass.prototype.goTo = function(pageOrView) {
    this.navigateTo(pageOrView.getPathTo.apply(pageOrView, Array.prototype.slice.call(arguments, 1)));
};

/**
 * @method navigateTo
 * @param {String} path
 */
compass.prototype.navigateTo = function(path) {
    var query = this.getQueryParams();
    if (query) {
        path += (path.indexOf('?') >= 0) ? '&' : '?';
        browser.get(path + query);
    } else {
        browser.get(path);
    }
};

compass.Page = require('./lib/Page');
compass.View = require('./lib/View');
compass.Component = require('./lib/Component');
module.exports = compass;
