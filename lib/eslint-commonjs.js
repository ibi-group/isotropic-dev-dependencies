import _eslintPluginIsotropic from 'eslint-plugin-isotropic';
import _globals from 'globals';

export default [{
    languageOptions: {
        ecmaVersion: 2026,
        globals: {
            ..._globals.node
        },
        parserOptions: {
            ecmaFeatures: {
                globalReturn: false,
                impliedStrict: false,
                jsx: false
            },
            ecmaVersion: 2026
        },
        sourceType: 'commonjs'
    },
    linterOptions: {
        reportUnusedDisableDirectives: 'error'
    },
    plugins: _eslintPluginIsotropic.configs.isotropic.plugins,
    rules: _eslintPluginIsotropic.configs.isotropic.rules
}];
