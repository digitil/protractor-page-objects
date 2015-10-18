var Page = require('./page/page');

function PageObjects() {
    'use strict';

    var self = this;

    (function PageObjects(args) {
        var definitions = [];

        for (var i = args.length - 1; i >= 0; i--) {
            definitions = definitions.concat(args[i]);
        }

        definitions.forEach(function (pageDefinition) {
            self.$$page(pageDefinition);
        });
    }(arguments));
}

/**
 * @method $$page
 * @description The $$page method is used to create new page objects
 * 
 * @param  {PageDefinition} definition
 */
PageObjects.prototype.$$page = function(definition) {
    this[definition.$name] = new Page(definition);
};

module.exports = PageObjects;