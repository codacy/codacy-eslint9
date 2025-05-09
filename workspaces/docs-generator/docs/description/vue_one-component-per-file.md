---
pageClass: rule-details
sidebarDepth: 0
title: vue/one-component-per-file
description: enforce that each component should be in its own file
since: v7.0.0
---

# vue/one-component-per-file

> enforce that each component should be in its own file

- :gear: This rule is included in all of `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/recommended"`, `*.configs["flat/recommended"]`, `"plugin:vue/vue2-recommended"` and `*.configs["flat/vue2-recommended"]`.

## :book: Rule Details

This rule checks if there is only one component per file.

<eslint-code-block filename="a.js" language="javascript" :rules="{'vue/one-component-per-file': ['error']}">

```js
/* ✗ BAD */

Vue.component('TodoList', {
  // ...
})

Vue.component('TodoItem', {
  // ...
})
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/one-component-per-file': ['error']}">

```vue
<script>
/* ✓ GOOD */
export default {
  name: 'my-component'
}
</script>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related Rules

- [vue/require-default-export](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/require-default-export.md)

## :books: Further Reading

- [Style guide - Component files](https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.0.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/one-component-per-file.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/one-component-per-file.js)
