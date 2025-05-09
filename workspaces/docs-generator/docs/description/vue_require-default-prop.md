---
pageClass: rule-details
sidebarDepth: 0
title: vue/require-default-prop
description: require default value for props
since: v3.13.0
---

# vue/require-default-prop

> require default value for props

- :gear: This rule is included in all of `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/recommended"`, `*.configs["flat/recommended"]`, `"plugin:vue/vue2-recommended"` and `*.configs["flat/vue2-recommended"]`.

## :book: Rule Details

This rule requires default value to be set for each props that are not marked as `required` (except `Boolean` props).

<eslint-code-block :rules="{'vue/require-default-prop': ['error']}">

```vue
<script>
export default {
  props: {
    /* ✓ GOOD */
    a: {
      type: Number,
      required: true
    },
    b: {
      type: Number,
      default: 0
    },
    c: {
      type: Number,
      default: 0,
      required: false
    },
    d: {
      type: Boolean, // Boolean is the only type that doesn't require default
    },

    /* ✗ BAD */
    e: Number,
    f: [Number, String],
    g: [Boolean, Number],
    j: {
      type: Number
    },
    i: {
      type: Number,
      required: false
    }
  }
}
</script>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related Rules

- [vue/no-boolean-default](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/no-boolean-default.md)

## :books: Further Reading

- [Style guide - Prop definitions](https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v3.13.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/require-default-prop.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/require-default-prop.js)
