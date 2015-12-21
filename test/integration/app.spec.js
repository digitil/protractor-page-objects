var app = require('./app.po.js');
var Page = app.Page;
var FormView = Page.Form;
var RepeaterView = Page.Repeater;


describe('refapp landing page', function() {
    it('should have page title "My AngularJS App"', function() {
        Page.goTo();
        expect(browser.getTitle()).toEqual('My AngularJS App');
    });
});

describe('views', function() {
    it('should have form view', function() {
        FormView.goTo();
        FormView.at();
    });
});

describe('using an ActionSequence', function() {
    beforeEach(function() {
        FormView.goTo();
    });

    it('should drag and drop', function() {
        var sliderBar = FormView.sliderBar;
        expect(sliderBar.value()).toEqual('1');
        sliderBar.dragTo(400, 200);
        expect(sliderBar.value()).toEqual('10');
    });
});

describe('navigation', function() {
    beforeEach(function() {
        FormView.goTo();
    });

    it('should deal with alerts', function() {
        FormView.alertButton.click();
        var alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual('Hello');
        alertDialog.accept();
    });

    it('should refresh properly', function() {
        var name = element(by.binding('username'));
        FormView.username.element().clear();
        expect(name.getText()).toEqual('');
        browser.navigate().refresh();
        expect(name.getText()).toEqual('Anon');
    });

    it('should navigate back and forward properly from link', function() {
        Page.repeaterLink.click();
        RepeaterView.at();
        browser.navigate().back();
        FormView.at();
        browser.navigate().forward();
        RepeaterView.at();
    });
});