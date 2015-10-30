## Classes
<dl>
<dt><a href="#PageObjects">PageObjects</a></dt>
<dd></dd>
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
<dt><a href="#$$page">$$page(definition)</a></dt>
<dd><p>Creates a new definition for a page in the application</p>
</dd>
<dt><a href="#$$hierarchy">$$hierarchy()</a> ⇒ <code>Array</code></dt>
<dd><p>Travels up the component&#39;s tree and returns an array containing the
component and all of its parents, in the order found.</p>
</dd>
<dt><a href="#set">set(definition)</a></dt>
<dd><p>Sets the properties for a Component. Changes are recursed down to children.</p>
</dd>
<dt><a href="#equals">equals(a, b)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Determines whether two components are equal by deep comparison</p>
</dd>
<dt><a href="#element">element()</a> ⇒ <code>ElementFinder</code></dt>
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
<dd><p>Checks that all children are visible.
For a component without children, use isVisible()</p>
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
<dt><a href="#keypress">keypress(keyCode)</a></dt>
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
<dt><a href="#goTo">goTo([pathOrRequest])</a></dt>
<dd><p>Use to navigate within the views for a Page.</p>
</dd>
<dt><a href="#goTo">goTo([pathOrRequest])</a></dt>
<dd></dd>
<dt><a href="#goTo">goTo([pathOrRequest], [request])</a></dt>
<dd></dd>
<dt><a href="#at">at()</a></dt>
<dd><p>Performs an expectation on whether the browser is at the path defined for a Page</p>
</dd>
<dt><a href="#$$view">$$view(definition)</a> ⇒ <code><a href="#View">View</a></code></dt>
<dd><p>Adds a View to a Page</p>
</dd>
<dt><a href="#$$component">$$component(definition)</a> ⇒ <code><a href="#Component">Component</a></code></dt>
<dd><p>Adds a Component to the page</p>
</dd>
<dt><a href="#goTo">goTo(routeParams, queryParams)</a></dt>
<dd><p>Navigates to the path for this View given the appropriate route parameters.
Query params may also be added.</p>
</dd>
<dt><a href="#at">at()</a></dt>
<dd><p>Performs an expectation testing that the current route matches the path set for this View</p>
</dd>
</dl>
<a name="PageObjects"></a>
## PageObjects
**Kind**: global class  
<a name="new_PageObjects_new"></a>
### new PageObjects(pages)
Defines a new set of application pages.


