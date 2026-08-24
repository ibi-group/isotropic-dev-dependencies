# isotropic-dev-dependencies Changelog

## 0.5.0 - 2026-08-23

### Changed

- `c8` bumped to `~12.0.0`, `eslint` to `~10.9.0`, `fs-extra` to `~11.4.0`, and `globals` to `~17.11.0`.
- `c8` 12 is a major bump of the coverage tool. The shared `config/c8.json` thresholds are unchanged, but consuming packages will run coverage under the new major version.
- `eslint-plugin-isotropic` updated to the latest release.
- Recommends `node ^26.7.0` / `npm ^11.19.0`.
- `repository` now uses npm's preferred object form with explicit `type` and `url` properties rather than the `github:` shorthand. This is package metadata only.

No runtime behavior changed in this release.

## 0.4.0 - 2026-07-16

This release removes the build and test-runner toolchains entirely. The `build` step has been dropped. Isotropic packages publish source directly.

### Breaking changes

**Babel was removed completely.** These dependencies are gone: `@babel/cli`, `@babel/core`, `@babel/preset-env`, `babel-plugin-istanbul`, `babel-plugin-transform-line`, and `babel-preset-minify`. So are `config/babel.json`, `js/babel-loader.js`, and `js/register-babel-loader.js`.

`config/babel.json` had defined nine build environments plus a `test` environment wired to `babel-plugin-istanbul`. None of them exist now.

If your package has a `build` script referencing `./node_modules/isotropic-dev-dependencies/config/babel.json`, it will fail. The intended migration is to stop transpiling: publish `lib/` as native ES module source and delete the `build` and `prepare` scripts.

**Mocha was removed.** The `mocha` dependency and `js/mocha.js` are gone. Test suites move to the built-in `node --test` runner:

```jsonc
// Before
"test": "cross-env BABEL_ENV=test mocha --require ./node_modules/isotropic-dev-dependencies/lib/register-babel-loader.js test"

// After
"test": "node --test"
```

`chai` is still provided (via `lib/chai.js`), so assertions need not change.

**`cross-env` was removed.** It existed to set `BABEL_ENV` portably. With Babel gone there is nothing to set. Any script still invoking `cross-env` will fail.

**The package no longer has a `main` entry.** `main` was `lib/dev-dependencies.js`; that file is gone and the package is now consumed purely through its deep paths: `lib/chai.js`, `lib/eslint-commonjs.js`, `lib/eslint-module.js`, `config/c8.json`. `import 'isotropic-dev-dependencies'` no longer resolves.

**Git hooks are now installed from `prepare` rather than `postprepare`.** The `build` step that `prepare` used to run is gone, so hook installation moved into `prepare` directly. Consuming packages that overrode `postprepare` should check their scripts.

**Tool versions moved up major versions**, which may surface new lint errors or behavioral differences in your own suite:

| | 0.3.1 | 0.4.0 |
| --- | --- | --- |
| `c8` | `~10.1.2` | `~11.0.0` |
| `chai` | `~5.1.1` | `~6.2.2` |
| `eslint` | `~9.8.0` | `~10.7.0` |
| `eslint-plugin-isotropic` | `~0.8.1` | `~0.9.0` |
| `fs-extra` | `~11.2.0` | `~11.3.6` |
| `globals` | `~15.8.0` | `~17.6.0` |

#### Migration

For a package that follows the Isotropic conventions:

1. Delete the `build` script and the `prepare` script that ran it.
2. Move source from `js/` to `lib/` and publish it directly.
3. Remove `lib` from `.gitignore`.
4. Replace the Mocha test script with `node --test`.
5. Remove any `cross-env` and `BABEL_ENV` usage.
6. Drop the separately pinned `eslint` dev dependency. It is no longer overwritten by a peer dependency.
7. Expect new lint errors from ESLint 10 and `eslint-plugin-isotropic` `~0.9.0`.

### Changed

- `keywords` updated from `build`, `devDependencies`, `isotropic`, `lint`, `test` to `c8`, `devDependencies`, `eslint`, `git-hooks`, `isotropic`, `lint`, `test`, reflecting that this is no longer a build toolchain.
- The `lint` script now lints `eslint.config.js` alongside `lib`, and no longer needs to run a build first.
- Recommends `node ^26.5.0` / `npm ^11.17.0`.

## 0.3.1 - 2025-04-10

### Changed

- A comprehensive README was added, documenting each shared configuration and how consuming packages wire it up.
- Tool version bumps.

## 0.3.0 - 2024-07-30

### Breaking changes

**The package is now an ES module** and the shared ESLint configuration moved to flat config. Two entry points are provided: `lib/eslint-module.js` and `lib/eslint-commonjs.js`. Either replacing the `eslintConfig` block that consuming packages previously embedded in `package.json`.

Consuming packages add an `eslint.config.js`:

```javascript
export {
    default
} from 'isotropic-dev-dependencies/lib/eslint-module.js';
```

**Coverage moved from `nyc` to `c8`**, configured by `config/c8.json`. `nyc` configuration in consuming packages no longer has any effect.

### Changed

- The committer-validation git hook was reworked.
- Tool versions moved to ESLint 9, Mocha 10, Chai 5, and Babel 7.25.
- Recommends `node ^22.5.1` / `npm ^10.8.2`.

## 0.2.0 - 2021-03-08

### Changed

**Husky's `pinst` workaround was replaced with an exit-zero approach** for suppressing hook installation failures when the package is consumed as a dependency rather than developed directly.

Dependency updates throughout.

## 0.1.2 - 2021-02-27

### Fixed

Corrected the `bin` configuration, which had exposed entries that were not intended to be executables.

## 0.1.1 - 2021-02-22

### Fixed

Corrected copy-and-paste errors in the README.

## 0.1.0 - 2021-02-22

Initial release.

- Consolidates the development toolchain shared by every Isotropic package into a single dev dependency, replacing the per-package Babel, ESLint, Mocha, and nyc configuration blocks that previously lived in each `package.json`.
- Provides shared Babel build environments for browser and Node targets, with and without minification, plus an instrumented `test` environment.
- Provides shared ESLint and coverage configuration, a Chai re-export, and a Mocha setup module.
- Installs git hooks on `postinstall`, including committer validation.
- Recommends `node ^14.15.5` / `npm ^7.5.4`.
