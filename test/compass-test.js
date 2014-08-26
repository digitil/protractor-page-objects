var sinon = require('sinon');
var expect = require('chai').use(require('sinon-chai')).expect;
var compass = require('../index');

describe('Compass', function() {
    var app;

    beforeEach(function() {
        app = new compass();
    });

    describe('addPage method', function() {
        it('should try to normalize Page names to PascalCase', function() {
            app.addPage('oneword');
            expect(app).to.have.property('Oneword');
            app.addPage('two words');
            expect(app).to.have.property('TwoWords');
        });

        it('should try to replace underscores and hyphens', function() {
            app.addPage('hyphenated-words');
            expect(app).to.have.property('HyphenatedWords');
            app.addPage('under_score');
            expect(app).to.have.property('UnderScore');
        });
    });
});