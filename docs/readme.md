The goal of this library is to transform a test like this one 

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

into something easier to write, read and maintain

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

## Defining the page object

`protractor-page-objects` provides a consistent way to define pages using plain old javascript objects. 

```javascript
    {
        name: 'AngularHome',
        path: 'https://angularjs.org',
        components: [
            {
                name: 'Todo',
                locator: by.css('[module=todoApp]'),
                components: [
                    {
                        name: 'list',
                        locator: by.repeater('todo in todoList.todos'),
                        methods: {
                            markCompletedByIndex: function(index) {
                                this.nth(index).element(by.css('input')).click();
                            }
                        }
                    },
                    {
                        name: 'completed',
                        locator: by.css('.done-true')
                    }
                ],
                methods: {
                    addTodo: function(text) {
                        this.element(by.model('todoList.todoText'))
                            .sendKeys(message);
                        this.element(by.css('[value="add"]')).click();
                    }
                }
            }
        ]
    }
```

## Use the object 

The entrypoint is the `PageObjects` class. Page definitions are given as arguments to its constructor.

```javascript
    // use the object we defined above (as angularHomePage)
    var app = new PageObjects(angularHomePage);
    var AngularHome = app.AngularHome;

    describe(function() {
        // continue with the test we had above
        ...
    });
```