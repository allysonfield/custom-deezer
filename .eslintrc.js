module.exports = {
  env: {
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:react-native/all'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'react-hooks',
    'react',
    'react-native',
    'jsx-a11y',
    'import',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': ['off', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    camelcase: 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    radix: 'off',
    'no-plusplus': 'off',
    'react/state-in-constructor': 'off',
    'react/sort-comp': 'off',
    'class-methods-use-this': 'off',
    'no-undef': 'off',
    'no-multi-assign': 'off',
    'react/no-this-in-sfc': 'off',
    'global-require': 'off',
    'import/no-unresolved': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'array-callback-return': 'off',
    'react/no-children-prop': 'off',
    'no-lone-blocks': 'off',
    'default-case': 'off',
    'react/prefer-stateless-function': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'no-void': 'off',
    'no-console': 'off',
    'no-useless-escape': 'off',
    'import/extensions': 'off',
    'react-native/no-raw-text': 'off',
    'template-curly-spacing': 'off',
    indent: [
      'off',
      2,
      {
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
};
