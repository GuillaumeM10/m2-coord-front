// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettierConfig,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/no-inferrable-types": "off",
      "prettier/prettier": "error",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
    ignores: [
      '.angular/**',
      '.idea/**',
      '.vscode/**',
      'dist/**',
      'node_modules/**',
      'public/**',
      'src/api/**',
    ]
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
