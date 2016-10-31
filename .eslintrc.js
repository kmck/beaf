module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true
  },
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', { args: 'none' }],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/react-in-jsx-scope': 'error',
  }
};
