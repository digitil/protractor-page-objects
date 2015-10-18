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
    var self = this;

    Component.call(this, definition);

    if (definition.$path) {
        this.addPath(definition.$path);
    }
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
    this.$name = name;
    this.$locator = locator;
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

extend(View.prototype, require('./dsl'));