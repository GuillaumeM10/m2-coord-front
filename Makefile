node_modules:
	npm install

run: node_modules
		ng serve

lint: node_modules
		npm run lint

format: node_modules
		npm run format

.PHONY: run lint format
