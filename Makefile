node_modules:
	npm install


run: node_modules
		ng serve

lint: node_modules
		npm run lint

format: node_modules
		npm run format

test: node_modules
		npm run test

cov: node_modules
		npm run test:cov

.PHONY: run lint format test cov
