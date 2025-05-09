---
pageClass: rule-details
sidebarDepth: 0
title: vue/html-closing-bracket-spacing
description: require or disallow a space before tag's closing brackets
since: v4.1.0
---

# vue/html-closing-bracket-spacing

> require or disallow a space before tag's closing brackets

- :gear: This rule is included in all of `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/recommended"`, `*.configs["flat/recommended"]`, `"plugin:vue/vue2-recommended"` and `*.configs["flat/vue2-recommended"]`.
- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule aims to enforce consistent spacing style before closing brackets `>` of tags.

<eslint-code-block fix :rules="{'vue/html-closing-bracket-spacing': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div>
  <div foo>
  <div foo="bar">
  </div>
  <div />
  <div foo />
  <div foo="bar" />

  <!-- ✗ BAD -->
  <div >
  <div foo >
  <div foo="bar" >
  </div >
  <div/>
  <div foo/>
  <div foo="bar"/>
</template>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "vue/html-closing-bracket-spacing": ["error", {
    "startTag": "always" | "never",
    "endTag": "always" | "never",
    "selfClosingTag": "always" | "never"
  }]
}
```

- `startTag` (`"always" | "never"`) ... Setting for the `>` of start tags (e.g. `<div>`). Default is `"never"`.
  - `"always"` ... requires one or more spaces.
  - `"never"` ... disallows spaces.
- `endTag` (`"always" | "never"`) ... Setting for the `>` of end tags (e.g. `</div>`). Default is `"never"`.
  - `"always"` ... requires one or more spaces.
  - `"never"` ... disallows spaces.
- `selfClosingTag` (`"always" | "never"`) ... Setting for the `/>` of self-closing tags (e.g. `<div/>`). Default is `"always"`.
  - `"always"` ... requires one or more spaces.
  - `"never"` ... disallows spaces.

### `"startTag": "always", "endTag": "always", "selfClosingTag": "always"`

<eslint-code-block fix :rules="{'vue/html-closing-bracket-spacing': ['error', {startTag: 'always', endTag: 'always', selfClosingTag: 'always' }]}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div >
  <div foo >
  <div foo="bar" >
  </div >
  <div />
  <div foo />
  <div foo="bar" />
</template>
```

</eslint-code-block>

## :couple: Related Rules

- [vue/no-multi-spaces](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/no-multi-spaces.md)
- [vue/html-closing-bracket-newline](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/html-closing-bracket-newline.md)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v4.1.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/html-closing-bracket-spacing.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/html-closing-bracket-spacing.js)
