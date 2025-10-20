module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  globals: {
    sessionManager: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "max-len": [2, {
        code: 450,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        ignorePattern: 'd="([\\s\\S]*?)"',
      },],
    "vue/match-component-file-name": ["error", {
        extensions: ["jsx"],
        shouldMatchCase: false,
      },],
    "vue/component-name-in-template-casing": ["error", "kebab-case", {
        registeredComponentsOnly: true,
        ignores: [],
      },],
    "no-unused-vars": "off",
    "array-bracket-newline": ["warn", { minItems: 7 }],
    "array-element-newline": ["warn", { minItems: 7 }],
    "vue/max-attributes-per-line": ["error", {
        singleline: 7,
        multiline: 7,
      },],
  },
  overrides: [{
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)",],
      env: {
        jest: true,
      },
    },],
};
