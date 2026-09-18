# 3D Attribution

All models are Public Domain (CC0 1.0), self-hosted in `public/models/`, optimized with `gltf-transform optimize --compress draco --texture-compress webp --texture-size 512`.

- `open-book.glb` — Open Book by Quaternius (https://poly.pizza/m/FsCIGEfTEs) — CC0 1.0 — modified: draco + webp, brand retint in code.
- `lantern.glb` — Lantern by Kay Lousberg (https://poly.pizza/m/CtHBJ1ufeW) — CC0 1.0 — modified: draco + webp 512px, brand retint in code.
- `robot.glb` — Animated Robot by Quaternius (https://poly.pizza/m/QCm7qe9uNJ) — CC0 1.0 — modified: animations and skins stripped, draco + webp, purple retint in code.
- `quran-realistic.glb` (optional, enabled with `QURAN_VARIANT = 2` in `lib/3d-models.ts`) — Quran for game by maga3dmax (https://sketchfab.com/3d-models/quran-for-game-82eaa0efde6f44ee83c2f1210b902d38) — CC-BY 4.0 — download requires a free Sketchfab account, then optimize with `gltf-transform optimize --compress draco --texture-compress webp --texture-size 512` into `public/models/quran-realistic.glb`.

Draco decoder vendored from `three/examples/jsm/libs/draco/` into `public/draco/` for offline self-hosting.
