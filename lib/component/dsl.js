/*global browser, element */
/*jshint expr:true */
'use strict';

const { expect } = require('chai').use(require('chai-as-promised'));

/**
 * @method element
 * @memberof Component.prototype
 * @returns {ElementFinder} Returns the {@link http://www.protractortest.org/#/api?view=ElementFinder|ElementFinder} for this component
 */
exports.element = function () {
    const { parent, locator } = this.$;

    if (parent instanceof this.constructor) {
        return parent.element().element(locator);
    }

    return element(locator);
};

/**
 * @method find
 * @memberof Component.prototype
 * @param {ProtractorBy} childLocator - the selector or locator for the desired child element
 * @returns {ElementFinder} Returns the {@link http://www.protractortest.org/#/api?view=ElementFinder|ElementFinder} for the element
 */
exports.find = function (childLocator) {
    return this.element().element(childLocator);
};

/**
 * Retrieves the text from an element and passes the value to the provided callback function
 *
 * @method text
 * @memberof Component.prototype
 *
 * @example
 * expect(component.text()).toMatch(/hello world/ig);
 */
exports.text = function () {
    return this.element().getText();
};

/**
 * Enters a value into an input field
 *
 * @method enter
 * @memberof Component.prototype
 * @param {String} value
 */
exports.enter = function (value) {
    this.element().sendKeys(value);
};

/**
 * Retrieves or enters a value into an input field
 *
 * @method value
 * @memberof Component.prototype
 * @param {String} value
 */
exports.value = function (value) {
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
 * @memberof Component.prototype
 */
exports.isFullyDisplayed = function () {
    this.isVisible();
    if (this.components) {
        for (let i = this.components.length - 1; i >= 0; i--) {
            this[this.components[i]].isFullyDisplayed();
        }
    }
};

/**
 * Performs an angular expectation testing whether this element contains any text
 *
 * @method containsText
 * @memberof Component.prototype
 */
exports.containsText = function () {
    expect(this.text()).to.eventually.match(/[a-zA-Z0-9]+/);
};

/**
 * Performs an angular expectation testing whether this element is not empty
 *
 * @method isNotEmpty
 * @memberof Component.prototype
 */
exports.isNotEmpty = function () {

    // TODO: - whitespace and newlines will return true. Add a flag in future to allow/disallow
    expect(this.element().getInnerHtml()).to.eventually.not.be.empty;
};

/**
 * Performs an angular expectation testing whether this element's text matches the given
 * string or regular expression
 *
 * @method matches
 * @memberof Component.prototype
 * @param {RegExp} match
 *
 * @example
 * component.matches(/hello world/);
 */
exports.matches = function (match) {
    expect(this.text()).to.eventually.match(match);
};

/**
 * Performs an expectation testing whether this component is visible
 *
 * @method isVisible
 * @memberof Component.prototype
 */
exports.isVisible = function () {
    expect(this.element().isDisplayed()).to.eventually.be.true;
};

/**
 * Performs an expectation testing whether component is hidden on page
 *
 * @method isHidden
 * @memberof Component.prototype
 */
exports.isHidden = function () {
    expect(this.element().isDisplayed()).to.eventually.be.false;
};

/**
 * Performs an expectation testing whether component is not in document
 *
 * @method isNotPresent
 * @memberof Component.prototype
 */
exports.isNotPresent = function () {
    expect(this.element().isPresent()).to.eventually.be.false;
};

/**
 * Clicks on the element using the custom angular.anchor dsl
 *
 * @method click
 * @memberof Component.prototype
 */
exports.click = function () {
    this.element().click();
};

/**
 * Simulates keypress of given keycode
 *
 * @method keypress
 * @memberof Component.prototype
 * @param {Number} keyCode
 */
exports.keypress = function (keyCode) {
    this.element().keypress(keyCode);
};

/**
 * Gives focus to the component
 *
 * @method focus
 * @memberof Component.prototype
 */
exports.focus = function () {
    this.element().click();
};

/**
 * Simulates browser drag and drop
 *
 * @method dragTo
 * @memberof Component.prototype
 * @param {Number} x
 * @param {Number} y
 */
exports.dragTo = function (x, y) {
    browser.actions().
        dragAndDrop(this.element(), { x, y }).
        perform();
};

/**
 * Tests this component for having the 'active' class
 *
 * @method isActive
 * @memberof Component.prototype
 */
exports.isActive = function () {
    expect(this.element().getAttribute('class')).to.eventually.match(/active/);
};

/**
 * Tests this component for having the 'selected' class
 *
 * @method isSelected
 * @memberof Component.prototype
 */
exports.isSelected = function () {
    expect(this.element().isSelected()).to.eventually.be.true;
};

/**
 * Tests that this component does not have a 'selected' class
 *
 * @method isNotSelected
 * @memberof Component.prototype
 */
exports.isNotSelected = function () {
    expect(this.element().isSelected()).to.eventually.be.false;
};

/**
 * Tests this component for having the 'disabled' class
 *
 * @method isDisabled
 * @memberof Component.prototype
 */
exports.isDisabled = function () {
    expect(this.element().isEnabled()).to.eventually.be.false;
};

/**
 * Tests this component for not having the 'disabled' class
 *
 * @method isEnabled
 * @memberof Component.prototype
 */
exports.isEnabled = function () {
    expect(this.element().isEnabled()).to.eventually.be.true;
};

/**
 * Tests this component for having the '_blank' href target
 *
 * @method opensNewWindow
 * @memberof Component.prototype
 */
exports.opensNewWindow = function () {
    expect(this.element().getAttribute('target')).to.eventually.match(/_blank/);
};

/**
 * @method count
 * @memberof Component.prototype
 */
exports.count = function () {
    const { parent, locator } = this.$;

    if (parent instanceof this.constructor) {
        return parent.element().all(locator).count();
    }

    return element.all(locator).count();
};

/**
 * @method expectCount
 * @memberof Component.prototype
 * @return {{greaterThan: Function, lessThan: Function, toBe: Function}}
 *
 * @example <pre>
 * component.expectCount().greaterThan(3);
 * component.expectCount().lessThan(7);
 * component.expectCount().toBe(2);
 * </pre>
 */
exports.expectCount = function () {
    const count = this.count();

    return {
        greaterThan(cnt) {
            expect(count).to.eventually.be.above(cnt);
        },

        lessThan(cnt) {
            expect(count).to.eventually.be.at.least(cnt);
        },

        toBe(cnt) {
            expect(count).to.eventually.equal(cnt);
        },
    };
};

/**
 * Creates an iterator for all the elements matching this component's locator and accepts a
 * function of that component type
 *
 * @method all
 * @memberof Component.prototype
 * @param {Function} method
 * @param {Function} then - callback function
 *
 * @example
 * component.all(function(element) { element.click(); });
 */
exports.all = function (method, then) {
    const { parent, locator } = this.$;
    let all;

    if (parent instanceof this.constructor) {
        all = parent.element().all(locator);
    } else {
        all = element.all(locator);
    }

    all.each(element => {
        method(element);
    });

    if (then instanceof Function) {
        then();
    }
};

/**
 * Return the nth element matching this component's locator
 *
 * @method nth
 * @memberof Component.prototype
 * @param {Number} number
 *
 * @example
 * component.nth(3).isDisplayed();
 */
exports.nth = function (number) {
    const { parent, locator } = this.$;

    if (parent instanceof this.constructor) {
        return parent.element().all(locator).get(number);
    }

    return element.all(locator).get(number);
};
