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
import react from 'eslint-plugin-react' // ייבוא של הפלאגין הראשי של React

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            // הוספת כללי הליבה של React. זה כולל כללים הקשורים ל-JSX.
            // react.configs.recommended או react.configs.flat.recommended הם אופציות
            // react.configs.all אם רוצים את כל הכללים
            // שימי לב: flat.recommended מיועד ל-flat config
            react.configs.recommended, // או react.configs.flat.recommended אם הכללים לא מסתדרים
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            // הוספת הגדרות ל-parserOptions, כולל ה-React version
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react: react, // הוספת הפלאגין הראשי של React
        },
        // הגדרת גרסת React ב-settings היא קריטית כדי ש-ESLint יבין את ה-new JSX transform
        settings: {
            react: {
                version: 'detect', // או '18.2.0' באופן ספציפי
            },
        },
        rules: {
            // הפלאגין eslint-plugin-react מטפל בזה אוטומטית כשיודע על ה-new JSX transform
            // ולכן אין צורך ב-"react/react-in-jsx-scope": "off"
            // אלא אם כן את עדיין מקבלת שגיאות ספציפיות אלה.
            // כלל "react/jsx-uses-react" גם הוא מטופל אוטומטית.
            "react/react-in-jsx-scope": "off",
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            // אם בכל זאת תקבל שגיאות על React being in scope, נסי להוסיף:
            // 'react/react-in-jsx-scope': 'off',
            // 'react/jsx-uses-react': 'off',
        },
    },
);


