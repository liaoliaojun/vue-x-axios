// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
    amd: true,
    commonjs: true
  },
  globals: {
    __HOST__: false
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: "standard",
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "indent": ["error", 4, { "SwitchCase": 1 }],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": false
      }
    }],
    "valid-jsdoc": ["error", {
      "requireReturn": false
    }]
  }
}
