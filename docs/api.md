## Classes
<dl>
<dt><a href="#Component">Component</a></dt>
<dd><p>Component</p>
</dd>
<dt><a href="#Page">Page</a></dt>
<dd><p>Page</p>
</dd>
<dt><a href="#View">View</a></dt>
<dd><p>View</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#set">set(parent, name, locator, [parent])</a></dt>
<dd><p>Sets the properties for a Component. Changes are recursed down to children.</p>
</dd>
<dt><a href="#addComponent">addComponent(name, locator)</a> ↩︎</dt>
<dd></dd>
<dt><a href="#getComponent">getComponent(name)</a> ↩︎</dt>
<dd></dd>
<dt><a href="#clone">clone()</a> ↩︎</dt>
<dd><p>Returns a deep copy of the component. Warning: this method also copies any methods
created with addMethod, which may still have reference to the original component.</p>
</dd>
<dt><a href="#copyComponent">copyComponent(component, name, locator)</a> ↩︎</dt>
<dd><p>Makes a copy of a component, modifying the locator on it and its children.</p>
</dd>
<dt><a href="#component">component(arguments*)</a> ↩︎</dt>
<dd><p>Overloaded method that allows add, get, or copy</p>
</dd>
<dt><a href="#addMethod">addMethod(name, method)</a> ↩︎</dt>
<dd></dd>
<dt><a href="#setMethodChain">setMethodChain()</a> ↩︎</dt>
<dd><p>Inspects the method definitions for this component and its hierarchy
and changes their context to this component&#39;s object</p>
</dd>
<dt><a href="#replicate">replicate(name, locator)</a> ↩︎</dt>
<dd><p>Copies the definition of a component with its children. Slightly more
convenient than copyComponent if copying to a sibling</p>
</dd>
<dt><a href="#addModel">addModel(name)</a> ↩︎</dt>
<dd><p>Adds an ng-model by name to an input element</p>
</dd>
<dt><a href="#detach">detach()</a> ↩︎</dt>
<dd><p>Removes the component and returns its parent</p>
</dd>
<dt><a href="#element">element()</a></dt>
<dd></dd>
<dt><a href="#text">text()</a></dt>
<dd><p>Retrieves the text from an element and passes the value to the provided callback function</p>
</dd>
<dt><a href="#enter">enter(value)</a></dt>
<dd><p>Enters a value into an input field</p>
</dd>
<dt><a href="#value">value(value)</a></dt>
<dd><p>Retrieves or enters a value into an input field</p>
</dd>
<dt><a href="#isFullyDisplayed">isFullyDisplayed()</a></dt>
<dd><p>Checks that all children are visible. For a component without children, use
isVisible()</p>
</dd>
<dt><a href="#containsText">containsText()</a></dt>
<dd><p>Performs an angular expectation testing whether this element contains any text</p>
</dd>
<dt><a href="#isNotEmpty">isNotEmpty()</a></dt>
<dd><p>Performs an angular expectation testing whether this element is not empty</p>
</dd>
<dt><a href="#matches">matches(match)</a></dt>
<dd><p>Performs an angular expectation testing whether this element&#39;s text matches the given
string or regular expression</p>
</dd>
<dt><a href="#isVisible">isVisible()</a></dt>
<dd><p>Performs an expectation testing whether this component is visible</p>
</dd>
<dt><a href="#isHidden">isHidden()</a></dt>
<dd><p>Performs an expectation testing whether component is hidden on page</p>
</dd>
<dt><a href="#click">click()</a></dt>
<dd><p>Clicks on the element using the custom angular.anchor dsl</p>
</dd>
<dt><a href="#keypress">keypress()</a></dt>
<dd><p>Simulates keypress of given keycode</p>
</dd>
<dt><a href="#dragTo">dragTo(x, y)</a></dt>
<dd><p>Simulates browser drag and drop</p>
</dd>
<dt><a href="#isActive">isActive()</a></dt>
<dd><p>Tests this component for having the &#39;active&#39; class</p>
</dd>
<dt><a href="#isSelected">isSelected()</a></dt>
<dd><p>Tests this component for having the &#39;selected&#39; class</p>
</dd>
<dt><a href="#isNotSelected">isNotSelected()</a></dt>
<dd><p>Tests that this component does not have a &#39;selected&#39; class</p>
</dd>
<dt><a href="#isDisabled">isDisabled()</a></dt>
<dd><p>Tests this component for having the &#39;disabled&#39; class</p>
</dd>
<dt><a href="#isEnabled">isEnabled()</a></dt>
<dd><p>Tests this component for not having the &#39;disabled&#39; class</p>
</dd>
<dt><a href="#opensNewWindow">opensNewWindow()</a></dt>
<dd><p>Tests this component for having the &#39;_blank&#39; href target</p>
</dd>
<dt><a href="#count">count()</a></dt>
<dd></dd>
<dt><a href="#expectCount">expectCount()</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#all">all(method, then)</a></dt>
<dd><p>Creates an iterator for all the elements matching this component&#39;s locator and accepts a
function of that component type</p>
</dd>
<dt><a href="#nth">nth(number)</a></dt>
<dd><p>Return the nth element matching this component&#39;s locator</p>
</dd>
<dt><a href="#goTo">goTo([pathOrRequest], [request])</a></dt>
<dd><p>Use to navigate within the views for a Page.</p>
</dd>
<dt><a href="#at">at()</a></dt>
<dd><p>Performs an expectation on whether the browser is at the path for a Page</p>
</dd>
<dt><a href="#addView">addView(name, selector)</a> ⇒ <code><a href="#View">View</a></code></dt>
<dd><p>Adds a View component to a Page</p>
</dd>
<dt><a href="#getView">getView(name)</a> ⇒ <code><a href="#View">View</a></code></dt>
<dd><p>Retrieves a View and throws an error if that View is not found</p>
</dd>
<dt><a href="#$$register">$$register(definition)</a></dt>
<dd><p>The $$register method is used to create new page objects</p>
</dd>
<dt><a href="#set">set(name, locator)</a></dt>
<dd><p>Set the name and locator of this view. Changes will recurse down to children</p>
</dd>
<dt><a href="#addPath">addPath(path)</a> ⇒ <code><a href="#View">View</a></code></dt>
<dd><p>Adds a path to this View with path parameter having a colon prefix.
Paths should be taken directly from the application routes!</p>
</dd>
<dt><a href="#goTo">goTo(routeParams, queryParams)</a></dt>
<dd><p>Navigates to the path for this View given the appropriate route parameters.
Query params may also be added.</p>
</dd>
<dt><a href="#at">at()</a></dt>
<dd><p>Performs an expectation testing that the current route matches the path set for
this View</p>
</dd>
<dt><a href="#objectToQueryStr">objectToQueryStr(object)</a> ⇒ <code>String</code></dt>
<dd></dd>
<dt><a href="#joinQueryStrings">joinQueryStrings(qs1, qs2)</a> ⇒ <code>String</code></dt>
<dd></dd>
<dt><a href="#changeMethodContext">changeMethodContext(context, methodName, method)</a></dt>
<dd><p>Does not affect original function</p>
</dd>
</dl>
<a name="Component"></a>
## Component
Component

