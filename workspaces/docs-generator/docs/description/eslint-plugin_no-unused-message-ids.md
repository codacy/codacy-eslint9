# Disallow unused `messageId`s in `meta.messages` (`eslint-plugin/no-unused-message-ids`)

💼 This rule is enabled in the ✅ `recommended` [config](https://github.com/eslint-community/eslint-plugin-eslint-plugin#presets).

<!-- end auto-generated rule header -->

When using `meta.messages` and `messageId` to report rule violations, it's possible to mistakenly leave a message in `meta.messages` that is never used.

## Rule Details

Examples of **incorrect** code for this rule:

```js
/* eslint eslint-plugin/no-unused-message-ids: error */

module.exports = {
  meta: {
    messages: {
      foo: 'hello world',
      bar: 'lorem ipsum', // this message is never used
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        context.report({
          node,
          messageId: 'foo',
        });
      },
    };
  },
};
```

Examples of **correct** code for this rule:

```js
/* eslint eslint-plugin/no-unused-message-ids: error */

module.exports = {
  meta: {
    messages: {
      foo: 'hello world',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        context.report({
          node,
          messageId: 'foo',
        });
      },
    };
  },
};
```

## Further Reading

- [ESLint rule docs: `messageId`s](https://eslint.org/docs/latest/extend/custom-rules#messageids)
- [no-missing-message-ids](https://github.com/eslint-community/eslint-plugin-eslint-plugin/tree/refs/tags/main/docs/rules/no-missing-message-ids.md) rule
- [prefer-message-ids](https://github.com/eslint-community/eslint-plugin-eslint-plugin/tree/refs/tags/main/docs/rules/prefer-message-ids.md) rule
