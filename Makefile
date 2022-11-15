build:
	cargo build
	cargo run dump
	npm run codegen
	npm run check
	NO_WATCH=true npm run build

api-server:
	cargo run

front-server:
	npm run dev
