module.exports = {
    env: {
        jest: true,
        browser: true,
        es2021: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:prettier/recommended',
        'prettier',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    plugins: ['prettier', 'react', 'react-hooks', '@typescript-eslint'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        'import/no-cycle': 'off',
        'no-void': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-debugger': 'off',
        'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'prettier/prettier': 'error',
        'react/forbid-prop-types': [2, { forbid: ['any'] }],
        'react/no-unescaped-entities': 'off',
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
        // 'max-len': ['error', { code: 120, tabWidth: 4 }],
        // 'arrow-parens': [2, 'as-needed'],
        'react/no-danger': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
    parser: '@typescript-eslint/parser',
};
