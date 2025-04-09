# isotropic-dev-dependencies

[![npm version](https://img.shields.io/npm/v/isotropic-dev-dependencies.svg)](https://www.npmjs.com/package/isotropic-dev-dependencies)
[![License](https://img.shields.io/npm/l/isotropic-dev-dependencies.svg)](https://github.com/ibi-group/isotropic-dev-dependencies/blob/main/LICENSE)

A shared package of common development dependencies and configurations used across Isotropic modules.

## Why Use This?

- **Single Source of Truth**: Maintain consistent development dependencies across multiple projects
- **Version Synchronization**: Update dependencies in one place and propagate to all dependent projects
- **Shared Configurations**: Common configuration files for Babel, ESLint, c8, and other tools
- **Simplified Setup**: Easy integration of standard development tools with minimal boilerplate
- **Git Hooks**: Automated setup of git hooks for commit validation

## Installation

```bash
npm install --save-dev isotropic-dev-dependencies
```

## Features

### Bundled Dependencies

This package bundles common development dependencies to ensure consistency across projects:

- **Build Tools**: Babel (CLI, core, presets)
- **Testing**: Mocha, Chai
- **Code Coverage**: c8 with Istanbul
- **Linting**: ESLint with Isotropic plugin
- **Utilities**: cross-env, fs-extra, globals

### Shared Configurations

- **Babel**: Multiple environment configurations for different build targets
- **c8**: Code coverage configuration with high standards (100% coverage targets)
- **ESLint**: Standard linting rules for both CommonJS and ES modules
- **Git Hooks**: Pre-commit hooks for validation

## Usage

### Basic Setup

After installing the package, you can reference its configurations in your project:

```json
// package.json
{
    "scripts": {
        "build": "cross-env BABEL_ENV=node-minify babel --config-file ./node_modules/isotropic-dev-dependencies/config/babel.json js -d lib --delete-dir-on-start",
        "lint": "eslint js test",
        "test": "cross-env BABEL_ENV=test c8 -c ./node_modules/isotropic-dev-dependencies/config/c8.json mocha --import=isotropic-dev-dependencies/lib/register-babel-loader.js"
    }
}
```

The `cross-env` utility fixes issues setting inline environment variables in certain runtime environments.

### Babel Configuration

The package provides multiple Babel environments:

- `browser`: Modern browsers (last 2 years)
- `browser-minify`: Browser targets with minification
- `browser-minify-no-mangle`: Minification without name mangling
- `node`: Current Node.js (ESM)
- `node-cjs`: Current Node.js (CommonJS)
- `node-minify`: Node.js with minification
- `test`: Testing environment with code coverage

To use in your build scripts:

```bash
cross-env BABEL_ENV=node-minify babel --config-file ./node_modules/isotropic-dev-dependencies/config/babel.json js -d lib
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

### Testing with Mocha and Chai

```js
// test/test.js
import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _mocha from 'isotropic-dev-dependencies/lib/mocha.js';

_mocha.describe('My Test Suite', () => {
    _mocha.it('should pass', () => {
        _chai.expect(true).to.be.true;
    });
});
```

Then set your test script to:

```bash
cross-env BABEL_ENV=test c8 -c ./node_modules/isotropic-dev-dependencies/config/c8.json mocha --import=isotropic-dev-dependencies/lib/register-babel-loader.js
```

### c8 Configuration

- 100% coverage requirements for statements, branches, functions, and lines
- LCOV and text-summary reporters
- Inline source maps

### Git Hooks

Git hooks are automatically installed during the `prepare` script. They validate committer information against package.json author and contributors.

## Examples

### Complete package.json Setup

```json
{
    "name": "my-package",
    "devDependencies": {
        "eslint": "~9.8.0",
        "isotropic-dev-dependencies": "~0.3.0"
    },
    "scripts": {
        "build": "cross-env BABEL_ENV=node-minify babel --config-file ./node_modules/isotropic-dev-dependencies/config/babel.json js -d lib --delete-dir-on-start",
        "lint": "eslint js test",
        "postprepare": "node ./node_modules/isotropic-dev-dependencies/lib/install-git-hooks.js",
        "posttest": "[ -z \"$npm_config_coverage\" ] || c8 -c ./node_modules/isotropic-dev-dependencies/config/c8.json check-coverage",
        "prepare": "npm run build",
        "prepublishOnly": "npm test --coverage",
        "pretest": "npm run lint",
        "test": "cross-env BABEL_ENV=test c8 -c ./node_modules/isotropic-dev-dependencies/config/c8.json mocha --import=isotropic-dev-dependencies/lib/register-babel-loader.js"
    },
    "type": "module",
    "version": "0.0.0"
}
```

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/ibi-group/isotropic-dev-dependencies/blob/main/CONTRIBUTING.md) for contribution guidelines.

## Issues

If you encounter any issues, please file them at https://github.com/ibi-group/isotropic-dev-dependencies/issues
