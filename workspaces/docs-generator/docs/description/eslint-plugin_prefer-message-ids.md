# Require using `messageId` instead of `message` or `desc` to report rule violations (`eslint-plugin/prefer-message-ids`)

💼 This rule is enabled in the ✅ `recommended` [config](https://github.com/eslint-community/eslint-plugin-eslint-plugin#presets).

<!-- end auto-generated rule header -->

When reporting a rule violation, it's preferred to provide the violation message with the `messageId` property instead of the `message` property. Message IDs provide the following benefits:

- Rule violation messages can be stored in a central `meta.messages` object for convenient management
- Rule violation messages do not need to be repeated in both the rule file and rule test file
- As a result, the barrier for changing rule violation messages is lower, encouraging more frequent contributions to improve and optimize them for the greatest clarity and usefulness

## Rule Details

This rule catches usages of the `message` property when reporting a rule violation.

Examples of **incorrect** code for this rule:

```js
/* eslint eslint-plugin/prefer-message-ids: error */

module.exports = {
  create(context) {
    return {
      CallExpression(node) {
        context.report({
          node,
          message: 'Some error message.',
        });
      },
    };
  },
};
```

Examples of **correct** code for this rule:

```js
/* eslint eslint-plugin/prefer-message-ids: error */

module.exports = {
  meta: {
    messages: {
      someMessageId: 'Some error message',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        context.report({
          node,
          messageId: 'someMessageId',
        });
      },
    };
  },
};
```

## Further Reading

- [ESLint rule docs: `messageId`s](https://eslint.org/docs/latest/extend/custom-rules#messageids)
- [no-invalid-message-ids](https://github.com/eslint-community/eslint-plugin-eslint-plugin/tree/refs/tags/main/docs/rules/no-invalid-message-ids.md) rule
- [no-missing-message-ids](https://github.com/eslint-community/eslint-plugin-eslint-plugin/tree/refs/tags/main/docs/rules/no-missing-message-ids.md) rule
