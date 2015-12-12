var PageObjects = require('../../index');

var form = {
    name: 'Form',
    locator: '[ng-view]',
    path: '#/form',
    components: [
        { name: 'sliderBar', locator: by.name('points') },
        { name: 'alertButton', locator: by.id('alertbutton') },
        { name: 'username', locator: by.model('username') }
    ]
};

var repeater = {
    name: 'Repeater',
    locator: '[ng-view]',
    path: '#/repeater'
};

var page = {
    name: 'Page',
    path: '#/',
    views: [form, repeater],
    components: [
        { name: 'repeaterLink', locator: by.linkText('repeater') }
    ]
};

var app = new PageObjects([page]);

module.exports = app;