**Kind**: global class  

* [Component](#Component)
  * [new Component(name, locator, parent)](#new_Component_new)
  * [.mixin([Constructor])](#Component.mixin)

<a name="new_Component_new"></a>
### new Component(name, locator, parent)
A Component can be defined application-wide or be a part of a page.
You can define elements and methods on a Component. If no arguments
are passed to the constructor, an empty Component instance is returned
to faciliate cloning


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> |  |
| locator | <code>Object</code> | the locator matching this element from its parent NOT the document root |
| parent | <code>Object</code> | can be null |

<a name="Component.mixin"></a>
### Component.mixin([Constructor])
Provides access to methods that are appropriate for supporting
Component in other classes such as View

**Kind**: static method of <code>[Component](#Component)</code>  

| Param | Description |
| --- | --- |
| [Constructor] | inheritor |

<a name="Page"></a>
## Page
Page

**Kind**: global class  

* [Page](#Page)
  * [new Page(options)](#new_Page_new)
  * [~PageDefinition](#Page..PageDefinition) : <code>Object</code>

<a name="new_Page_new"></a>
### new Page(options)
A Page represents one of the main application pages.


| Param | Type |
| --- | --- |
| options | <code>PageDefinition</code> | 

<a name="Page..PageDefinition"></a>
### Page~PageDefinition : <code>Object</code>
The definition object for a Page

**Kind**: inner typedef of <code>[Page](#Page)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| $name | <code>String</code> | the name of the page |
| $path | <code>String</code> | the relative path to this page |
| $params | <code>Object</code> | a set of query params to set when navigating to this page |

<a name="View"></a>
## View
View

**Kind**: global class  
<a name="new_View_new"></a>
### new View(name, locator)
A View extends a Component


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> |  |
| locator | <code>String</code> | TODO Views shouldn't require a locator |

<a name="set"></a>
## set(parent, name, locator, [parent])
Sets the properties for a Component. Changes are recursed down to children.

**Kind**: global function  

| Param | Type |
| --- | --- |
| parent |  | 
| name | <code>String</code> | 
| locator | <code>Object</code> | 
| [parent] | <code>[Component](#Component)</code> | 

**Example**  
```js
<pre>

     component.set('list', '.itemList', null);
</pre>
```
<a name="addComponent"></a>
## addComponent(name, locator) ↩︎
**Kind**: global function  
**Chainable**  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| locator | <code>Object</code> | 

<a name="getComponent"></a>
## getComponent(name) ↩︎
**Kind**: global function  
**Chainable**  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="clone"></a>
## clone() ↩︎
Returns a deep copy of the component. Warning: this method also copies any methods
created with addMethod, which may still have reference to the original component.

**Kind**: global function  
**Chainable**  
<a name="copyComponent"></a>
## copyComponent(component, name, locator) ↩︎
Makes a copy of a component, modifying the locator on it and its children.

**Kind**: global function  
**Chainable**  

| Param | Type |
| --- | --- |
| component | <code>[Component](#Component)</code> | 
| name | <code>String</code> | 
| locator | <code>Object</code> | 

<a name="component"></a>
## component(arguments*) ↩︎
Overloaded method that allows add, get, or copy

**Kind**: global function  
**Chainable**  

| Param | Type |
| --- | --- |
| arguments* | <code>mixed</code> | 

<a name="addMethod"></a>
## addMethod(name, method) ↩︎
**Kind**: global function  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> |  |
| method | <code>function</code> | accesses the parent instance using 'this' |

**Example**  
```js
<pre>

     component.addMethod('clickElt', function() {
         this.childComponent.click();
     });

     component.clickElt();
</pre>
```
<a name="setMethodChain"></a>
## setMethodChain() ↩︎
Inspects the method definitions for this component and its hierarchy
and changes their context to this component's object

**Kind**: global function  
**Chainable**  
<a name="replicate"></a>
## replicate(name, locator) ↩︎
Copies the definition of a component with its children. Slightly more
convenient than copyComponent if copying to a sibling

**Kind**: global function  
**Chainable**  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| locator | <code>Object</code> | 

**Example**  
```js
<pre>

     myComponent.component('box', '#box-1').parent()
         .component(myComponent.component('box'), 'box2', '#box-2');

     // is equivalent to
     myComponent.component('box', '#box-1')
         .replicate('box2', '#box-2');
</pre>
```
<a name="addModel"></a>
## addModel(name) ↩︎
Adds an ng-model by name to an input element

**Kind**: global function  
**Chainable**  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="detach"></a>
## detach() ↩︎
Removes the component and returns its parent

**Kind**: global function  
**Chainable**  
<a name="element"></a>
## element()
**Kind**: global function  
<a name="text"></a>
## text()
Retrieves the text from an element and passes the value to the provided callback function

**Kind**: global function  
**Example**  
```js
<pre>

     expect(myElement.text()).toMatch(/hello world/ig);
</pre>
```
<a name="enter"></a>
## enter(value)
Enters a value into an input field

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>String</code> | 

<a name="value"></a>
## value(value)
Retrieves or enters a value into an input field

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>String</code> | 

<a name="isFullyDisplayed"></a>
## isFullyDisplayed()
Checks that all children are visible. For a component without children, use
isVisible()

**Kind**: global function  
<a name="containsText"></a>
## containsText()
Performs an angular expectation testing whether this element contains any text

**Kind**: global function  
<a name="isNotEmpty"></a>
## isNotEmpty()
Performs an angular expectation testing whether this element is not empty

**Kind**: global function  
<a name="matches"></a>
## matches(match)
Performs an angular expectation testing whether this element's text matches the given
string or regular expression

**Kind**: global function  

| Param | Type |
| --- | --- |
| match | <code>RegExp</code> | 

**Example**  
```js
<pre>

     myElement.matches(/hello world/);
</pre>
```
<a name="isVisible"></a>
## isVisible()
Performs an expectation testing whether this component is visible

**Kind**: global function  
<a name="isHidden"></a>
## isHidden()
Performs an expectation testing whether component is hidden on page

**Kind**: global function  
<a name="click"></a>
## click()
Clicks on the element using the custom angular.anchor dsl

**Kind**: global function  
<a name="keypress"></a>
## keypress()
Simulates keypress of given keycode

**Kind**: global function  
<a name="dragTo"></a>
## dragTo(x, y)
Simulates browser drag and drop

**Kind**: global function  

| Param | Type |
| --- | --- |
| x | <code>Number</code> | 
| y | <code>Number</code> | 

<a name="isActive"></a>
## isActive()
Tests this component for having the 'active' class

**Kind**: global function  
<a name="isSelected"></a>
## isSelected()
Tests this component for having the 'selected' class

**Kind**: global function  
<a name="isNotSelected"></a>
## isNotSelected()
Tests that this component does not have a 'selected' class

**Kind**: global function  
<a name="isDisabled"></a>
## isDisabled()
Tests this component for having the 'disabled' class

**Kind**: global function  
<a name="isEnabled"></a>
## isEnabled()
Tests this component for not having the 'disabled' class

**Kind**: global function  
<a name="opensNewWindow"></a>
## opensNewWindow()
Tests this component for having the '_blank' href target

**Kind**: global function  
<a name="count"></a>
## count()
**Kind**: global function  
<a name="expectCount"></a>
## expectCount() ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - greaterThan, lessThan, toBe  
**Example**  
```js
<pre>

     component.expectCount().greaterThan(3);
     component.expectCount().lessThan(7);
     component.expectCount().toBe(2);
</pre>
```
<a name="all"></a>
## all(method, then)
Creates an iterator for all the elements matching this component's locator and accepts a
function of that component type

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>function</code> |  |
| then | <code>function</code> | callback function |

**Example**  
```js
<pre>

     component.all(function(element) { element.click(); });
</pre>
```
<a name="nth"></a>
## nth(number)
Return the nth element matching this component's locator

**Kind**: global function  

| Param | Type |
| --- | --- |
| number | <code>int</code> | 

**Example**  
```js
<pre>

     component.nth(3).isDisplayed();
</pre>
```
<a name="goTo"></a>
## goTo([pathOrRequest], [request])
Use to navigate within the views for a Page.

**Kind**: global function  
**Uses**: browser  

| Param | Type | Description |
| --- | --- | --- |
| [pathOrRequest] | <code>String</code> &#124; <code>Object</code> |  |
| [request] | <code>String</code> | if provided will also to the path with the specified request |

**Example**  
```js
<pre>

     ClassesPage.goTo("create");
</pre>
```
**Example**  
```js
<pre>

     // go to the data page with no options
     compass.navigateTo(page.getPathTo());

     // go to the data page with options, e.g. http://localhost/data/page?state=zero%20classes
     compass.navigateTo(page.getPathTo({state: "zero classes"}));

     // go to a view, specifying options, e.g. http://localhost/data/page/reports/overview?state=zero_classes
     compass.navigateTo(page.getPathTo("reports/overview", {state: "zero_classes"}));

</pre>
```
<a name="at"></a>
## at()
Performs an expectation on whether the browser is at the path for a Page

**Kind**: global function  
<a name="addView"></a>
## addView(name, selector) ⇒ <code>[View](#View)</code>
Adds a View component to a Page

**Kind**: global function  
**Chainable**  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| selector | <code>String</code> | 

<a name="getView"></a>
## getView(name) ⇒ <code>[View](#View)</code>
Retrieves a View and throws an error if that View is not found

**Kind**: global function  
**Chainable**  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="$$register"></a>
## $$register(definition)
The $$register method is used to create new page objects

**Kind**: global function  

| Param | Type |
| --- | --- |
| definition | <code>PageDefinition</code> | 

<a name="set"></a>
## set(name, locator)
Set the name and locator of this view. Changes will recurse down to children

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| locator | <code>String</code> | 

**Example**  
```js
<pre>

     app.getPage('Page1').getView('MyView').set('YourView', '#second-view');
</pre>
```
<a name="addPath"></a>
## addPath(path) ⇒ <code>[View](#View)</code>
Adds a path to this View with path parameter having a colon prefix.
Paths should be taken directly from the application routes!

**Kind**: global function  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | a parameterized form of this View's url |

**Example**  
```js
<pre>

     Classes.getView('MyView').addPath("classes/:classId/assignments");
</pre>
```
<a name="goTo"></a>
## goTo(routeParams, queryParams)
Navigates to the path for this View given the appropriate route parameters.
Query params may also be added.

**Kind**: global function  

| Param | Type |
| --- | --- |
| routeParams | <code>Object</code> | 
| queryParams | <code>Object</code> | 

**Example**  
```js
<pre>

     // e.g. http://localhost/myview/my-101-id/posts
     compass.navigateTo(view.getPathTo({id: 'my-101-id'}));

     // e.g. http://localhost/myview/my-101-id/posts?state=no_posts
     compass.navigateTo(view.getPathTo({id: 'my-101-id'}, {state: 'no_posts'));
</pre>
```
<a name="at"></a>
## at()
Performs an expectation testing that the current route matches the path set for
this View

**Kind**: global function  
**Example**  
```js
<pre>

     it('should do something', function(){ myView.at(); });
</pre>
```
<a name="objectToQueryStr"></a>
## objectToQueryStr(object) ⇒ <code>String</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

<a name="joinQueryStrings"></a>
## joinQueryStrings(qs1, qs2) ⇒ <code>String</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| qs1 | <code>String</code> | 
| qs2 | <code>String</code> | 

<a name="changeMethodContext"></a>
## changeMethodContext(context, methodName, method)
Does not affect original function

**Kind**: global function  

| Param | Type |
| --- | --- |
| context | <code>function</code> &#124; <code>Object</code> | 
| methodName | <code>String</code> | 
| method | <code>function</code> | 

