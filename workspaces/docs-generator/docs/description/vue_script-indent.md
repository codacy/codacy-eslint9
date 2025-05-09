---
pageClass: rule-details
sidebarDepth: 0
title: vue/script-indent
description: enforce consistent indentation in `<script>`
since: v4.2.0
---

# vue/script-indent

> enforce consistent indentation in `<script>`

- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces a consistent indentation style in `<script>`. The default style is 2 spaces.

<eslint-code-block fix :rules="{'vue/script-indent': ['error']}">

```vue
<script>
let a = {
  foo: 1,
  bar: 2
}
let b = {
      foo: 1,
      bar: 2
    },
    c = {
      foo: 1,
      bar: 2
    }
const d = {
        foo: 1,
        bar: 2
      },
      e = {
        foo: 1,
        bar: 2
      }
</script>
```

</eslint-code-block>

## :wrench: Options

This rule has some options.

```json
{
  "vue/script-indent": ["error", TYPE, {
    "baseIndent": 0,
    "switchCase": 0,
    "ignores": []
  }]
}
```

- `TYPE` (`number | "tab"`) ... The type of indentation. Default is `2`. If this is a number, it's the number of spaces for one indent. If this is `"tab"`, it uses one tab for one indent.
- `baseIndent` (`integer`) ... The multiplier of indentation for top-level statements. Default is `0`.
- `switchCase` (`integer`) ... The multiplier of indentation for `case`/`default` clauses. Default is `0`.
- `ignores` (`string[]`) ... The selector to ignore nodes. The AST spec is [here](https://github.com/vuejs/vue-eslint-parser/blob/master/docs/ast.md). You can use [esquery](https://github.com/estools/esquery#readme) to select nodes. Default is an empty array.

::: warning Note
This rule only checks `.vue` files and does not interfere with other `.js` files. Unfortunately the default `indent` rule when turned on will try to lint both, so in order to make them complementary you can use `overrides` setting and disable `indent` rule on `.vue` files:
:::

```json
{
  "rules": {
    "vue/script-indent": ["error", 4, { "baseIndent": 1 }]
  },
  "overrides": [
    {
      "files": ["*.vue"],
      "rules": {
        "indent": "off"
      }
    }
  ]
}
```

### `2, "baseIndent": 1`

<eslint-code-block fix :rules="{'vue/script-indent': ['error', 2, { 'baseIndent': 1 }]}">

```vue
<script>
  let a = {
    foo: 1,
    bar: 2
  }
  let b = {
        foo: 1,
        bar: 2
      },
      c = {
        foo: 1,
        bar: 2
      }
  const d = {
          foo: 1,
          bar: 2
        },
        e = {
          foo: 1,
          bar: 2
        }
</script>
```

</eslint-code-block>

## :couple: Related Rules

- [indent](https://eslint.org/docs/rules/indent)
- [vue/html-indent](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/html-indent.md)
- [@typescript-eslint/indent](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/indent.md)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v4.2.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/script-indent.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/script-indent.js)
