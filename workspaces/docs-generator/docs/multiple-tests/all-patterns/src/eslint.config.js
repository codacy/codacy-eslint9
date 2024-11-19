const eslintPluginYml = require('eslint-plugin-yml');
const security = require('eslint-plugin-security')
const securityNode = require('eslint-plugin-security-node')
const xss = require('eslint-plugin-xss')
const lwc = require('@lwc/eslint-plugin-lwc')


module.exports = [
  {
    plugins: {
      'yml': eslintPluginYml,
      'security': security,
      'security-node': securityNode,
      'xss': xss,
      'lwc': lwc
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      }
    },
    "rules": {
      "expect-type_expect": "off"
    }
  }

]