/**
 * The definition object for a Page
 *
 * @typedef {Object} Page~PageDefinition
 * @property {String} $name - the name of the page
 * @property {String} $path - the relative path to this page
 * @property {Object} $params - a map of query params to set when navigating to this page
 * @property {Array.<ComponentDefinition>} [$components] - components to add to this Page
 */

/**
 * The definition object for a View
 *
 * @typedef {Object} View~ViewDefinition
 * @property {String} $name - the name of the page
 * @property {String} $locator - the locator for this page (can be a css selector or a {#link http://www.protractortest.org/#/api?view=ProtractorBy|ProtractorBy} locator)
 * @property {Array.<ComponentDefinition>} [$components] - components to add to this View
 */

/**
 * The definition object for a Component
 *
 * @typedef {Object} Component~ComponentDefinition
 * @property {String} $name - the name of the component
 * @property {String} $locator - the locator for this component (can be a css selector or a {#link http://www.protractortest.org/#/api?view=ProtractorBy|ProtractorBy} locator)
 * @property {Component|View|Page} [$parent] - the parent component for this component. $locator should be relative to this parent.
 * @property {Object.<String, Function>} [$methods] - a map of functions to be added as instance methods to this component
 * @property {Array.<ComponentDefinition>} [$components] - sub-components to add to this Component
 */