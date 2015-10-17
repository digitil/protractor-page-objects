var sinon = require('./deps').sinon;
var expect = require('./deps').expect;
var compass = require('./deps').compass;

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