module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'default-case': 'off',
    'consistent-return': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': 'error',
    "react/prop-types": 'off' ,
    'react/jsx-props-no-spreading': 'off',
    'no-console': 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off'
  },
};
