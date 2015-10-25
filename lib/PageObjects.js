var Page = require('./page/page');

/**
 * Defines a new set of application pages.
 *
 * @constructor
 * @param {Array.<PageDefinition>} pages - definitions for the pages to be added
 *
 * @example <caption>Pass in a variable number of pages</caption>
 * var app = new PageObjects(login, home, settings);
 *
 * @example <caption>Pass in an array of pages</caption>
 * var app = new PageObjects([login, home, settings]);
 *
 * @example <caption>Or mix the two</caption>
 * var app = new PageObjects(login, [home], settings);
 */
function PageObjects(pages) {
    'use strict';
    var self = this;
    var definitions = [];

    for (var i = arguments.length - 1; i >= 0; i--) {
        definitions = definitions.concat(arguments[i]);
    }

    definitions.forEach(function(pageDefinition) {
        self.$$page(pageDefinition);
    });
}

/**
 * Creates a new definition for a page in the application
 *
 * @method $$page
 * @param  {PageDefinition} definition - the definition for the new page
 */
PageObjects.prototype.$$page = function(definition) {
    'use strict';
    this[definition.$name] = new Page(definition);
};

module.exports = PageObjects;