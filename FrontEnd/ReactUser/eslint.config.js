//import js from '@eslint/js'
//import globals from 'globals'
//import reactHooks from 'eslint-plugin-react-hooks'
//import reactRefresh from 'eslint-plugin-react-refresh'
//import tseslint from 'typescript-eslint'

//export default tseslint.config(
//  { ignores: ['dist'] },
//  {
//    extends: [js.configs.recommended, ...tseslint.configs.recommended],
//    files: ['**/*.{ts,tsx}'],
//    languageOptions: {
//      ecmaVersion: 2020,
//      globals: globals.browser,
//    },
//    plugins: {
//      'react-hooks': reactHooks,
//      'react-refresh': reactRefresh,
//    },
//    rules: {
//      ...reactHooks.configs.recommended.rules,
//      'react-refresh/only-export-components': [
//        'warn',
//        { allowConstantExport: true },
//      ],
//    },
//  },
//)

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react' // ����� �� ������� ����� �� React

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            // ����� ���� ����� �� React. �� ���� ����� ������� �-JSX.
            // react.configs.recommended �� react.configs.flat.recommended �� �������
            // react.configs.all �� ����� �� �� ������
            // ���� ��: flat.recommended ����� �-flat config
            react.configs.recommended, // �� react.configs.flat.recommended �� ������ �� �������
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            // ����� ������ �-parserOptions, ���� �-React version
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react: react, // ����� ������� ����� �� React
        },
        // ����� ���� React �-settings ��� ������ ��� �-ESLint ���� �� �-new JSX transform
        settings: {
            react: {
                version: 'detect', // �� '18.2.0' ����� ������
            },
        },
        rules: {
            // ������� eslint-plugin-react ���� ��� �������� ������ �� �-new JSX transform
            // ���� ��� ���� �-"react/react-in-jsx-scope": "off"
            // ��� �� �� �� ����� ����� ������ �������� ���.
            // ��� "react/jsx-uses-react" �� ��� ����� ��������.
            "react/react-in-jsx-scope": "off",
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            // �� ��� ��� ���� ������ �� React being in scope, ��� ������:
            // 'react/react-in-jsx-scope': 'off',
            // 'react/jsx-uses-react': 'off',
        },
    },
);


