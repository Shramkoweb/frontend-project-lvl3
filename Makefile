install:
	npm ci

lint:
	npx eslint .

test:
	npm test

develop:
	npx webpack-dev-server

test-coverage:
	npm test -- --coverage --coverageProvider=v8
