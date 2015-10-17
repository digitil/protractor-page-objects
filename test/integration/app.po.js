var compass = require('../../index');
var app = new compass();
var Page = app.addPage('Page', '#/');

Page.addView('Form', '[ng-view]');
Page.addView('Repeater', '[ng-view]');

Page.repeaterLink = new compass.Component('repeaterLink', by.linkText('repeater'));

module.exports = app;
