# protractor-page-objects

[![npm version](https://img.shields.io/npm/v/protractor-page-objects.svg)](https://www.npmjs.com/package/protractor-page-objects)
[![license](https://img.shields.io/github/digitil/protractor-page-objects.svg)](https://www.npmjs.com/package/protractor-page-objects)
[![Build Status](https://travis-ci.org/digitil/protractor-page-objects.svg)](https://travis-ci.org/digitil/protractor-page-objects)
[![Coverage Status](https://coveralls.io/repos/digitil/protractor-page-objects/badge.svg?branch=master&service=github)](https://coveralls.io/github/digitil/protractor-page-objects?branch=master)

[![NPM](https://nodei.co/npm/protractor-page-objects.png)](https://www.npmjs.com/package/protractor-page-objects)

A page-object factory for [Protractor][].

Using page objects makes it easier to interact with elements on the page. Rather than redefine actions or components in the app, use page objects to encapsulate that information, "DRY" up test code, and make scenarios easier to read and maintain.

This library provides a DSL for creating page objects that model the hierarchical structure of HTML and custom assertions that can be used when writing end-to-end tests.

For more motivation on using page objects, there's a great, short article by Martin Fowler on what a page object is and why they are useful. [PageObject](http://martinfowler.com/bliki/PageObject.html).

Transform a test like this one

```javascript
    describe('angularjs homepage todo list', function() {
      it('should add a todo', function() {
        browser.get('https://angularjs.org');

        element(by.model('todoList.todoText')).sendKeys('write first protractor test');
        element(by.css('[value="add"]')).click();

        var todoList = element.all(by.repeater('todo in todoList.todos'));
        expect(todoList.count()).toEqual(3);
        expect(todoList.get(2).getText()).toEqual('write first protractor test');

        // You wrote your first test, cross it off the list
        todoList.get(2).element(by.css('input')).click();
        var completedAmount = element.all(by.css('.done-true'));
        expect(completedAmount.count()).toEqual(2);
      });
    });
```

into

```javascript
    describe('angularjs homepage todo list', function() {
      it('should add a todo', function() {
        AngularHome.goTo();
        AngularHome.Todo.addTodo('write first protractor test');
        var todoList = AngularHome.Todo.list;
        todoList.expectCount().toBe(3);
        expect(todoList.nth(2).getText()).toEqual('write first protractor test');

        // You wrote your first test, cross it off the list
        todoList.markCompletedByIndex(2);
        AngularHome.Todo.completed.expectCount().toBe(2);
      });
    });
```

# Getting started

    npm install protractor-page-objects --save

Check out the API and examples in the [docs](http://digitil.github.io/protractor-page-objects/)

# For contributors

Contributions are very much welcomed and appreciated. Feel free to open an issue or a pull request.

This project uses [npm][] and [gulp][].

1. Install dependencies

    `npm install`

2. Test your changes

    `gulp`

    In lieu of a formal styleguide, javascript files are linted as part of the default gulp task.

3. Update the docs

    `gulp jsdoc`

4. Freeze any dependency versions before committing

    `npm shrinkwrap`

[protractor]: http://www.protractortest.org/
[npm]: https://www.npmjs.com/#getting-started
[gulp]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
