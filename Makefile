node_modules:
	npm install


run: node_modules
		ng serve

lint: node_modules
		npm run lint

format: node_modules
		npm run format

tests: node_modules
		npm run test

cov: node_modules
		npm run test:cov

api: node_modules
		npm run generate:api:files

.PHONY: run lint format tests cov api
