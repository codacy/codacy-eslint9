---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-deprecated-model-definition
description: disallow deprecated `model` definition (in Vue.js 3.0.0+)
since: v9.16.0
---

# vue/no-deprecated-model-definition

> disallow deprecated `model` definition (in Vue.js 3.0.0+)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `*.configs["flat/essential"]`, `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/recommended"` and `*.configs["flat/recommended"]`.
- :bulb: Some problems reported by this rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

## :book: Rule Details

This rule reports use of the component `model` option, which has been deprecated in Vue.js 3.0.0+.

See [Migration Guide – `v-model`](https://v3-migration.vuejs.org/breaking-changes/v-model.html) for more details.

<eslint-code-block :rules="{'vue/no-deprecated-model-definition': ['error']}">

```vue
<script>
export default defineComponent({
  model: {
    prop: 'my-value',
    event: 'input'
  }
})
</script>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "vue/no-deprecated-model-definition": ["error", {
    "allowVue3Compat": true
  }]
}
```

### `"allowVue3Compat": true`

Allow `model` definitions with prop/event names that match the Vue.js 3.0.0+ `v-model` syntax, i.e. `modelValue`/`update:modelValue` or `model-value`/`update:model-value`.

<eslint-code-block :rules="{'vue/no-deprecated-model-definition': ['error', { allowVue3Compat: true }]}">

```vue
<script>
export default defineComponent({
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  }
})
</script>
```

</eslint-code-block>

## :couple: Related Rules

- [vue/valid-model-definition](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/valid-model-definition.md) (for Vue.js 2.x)
- [vue/no-v-model-argument](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/no-v-model-argument.md) (for Vue.js 2.x)

## :books: Further Reading

- [Migration Guide – `v-model`](https://v3-migration.vuejs.org/breaking-changes/v-model.html)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v9.16.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/no-deprecated-model-definition.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/no-deprecated-model-definition.js)
