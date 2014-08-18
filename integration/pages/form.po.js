var compass = require('../app.po.js');
var view = compass.Page.getView('Form');

view.addPath('#/form');

view.addComponent('sliderBar', by.name('points'));
view.addComponent('alertButton', by.id('alertbutton'));
view.addComponent('username', by.model('username'));

module.exports = view;
