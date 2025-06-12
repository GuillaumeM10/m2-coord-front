node_modules:
	npm install

run: node_modules
		npm run start

lint: node_modules
		npm run lint

format: node_modules
		npm run format

tests: node_modules
		npm run test

api: node_modules
		npm run generate:api:files

.PHONY: run lint format tests api
