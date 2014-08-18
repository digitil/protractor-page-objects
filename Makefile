REPORTER = spec
MODULES = ./node_modules/.bin

scaffold:
	mkdir -p examples lib test
	touch index.js

lib_dependencies:
	npm install protractor --save
	npm install chai chai-as-promised --save

test_dependencies: lib_dependencies
	npm install express --save-dev
	npm install jshint mocha --save-dev
	npm install sinon sinon-chai --save-dev
	npm install chromedriver --save-optional

jshint:
	$(MODULES)/jshint lib examples test integration index.js

unit:
	@NODE_ENV=test $(MODULES)/mocha --recursive --reporter $(REPORTER) --timeout 3000

xunit:
	@NODE_ENV=test $(MODULES)/mocha --recursive --reporter xunit > results.xml --timeout 3000

integration:
	cd testapp; node scripts/web-server.js & echo $$! > pid.log
	$(MODULES)/protractor integration/conf.js
	kill `cat testapp/pid.log`

check: jshint unit
test: jshint xunit integration

.PHONY: scaffold jshint unit xunit integration check test
