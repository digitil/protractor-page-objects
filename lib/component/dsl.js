/*global browser, element */
/*jshint expr:true */
'use strict';

var expect = require('chai').use(require('chai-as-promised')).expect;

/**
 * @method element
 * @returns {ElementFinder} Returns the {#link http://www.protractortest.org/#/api?view=ElementFinder|ElementFinder} for this component
 */
exports.element = function() {
    var parent = this.$parent;
    if (parent instanceof this.constructor) {
        return parent.element().element(this.$locator);
    }

    return element(this.$locator);
};

/**
 * Retrieves the text from an element and passes the value to the provided callback function
 *
 * @method text
 *
 * @example
 * expect(component.text()).toMatch(/hello world/ig);
 */
exports.text = function() {
    return this.element().getText();
};

/**
 * Enters a value into an input field
 *
 * @method enter
 * @param {String} value
 */
exports.enter = function(value) {
    this.element().sendKeys(value);
};

/**
 * Retrieves or enters a value into an input field
 *
 * @method value
 * @param {String} value
 */
exports.value = function(value) {
    if (typeof value === 'undefined') {
        return this.element().getAttribute('value');
    }

    this.enter(value);
};

/**
 * Checks that all children are visible.
 * For a component without children, use isVisible()
 *
 * @method isFullyDisplayed
 */
exports.isFullyDisplayed = function() {
    var i;
    this.isVisible();
    if (this.components) {
        for (i = this.components.length - 1; i >= 0; i--) {
            this[this.components[i]].isFullyDisplayed();
        }
    }
};

/**
 * Performs an angular expectation testing whether this element contains any text
 *
 * @method containsText
 */
exports.containsText = function() {
    expect(this.text()).to.eventually.match(/[a-zA-Z0-9]+/);
};

/**
 * Performs an angular expectation testing whether this element is not empty
 *
 * @method isNotEmpty
 */
exports.isNotEmpty = function() {

    // TODO: - whitespace and newlines will return true. Add a flag in future to allow/disallow
    expect(this.element().getInnerHtml()).to.eventually.not.be.empty;
};

/**
 * Performs an angular expectation testing whether this element's text matches the given
 * string or regular expression
 *
 * @method matches
 * @param {RegExp} match
 *
 * @example
 * component.matches(/hello world/);
 */
exports.matches = function(match) {
    expect(this.text()).to.eventually.match(match);
};

/**
 * Performs an expectation testing whether this component is visible
 *
 * @method isVisible
 */
exports.isVisible = function() {
    expect(this.element().isDisplayed()).to.eventually.be.true;
};

/**
 * Performs an expectation testing whether component is hidden on page
 *
 * @method isHidden
 */
exports.isHidden = function() {
    expect(this.element().isDisplayed()).to.eventually.be.false;
};

exports.isNotPresent = function() {
    expect(this.element().isPresent()).to.eventually.be.false;
};

/**
 * Clicks on the element using the custom angular.anchor dsl
 *
 * @method click
 */
exports.click = function() {
    this.element().click();
};

/**
 * Simulates keypress of given keycode
 *
 * @method keypress
 * @param {Number} keyCode
 */
exports.keypress = function(keyCode) {
    this.element().keypress(keyCode);
};

exports.focus = function() {
    this.element().click();
};

/**
 * Simulates browser drag and drop
 *
 * @method dragTo
 * @param {Number} x
 * @param {Number} y
 */
exports.dragTo = function(x, y) {
    browser.actions().
        dragAndDrop(this.element(), {x: x, y: y}).
        perform();
};

/**
 * Tests this component for having the 'active' class
 *
 * @method isActive
 */
exports.isActive = function() {
    expect(this.element().getAttribute('class')).to.eventually.match(/active/);
};

/**
 * Tests this component for having the 'selected' class
 *
 * @method isSelected
 */
exports.isSelected = function() {
    expect(this.element().isSelected()).to.eventually.be.true;
};

/**
 * Tests that this component does not have a 'selected' class
 *
 * @method isNotSelected
 */
exports.isNotSelected = function() {
    expect(this.element().isSelected()).to.eventually.be.false;
};

/**
 * Tests this component for having the 'disabled' class
 *
 * @method isDisabled
 */
exports.isDisabled = function() {
    expect(this.element().isEnabled()).to.eventually.be.false;
};

/**
 * Tests this component for not having the 'disabled' class
 *
 * @method isEnabled
 */
exports.isEnabled = function() {
    expect(this.element().isEnabled()).to.eventually.be.true;
};

/**
 * Tests this component for having the '_blank' href target
 *
 * @method opensNewWindow
 */
exports.opensNewWindow = function() {
    expect(this.element().getAttribute('target')).to.eventually.match(/_blank/);
};

/**
 * @method count
 */
exports.count = function() {
    var parent = this.$parent;
    if (parent instanceof this.constructor) {
        return parent.element().all(this.$locator).count();
    }

    return element.all(this.$locator).count();
};

/**
 * @method expectCount
 * @return {{greaterThan: Function, lessThan: Function, toBe: Function}}
 *
 * @example <pre>
 * component.expectCount().greaterThan(3);
 * component.expectCount().lessThan(7);
 * component.expectCount().toBe(2);
 * </pre>
 */
exports.expectCount = function() {
    var count = this.count();
    return {
        greaterThan: function(cnt) {
            expect(count).to.eventually.be.above(cnt);
        },

        lessThan: function(cnt) {
            expect(count).to.eventually.be.at.least(cnt);
        },

        toBe: function(cnt) {
            expect(count).to.eventually.equal(cnt);
        },
    };
};

/**
 * Creates an iterator for all the elements matching this component's locator and accepts a
 * function of that component type
 *
 * @method all
 * @param {Function} method
 * @param {Function} then - callback function
 *
 * @example
 * component.all(function(element) { element.click(); });
 */
exports.all = function(method, then) {
    var parent = this.$parent;
    var all;

    then = then || function() {};

    if (parent instanceof this.constructor) {
        all = parent.element().all(this.$locator);
    } else {
        all = element.all(this.$locator);
    }

    all.each(function(element) {
        method(element);
    });

    then();
};

/**
 * Return the nth element matching this component's locator
 *
 * @method nth
 * @param {int} number
 *
 * @example
 * component.nth(3).isDisplayed();
 */
exports.nth = function(number) {
    var parent = this.$parent;
    if (parent instanceof this.constructor) {
        return parent.element().all(this.$locator).get(number);
    }

    return element.all(this.$locator).get(number);
};
