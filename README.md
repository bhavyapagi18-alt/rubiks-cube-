# Rubik's Cube Solver (3x3 + 2x2)

Browser app: Vite + TypeScript (strict) + Three.js + React + Zustand + Vitest. Static deploy, no backend.

## Commands
    npm install
    npm run dev         # http://localhost:5173
    npm test            # all unit tests (~15 s, includes the full 2x2 state-space BFS)
    npm run typecheck && npm run lint && npm run build
    npm run gen:tables  # re-derive move tables from the 3D geometry model

## Status
- Phase 0 (setup, hello cube) - done
- Phase 1 (cube model + tests) - done
- Phase 2 (3x3 rendering: 26 cubies, orbit camera, animated layer turns) - done

## Model API (src/model)
| Function | Purpose |
|---|---|
| `solvedState()`, `applyMove(s, "R'")`, `applyAlgorithm(s, "R U R' U'")` | pure, immutable moves incl. M E S x y z |
| `invert(alg)`, `parseAlgorithm`, `formatAlgorithm`, `describeMove` | notation helpers |
| `randomScramble(n, size, rng?)`, `randomState(rng?)`, `randomState2x2(rng?)` | scrambles / uniform random states |
| `isSolved(s)` (rotation-tolerant), `isIdentity(s)` (strict) | solved checks |
| `toFacelets(s)` / `analyzeFacelets(f)` / `fromFacelets(f)` | 54-sticker conversion; analyze returns specific errors, `fromFacelets` throws if invalid |
| `toFacelets24(s)` / `analyzeFacelets2x2(f)` / `fromFacelets2x2(f)` | 24-sticker 2x2 (DBL fixed by colour relabelling) |
| `validateState(s, size)` | twist, flip, parity (centres included) checks |
| `normalizeOrientation(s)` | puts centres home so a solver always knows which colour is up |

Piece numbering and sticker layout are documented once, in `src/model/constants.ts`.

## Renderer (src/render)
| File | Role |
|---|---|
| `layout.ts` | pure geometry: facelet -> world slot, layer membership, move -> axis/angle |
| `CubeScene.ts` | three.js scene graph, move queue, eased layer turns, snap + re-sync (no WebGL, unit-tested in Node) |
| `CubeRenderer.ts` | WebGL wrapper: camera, lights, contact shadow, orbit controls, render loop |

The renderer contains no cube logic: `enqueue(move, stateAfter)` receives the model's result and re-syncs all 54 sticker colours to it after each turn.
