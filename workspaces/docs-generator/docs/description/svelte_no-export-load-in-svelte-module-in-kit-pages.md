---
pageClass: 'rule-details'
sidebarDepth: 0
title: 'svelte/no-export-load-in-svelte-module-in-kit-pages'
description: 'disallow exporting load functions in `*.svelte` module in SvelteKit page components.'
since: 'v2.12.0'
---

# svelte/no-export-load-in-svelte-module-in-kit-pages

> disallow exporting load functions in `*.svelte` module in SvelteKit page components.

- :gear: This rule is included in `"plugin:svelte/recommended"`.

## :book: Rule Details

This rule reports unexpected exported `load` function at `<script context="module">`.
At SvelteKit v1.0.0-next.405, `load` function has been moved into a separate file — `+page.js` for pages, `+layout.js` for layouts.
And the API has changed.

<!--eslint-skip-->

```svelte
<script context="module">
  /* eslint svelte/no-export-load-in-svelte-module-in-kit-pages: "error" */
  /* ✓ GOOD  */
  export function foo() {}
  export function bar() {}
  /* ✗ BAD  */
  export function load() {}
  // export const load = () => {}
</script>
```

## :wrench: Options

Nothing. But if you are not using the default routes folder, please set configuration according to the [user guide](https://github.com/sveltejs/eslint-plugin-svelte/tree/refs/tags/main/docs/user-guide.md#settings-svelte).

## :books: Further Reading

- [SvelteKit Migration Guide (v1.0.0-next.405)](https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)

## :rocket: Version

This rule was introduced in eslint-plugin-svelte v2.12.0

## :mag: Implementation

- [Rule source](https://github.com/sveltejs/eslint-plugin-svelte/blob/main/packages/eslint-plugin-svelte/src/rules/no-export-load-in-svelte-module-in-kit-pages.ts)
- [Test source](https://github.com/sveltejs/eslint-plugin-svelte/blob/main/packages/eslint-plugin-svelte/tests/src/rules/no-export-load-in-svelte-module-in-kit-pages.ts)
