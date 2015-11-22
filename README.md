# protractor-page-objects

A page-object factory for [Protractor][].

Using page objects makes it easier to interact with elements on the page. Rather than redefine actions or components in the app, use page objects to encapsulate that information, "DRY" up test code, and make scenarios easier to read and maintain. 

This library provides a DSL for creating page objects that model the hierarchical structure of HTML and custom assertions that can be used when writing end-to-end tests.

For more motivation on using page objects, there's a great, short article by Martin Fowler on what a page object is and why they are useful. [PageObject](http://martinfowler.com/bliki/PageObject.html).

# Getting started

    npm install protractor-page-objects --save

The API documentation can be found at [docs/api.md](docs/api.md).

Examples are provided in the [examples](examples/index.md) directory.

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