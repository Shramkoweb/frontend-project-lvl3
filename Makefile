install:
	npm ci

lint:
	npx eslint .

test:
	npm test

start:
	npm start

build:
	npm run build

test-coverage:
	npm test --coverage --coverageProvider=v8
