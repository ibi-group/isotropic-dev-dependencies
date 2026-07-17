# isotropic-dev-dependencies

[![npm version](https://img.shields.io/npm/v/isotropic-dev-dependencies.svg)](https://www.npmjs.com/package/isotropic-dev-dependencies)
[![License](https://img.shields.io/npm/l/isotropic-dev-dependencies.svg)](https://github.com/ibi-group/isotropic-dev-dependencies/blob/main/LICENSE)

A shared package of common development dependencies and configurations used across Isotropic modules.

## Why Use This?

- **Single Source of Truth**: Maintain consistent development dependencies across multiple projects
- **Version Synchronization**: Update dependencies in one place and propagate to all dependent projects
- **Shared Configurations**: Common configuration files for ESLint, c8, and other tools
- **Simplified Setup**: Easy integration of standard development tools with minimal boilerplate
- **Git Hooks**: Automated setup of git hooks for commit validation

## Installation

```bash
npm install --save-dev isotropic-dev-dependencies
```

## Features

### Bundled Dependencies

This package bundles common development dependencies to ensure consistency across projects:

- **Testing**: The [Node.js built-in test runner](https://nodejs.org/api/test.html) (`node:test`) with Chai assertions
- **Code Coverage**: c8
- **Linting**: ESLint with the Isotropic plugin
- **Utilities**: fs-extra, globals

> **Note:** This package no longer bundles Babel, Mocha, or cross-env. Isotropic targets a current Node.js release (Node 26+) and runs its ES module source directly, so there is no build/transpile step. Tests run on the Node.js built-in test runner instead of Mocha.

### Shared Configurations

- **c8**: Code coverage configuration with high standards (100% coverage targets)
- **ESLint**: Standard linting rules for both CommonJS and ES modules
- **Git Hooks**: Pre-commit hooks for validation

## Usage

### Basic Setup

After installing the package, reference its configurations in your project.

Because Isotropic publishes its ES module source directly, source now lives in (and is published from) the `lib` directory and there is no separate build output. Lint and test point at `lib` and `test`:

```json
// package.json
{
    "scripts": {
        "lint": "eslint lib test",
        "test": "c8 -c ./node_modules/isotropic-dev-dependencies/config/c8.json node --test"
    }
}
```

### ESLint Integration

Set up ESLint with the shared configuration.

- `eslint-module.js`: Configuration for ES modules
- `eslint-commonjs.js`: Configuration for CommonJS modules

```js
// eslint.config.js
export {
    default
} from 'isotropic-dev-dependencies/lib/eslint-module.js';
```

When your package depends on `isotropic-dev-dependencies` it will automatically bring in `eslint` because `isotropic-dev-dependencies` depends on `eslint`. However, a lot of packages depend on `eslint`. If you have other dependencies that also depend on `eslint`, you may have to declare `eslint` as a dependency of your package to ensure that you get the correct version of `eslint`.

### Testing with the Node.js Test Runner and Chai

Tests use the Node.js built-in test runner. Import `describe`/`it` (and any other helpers) directly from `node:test`, which is always available and needs no dependency declaration. Chai is provided by this package for assertions:

```js
// test/test.js
import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _test from 'node:test';

_test.describe('My Test Suite', () => {
    _test.it('should pass', () => {
        _chai.expect(true).to.be.true;
    });
});
```

Then set your test script to run the test runner under c8:

```bash
c8 -c ./node_modules/isotropic-dev-dependencies/config/c8.json node --test
```

`node --test` automatically discovers test files in your `test` directory. Because the source is no longer transpiled, coverage maps directly to the files in `lib`.

### c8 Configuration

- 100% coverage requirements for statements, branches, functions, and lines
- LCOV and text-summary reporters

### Git Hooks

Git hooks are automatically installed during the `prepare` script. They validate committer information against the package.json author and contributors. When there is no `.git` directory (for example, when the package is installed as a dependency), hook installation is skipped silently.

## Examples

### Complete package.json Setup

```json
{
    "name": "my-package",
    "devDependencies": {
        "eslint": "~10.5.0",
        "isotropic-dev-dependencies": "~0.3.0"
    },
    "scripts": {
        "lint": "eslint lib test",
        "posttest": "c8 -c ./node_modules/isotropic-dev-dependencies/config/c8.json check-coverage",
        "prepare": "node ./node_modules/isotropic-dev-dependencies/lib/install-git-hooks.js",
        "prepublishOnly": "npm test",
        "pretest": "npm run lint",
        "test": "c8 -c ./node_modules/isotropic-dev-dependencies/config/c8.json node --test"
    },
    "type": "module",
    "version": "0.0.0"
}
```

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/ibi-group/isotropic-dev-dependencies/blob/main/CONTRIBUTING.md) for contribution guidelines.

## Issues

If you encounter any issues, please file them at https://github.com/ibi-group/isotropic-dev-dependencies/issues
