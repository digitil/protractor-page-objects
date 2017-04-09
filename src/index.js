'use strict'

const Page = require('./page')

/**
 * Defines a new set of application pages.
 *
 * @constructor
 * @param {Array.<Page~PageDefinition>} pages - definitions for the pages to be added
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
function PageObjects (pages) { // jshint ignore:line
  let definitions = []

  for (let i = arguments.length - 1; i >= 0; i--) {
    definitions = definitions.concat(arguments[i])
  }

  definitions.forEach(pageDefinition => {
    this.$page(pageDefinition)
  })
}

/**
 * Creates a new definition for a page in the application
 *
 * @method $page
 * @memberof PageObjects.prototype
 * @param  {Page~PageDefinition} definition - the definition for the new page
 */
PageObjects.prototype.$page = function (definition) {
  this[definition.name] = new Page(definition)
}

module.exports = PageObjects
