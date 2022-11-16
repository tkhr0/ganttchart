build:
	cargo build
	cargo run dump
	cargo clippy
	npm run codegen
	npm run check
	NO_WATCH=true npm run build

check:
	cargo clippy
	npm run check
	npm run lint

api-server:
	cargo run

front-server:
	npm run dev
