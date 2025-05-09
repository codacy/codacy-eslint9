---
pageClass: rule-details
sidebarDepth: 0
title: vue/valid-define-emits
description: enforce valid `defineEmits` compiler macro
since: v7.13.0
---

# vue/valid-define-emits

> enforce valid `defineEmits` compiler macro

- :gear: This rule is included in all of `"plugin:vue/essential"`, `*.configs["flat/essential"]`, `"plugin:vue/vue2-essential"`, `*.configs["flat/vue2-essential"]`, `"plugin:vue/strongly-recommended"`, `*.configs["flat/strongly-recommended"]`, `"plugin:vue/vue2-strongly-recommended"`, `*.configs["flat/vue2-strongly-recommended"]`, `"plugin:vue/recommended"`, `*.configs["flat/recommended"]`, `"plugin:vue/vue2-recommended"` and `*.configs["flat/vue2-recommended"]`.

This rule checks whether `defineEmits` compiler macro is valid.

## :book: Rule Details

This rule reports `defineEmits` compiler macros in the following cases:

- `defineEmits` is referencing locally declared variables.
- `defineEmits` has both a literal type and an argument. e.g. `defineEmits<(e: 'foo')=>void>(['bar'])`
- `defineEmits` has been called multiple times.
- Custom events are defined in both `defineEmits` and `export default {}`.
- Custom events are not defined in either `defineEmits` or `export default {}`.

<eslint-code-block :rules="{'vue/valid-define-emits': ['error']}">

```vue
<script setup>
/* ✓ GOOD */
defineEmits({ notify: null })
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/valid-define-emits': ['error']}">

```vue
<script setup>
/* ✓ GOOD */
defineEmits(['notify'])
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/valid-define-emits': ['error']}">

```vue
<script setup lang="ts">
/* ✓ GOOD */
defineEmits<(e: 'notify') => void>()
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/valid-define-emits': ['error']}">

```vue
<script>
const def = { notify: null }
</script>
<script setup>
/* ✓ GOOD */
defineEmits(def)
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/valid-define-emits': ['error']}">

```vue
<script setup>
/* ✗ BAD */
const def = { notify: null }
defineEmits(def)
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/valid-define-emits': ['error']}">

```vue
<script setup lang="ts">
/* ✗ BAD */
defineEmits<(e: 'notify') => void>({ submit: null })
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/valid-define-emits': ['error']}">

```vue
<script setup>
/* ✗ BAD */
defineEmits({ notify: null })
defineEmits({ submit: null })
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/valid-define-emits': ['error']}">

```vue
<script>
export default {
  emits: { notify: null }
}
</script>
<script setup>
/* ✗ BAD */
defineEmits({ submit: null })
</script>
```

</eslint-code-block>

<eslint-code-block :rules="{'vue/valid-define-emits': ['error']}">

```vue
<script setup>
/* ✗ BAD */
defineEmits()
</script>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related Rules

- [vue/define-emits-declaration](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/define-emits-declaration.md)
- [vue/valid-define-options](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/valid-define-options.md)
- [vue/valid-define-props](https://github.com/vuejs/eslint-plugin-vue/tree/refs/tags/master/docs/rules/valid-define-props.md)

## :rocket: Version

This rule was introduced in eslint-plugin-vue v7.13.0

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/valid-define-emits.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/valid-define-emits.js)
