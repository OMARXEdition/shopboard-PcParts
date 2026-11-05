import js from '@eslint/js'
import ts from 'typescript-eslint'
import globals from 'globals'
import hooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier'
export default [
  { ignores: ['dist/**', 'node_modules/**', '.claude/**', '.husky/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { 'react-hooks': hooks },
    rules: {
      ...hooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSAsExpression',
          message:
            'Use runtime narrowing or an explicit declaration instead of an as assertion.',
        },
        {
          selector: 'TSTypeAssertion',
          message:
            'Use runtime narrowing instead of an angle-bracket type assertion.',
        },
      ],
    },
  },
  prettier,
]
