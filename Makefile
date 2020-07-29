install:
	npm ci

lint:
	npx eslint .

test:
	npm test

develop:
	npx webpack-dev-server
