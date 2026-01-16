# K2 (Rust -> WASM) on GitHub Pages

This repository is a starter skeleton for hosting the K2 calculator fully on **GitHub Pages** using **Rust (WASM)**.

## Repository layout
- `k2-core/` — pure business logic (inventory, rules, pricing, builds).
- `k2-wasm/` — WASM bindings (wasm-bindgen) exposing `k2-core` to the browser.
- `docs/` — GitHub Pages static root (HTML/CSS/JS + `wasm/` build output).
- `.github/workflows/pages.yml` — CI build + Pages deployment.

## Local development
Prereqs:
- Rust stable
- wasm target: `rustup target add wasm32-unknown-unknown`
- wasm-pack: https://rustwasm.github.io/wasm-pack/

Build WASM:
- `cd k2-wasm`
- `wasm-pack build --release --target web --out-dir ../docs/wasm`

Serve `docs/` locally with any static server.

## Notes
GitHub Pages is static hosting. All persistence is client-side (localStorage/IndexedDB) unless you later add a backend.
