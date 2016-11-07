const app = require('./app.po.js');
const Page = app.Page;
const FormView = Page.Form;
const RepeaterView = Page.Repeater;


describe('refapp landing page', () => {
    it('should have page title "My AngularJS App"', () => {
        Page.goTo();
        expect(browser.getTitle()).toEqual('My AngularJS App');
    });
});

describe('views', () => {
    it('should have form view', () => {
        FormView.goTo();
        FormView.at();
    });
});

describe('using an ActionSequence', () => {
    beforeEach(() => {
        FormView.goTo();
    });

    it('should drag and drop', () => {
        const sliderBar = FormView.sliderBar;
        expect(sliderBar.value()).toEqual('1');
        sliderBar.dragTo(400, 200);
        expect(sliderBar.value()).toEqual('10');
    });
});

describe('navigation', () => {
    beforeEach(() => {
        FormView.goTo();
    });

    it('should deal with alerts', () => {
        FormView.alertButton.click();
        const alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual('Hello');
        alertDialog.accept();
    });

    it('should refresh properly', () => {
        const name = element(by.binding('username'));
        FormView.username.element().clear();
        expect(name.getText()).toEqual('');
        browser.navigate().refresh();
        expect(name.getText()).toEqual('Anon');
    });

    it('should navigate back and forward properly from link', () => {
        Page.repeaterLink.click();
        RepeaterView.at();
        browser.navigate().back();
        FormView.at();
        browser.navigate().forward();
        RepeaterView.at();
    });
});