| Param | Type | Description |
| --- | --- | --- |
| pages | <code>[Array.&lt;PageDefinition&gt;](#Page..PageDefinition)</code> | definitions for the pages to be added |

**Example**  
```js
<caption>Pass in a variable number of pages</caption>
var app = new PageObjects(login, home, settings);
```
**Example**  
```js
<caption>Pass in an array of pages</caption>
var app = new PageObjects([login, home, settings]);
```
**Example**  
```js
<caption>Or mix the two</caption>
var app = new PageObjects(login, [home], settings);
```
<a name="Component"></a>
## Component
Component

**Kind**: global class  

* [Component](#Component)
  * [new Component(definition)](#new_Component_new)
  * _instance_
    * [.$$component(component, [definition])](#Component+$$component) ⇒ <code>[Component](#Component)</code>
  * _static_
    * [.mixin(inheritor)](#Component.mixin)
  * _inner_
    * [~ComponentDefinition](#Component..ComponentDefinition) : <code>Object</code>

<a name="new_Component_new"></a>
### new Component(definition)
A Component can be defined application-wide or be a part of a page.
You can define elements and methods on a Component.


| Param | Type |
| --- | --- |
| definition | <code>[ComponentDefinition](#Component..ComponentDefinition)</code> | 

<a name="Component+$$component"></a>
### component.$$component(component, [definition]) ⇒ <code>[Component](#Component)</code>
Copy an existing component onto this component.
The locator for the copied component and its children will become relative to this component.
Warning: this method also copies any methods, which may still have reference to the original component.

**Kind**: instance method of <code>[Component](#Component)</code>  
**Returns**: <code>[Component](#Component)</code> - A deep copy of the component  
**Throws**:

- <code>Error</code> If first argument is not a Component


| Param | Type |
| --- | --- |
| component | <code>[Component](#Component)</code> | 
| [definition] | <code>[ComponentDefinition](#Component..ComponentDefinition)</code> | 

<a name="Component.mixin"></a>
### Component.mixin(inheritor)
Provides access to methods that are appropriate for supporting
Component in other classes such as View

**Kind**: static method of <code>[Component](#Component)</code>  

| Param | Type |
| --- | --- |
| inheritor | <code>Constructor</code> | 

<a name="Component..ComponentDefinition"></a>
### Component~ComponentDefinition : <code>Object</code>
The definition object for a Component

**Kind**: inner typedef of <code>[Component](#Component)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| $name | <code>String</code> | the name of the component |
| $locator | <code>String</code> | the locator for this component (can be a css selector or a [ProtractorBy](http://www.protractortest.org/#/api?view=ProtractorBy) locator) |
| $parent | <code>[Component](#Component)</code> &#124; <code>[View](#View)</code> &#124; <code>[Page](#Page)</code> | the parent component for this component. $locator should be relative to this parent. |
| $methods | <code>Object.&lt;String, function()&gt;</code> | a map of functions to be added as instance methods to this component |
| $components | <code>Array.&lt;ComponentDefinition&gt;</code> | sub-components to add to this Component |

<a name="Page"></a>
## Page
Page

**Kind**: global class  

* [Page](#Page)
  * [new Page(definition)](#new_Page_new)
  * [~PageDefinition](#Page..PageDefinition) : <code>Object</code>

<a name="new_Page_new"></a>
### new Page(definition)
A Page represents one of the main application pages.


| Param | Type |
| --- | --- |
| definition | <code>[PageDefinition](#Page..PageDefinition)</code> | 

<a name="Page..PageDefinition"></a>
### Page~PageDefinition : <code>Object</code>
The definition object for a Page

**Kind**: inner typedef of <code>[Page](#Page)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| $name | <code>String</code> | the name of the page |
| $path | <code>String</code> | the relative path to this page |
| $params | <code>Object</code> | a map of query params to set when navigating to this page |
| $components | <code>[Array.&lt;ComponentDefinition&gt;](#Component..ComponentDefinition)</code> | components to add to this Page |

<a name="View"></a>
## View
View

**Kind**: global class  

* [View](#View)
  * [new View(definition)](#new_View_new)
  * [~ViewDefinition](#View..ViewDefinition) : <code>Object</code>

<a name="new_View_new"></a>
### new View(definition)
A View extends a Component


| Param | Type | Description |
| --- | --- | --- |
| definition | <code>[ViewDefinition](#View..ViewDefinition)</code> | definition for the view to be created |

<a name="View..ViewDefinition"></a>
### View~ViewDefinition : <code>Object</code>
The definition object for a View

**Kind**: inner typedef of <code>[View](#View)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| $name | <code>String</code> | the name of the page |
| $locator | <code>String</code> | the locator for this page (can be a css selector or a [ProtractorBy](http://www.protractortest.org/#/api?view=ProtractorBy) locator) |
| $components | <code>[Array.&lt;ComponentDefinition&gt;](#Component..ComponentDefinition)</code> | components to add to this View |

<a name="$$page"></a>
## $$page(definition)
Creates a new definition for a page in the application

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>[PageDefinition](#Page..PageDefinition)</code> | the definition for the new page |

<a name="$$hierarchy"></a>
## $$hierarchy() ⇒ <code>Array</code>
Travels up the component's tree and returns an array containing the
component and all of its parents, in the order found.

**Kind**: global function  
<a name="set"></a>
## set(definition)
Sets the properties for a Component. Changes are recursed down to children.

**Kind**: global function  

| Param | Type |
| --- | --- |
| definition | <code>[ComponentDefinition](#Component..ComponentDefinition)</code> | 

**Example**  
```js
component.set({$name: 'list', $locator: '.itemList', $parent: null});
```
<a name="equals"></a>
## equals(a, b) ⇒ <code>Boolean</code>
Determines whether two components are equal by deep comparison

**Kind**: global function  

| Param | Type |
| --- | --- |
| a | <code>[Component](#Component)</code> | 
| b | <code>[Component](#Component)</code> | 

<a name="element"></a>
## element() ⇒ <code>ElementFinder</code>
**Kind**: global function  
**Returns**: <code>ElementFinder</code> - Returns the {#link http://www.protractortest.org/#/api?view=ElementFinder|ElementFinder} for this component  
<a name="text"></a>
## text()
Retrieves the text from an element and passes the value to the provided callback function

**Kind**: global function  
**Example**  
```js
expect(component.text()).toMatch(/hello world/ig);
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
Checks that all children are visible.
For a component without children, use isVisible()

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
component.matches(/hello world/);
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
## keypress(keyCode)
Simulates keypress of given keycode

**Kind**: global function  

| Param | Type |
| --- | --- |
| keyCode | <code>Number</code> | 

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
component.all(function(element) { element.click(); });
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
component.nth(3).isDisplayed();
```
<a name="goTo"></a>
## goTo([pathOrRequest])
Use to navigate within the views for a Page.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [pathOrRequest] | <code>String</code> | the path to navigate to relative to this page |

**Example**  
```js
// /todo/create
Todo.goTo("create");
  
 
```
<a name="goTo"></a>
## goTo([pathOrRequest])
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [pathOrRequest] | <code>Object</code> | a map of params to add to path as a query string |

**Example**  
```js
// /todo?priority=high
Todo.goTo({priority: 'high'});

 
```
<a name="goTo"></a>
## goTo([pathOrRequest], [request])
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [pathOrRequest] | <code>String</code> | the path to navigate to relative to this page |
| [request] | <code>Object</code> | a map of params to add to path as a query string |

**Example**  
```js
//todo/edit?id=foo
Todo.goTo("edit", {id: 'foo'});
```
<a name="at"></a>
## at()
Performs an expectation on whether the browser is at the path defined for a Page

**Kind**: global function  
<a name="$$view"></a>
## $$view(definition) ⇒ <code>[View](#View)</code>
Adds a View to a Page

**Kind**: global function  

| Param | Type |
| --- | --- |
| definition | <code>[ViewDefinition](#View..ViewDefinition)</code> | 

<a name="$$component"></a>
## $$component(definition) ⇒ <code>[Component](#Component)</code>
Adds a Component to the page

**Kind**: global function  

| Param | Type |
| --- | --- |
| definition | <code>[ComponentDefinition](#Component..ComponentDefinition)</code> | 

<a name="goTo"></a>
## goTo(routeParams, queryParams)
Navigates to the path for this View given the appropriate route parameters.
Query params may also be added.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| routeParams | <code>Object</code> | a map of replacements for path parameters |
| queryParams | <code>Object</code> | a map of url query parameters |

**Example**  
```js
<pre>
view.$path = 'http://localhost/myview/:id/posts'

// http://localhost/myview/my-101-id/posts
view.goTo({id: 'my-101-id'});

// http://localhost/myview/my-101-id/posts?state=no_posts
view.goTo({id: 'my-101-id'}, {state: 'no_posts');
</pre>
```
<a name="at"></a>
## at()
Performs an expectation testing that the current route matches the path set for this View

**Kind**: global function  
**Example**  
```js
it('should do something', function(){ myView.at(); });
```
