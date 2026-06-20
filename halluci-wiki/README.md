# 🌀 Halluci-Wiki

> The Free Encyclopedia of Pure Fiction.

A parody Wikipedia clone that generates **totally hallucinated, gloriously
inaccurate** encyclopedia articles for any query. Implements
[issue #9](https://github.com/MohakBajaj/build-2026-cli-live/issues/9).

⚠️ **Everything it produces is randomly generated nonsense.** Nothing is real,
accurate, or true. It's satire — please don't cite it in your homework.

## Features

- 🔎 **Search anything** — type a query and get a full fake article: lead
  paragraph, table of contents, themed sections, an infobox, and a
  bibliography of references that don't exist.
- 🎲 **Random article** button for instant absurdity.
- 🧠 **Deterministic** — the same query always generates the same article
  (seeded PRNG), so you can share a link and your friend sees the same nonsense.
- 🔗 **Shareable URLs** — the query lives in the hash (`#/Your%20Topic`).
- 🖼️ **Procedural "artist's impression"** images drawn as inline SVG (no network).
- 💯 **Zero dependencies, no build step** — pure HTML/CSS/JS.

## Run it

Just open `index.html` in a browser. Or serve the folder:

```bash
cd halluci-wiki
python3 -m http.server 8000
# then visit http://localhost:8000
```

Try `#/Quantum Pigeons` or hit the 🎲 button.

## How it works

`app.js` hashes the query into a seed, feeds a small `mulberry32` PRNG, and
stitches together sentences from curated word banks and templates. Because the
seed is derived from the query, generation is fully deterministic.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell, header, search, disclaimer |
| `styles.css` | Wikipedia-flavored styling |
| `app.js` | The hallucination engine (PRNG + generators) |
