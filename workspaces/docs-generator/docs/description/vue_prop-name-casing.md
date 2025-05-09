---
pageClass: rule-details
sidebarDepth: 0
title: vue/prop-name-casing
description: enforce specific casing for the Prop name in Vue components
since: v4.3.0
---

# vue/prop-name-casing

> enforce specific casing for the Prop name in Vue components

- :gear: This rule is included in all of `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/recommended"`, `*.configs["flat/recommended"]`, `"plugin:vue/vue2-recommended"` and `*.configs["flat/vue2-recommended"]`.

## :book: Rule Details

This rule enforce proper casing of props in vue components(camelCase).

<eslint-code-block :rules="{'vue/prop-name-casing': ['error']}">

```vue
<script>
export default {
  props: {
    /* ✓ GOOD */
    greetingText: String,

    /* ✗ BAD */
    'greeting-text': String,
    greeting_text: String
  }
}
</script>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "vue/prop-name-casing": ["error",
    "camelCase" | "snake_case",
    {
      "ignoreProps": []
    }
  ]
}
```

- `"camelCase"` (default) ... Enforce property names in `props` to camel case.
- `"snake_case"` ... Enforce property names in `props` to snake case.
- `ignoreProps` (`string[]`) ... An array of prop names (or patterns) that don't need to follow the specified casing.

### `"snake_case"`

<eslint-code-block :rules="{'vue/prop-name-casing': ['error', 'snake_case']}">

```vue
<script>
export default {
  props: {
    /* ✓ GOOD */
    greeting_text: String,

    /* ✗ BAD */
    'greeting-text': String,
    greetingText: String
  }
}
</script>
```

</eslint-code-block>

### `"ignoreProps": ["foo-bar", "/^_[a-z]+/u"]`

<eslint-code-block :rules="{'vue/prop-name-casing': ['error', 'camelCase', {
ignoreProps: ['foo-bar', '/^_[a-z]+/u'] }]}">

```vue
<script>
export default {
  props: {
    /* ✓ GOOD */
    greetingText: String,
    'foo-bar': String,
    _uid: String,

    /* ✗ BAD */
    'greeting-text': String,
    greeting_text: String,
    foo_bar: String
  }
}
</script>
```

</eslint-code-block>

## :couple: Related Rules

- [vue/attribute-hyphenation](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/attribute-hyphenation.md)
- [vue/custom-event-name-casing](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/custom-event-name-casing.md)

## :books: Further Reading

- [Style guide - Prop name casing](https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v4.3.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/prop-name-casing.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/prop-name-casing.js)
