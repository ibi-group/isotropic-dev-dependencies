import _eslintPluginIsotropic from 'eslint-plugin-isotropic';
import _globals from 'globals';

export default [{
    languageOptions: {
        ecmaVersion: 2025,
        globals: {
            ..._globals.node,
            __line: 'readonly'
        },
        parserOptions: {
            ecmaFeatures: {
                globalReturn: false,
                impliedStrict: false,
                jsx: false
            },
            ecmaVersion: 2025
        },
        sourceType: 'commonjs'
    },
    linterOptions: {
        reportUnusedDisableDirectives: 'error'
    },
    plugins: _eslintPluginIsotropic.configs.isotropic.plugins,
    rules: _eslintPluginIsotropic.configs.isotropic.rules
}];
