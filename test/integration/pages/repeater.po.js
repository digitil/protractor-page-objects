var compass = require('../app.po.js');
var view = compass.Page.getView('Repeater');

view.addPath('#/repeater');

module.exports = view;
