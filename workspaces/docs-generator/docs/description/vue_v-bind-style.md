---
pageClass: rule-details
sidebarDepth: 0
title: vue/v-bind-style
description: enforce `v-bind` directive style
since: v3.0.0
---

# vue/v-bind-style

> enforce `v-bind` directive style

- :gear: This rule is included in all of `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/recommended"`, `*.configs["flat/recommended"]`, `"plugin:vue/vue2-recommended"` and `*.configs["flat/vue2-recommended"]`.
- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule enforces `v-bind` directive style which you should use shorthand or long form.

<eslint-code-block fix :rules="{'vue/v-bind-style': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div :foo="bar" />

  <!-- ✗ BAD -->
  <div v-bind:foo="bar" />
</template>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "vue/v-bind-style": ["error", "shorthand" | "longform", {
    "sameNameShorthand": "ignore" | "always" | "never"
  }]
}
```

- `"shorthand"` (default) ... requires using shorthand.
- `"longform"` ... requires using long form.
- `sameNameShorthand` ... enforce the `v-bind` same-name shorthand style (Vue 3.4+).
  - `"ignore"` (default) ... ignores the same-name shorthand style.
  - `"always"` ... always enforces same-name shorthand where possible.
  - `"never"` ... always disallow same-name shorthand where possible.

### `"longform"`

<eslint-code-block fix :rules="{'vue/v-bind-style': ['error', 'longform']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div v-bind:foo="bar" />

  <!-- ✗ BAD -->
  <div :foo="bar" />
</template>
```

</eslint-code-block>

### `{ "sameNameShorthand": "always" }`

<eslint-code-block fix :rules="{'vue/v-bind-style': ['error', 'shorthand', { 'sameNameShorthand': 'always' }]}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div :foo />

  <!-- ✗ BAD -->
  <div :foo="foo" />
</template>
```

</eslint-code-block>

### `{ "sameNameShorthand": "never" }`

<eslint-code-block fix :rules="{'vue/v-bind-style': ['error', 'shorthand', { 'sameNameShorthand': 'never' }]}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div :foo="foo" />

  <!-- ✗ BAD -->
  <div :foo />
</template>
```

</eslint-code-block>

## :books: Further Reading

- [Style guide - Directive shorthands](https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v3.0.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/v-bind-style.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/v-bind-style.js)
