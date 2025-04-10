---
description: 'Disallow using code marked as `@deprecated`.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-deprecated** for documentation.

The [JSDoc `@deprecated` tag](https://jsdoc.app/tags-deprecated) can be used to document some piece of code being deprecated.
It's best to avoid using code marked as deprecated.
This rule reports on any references to code marked as `@deprecated`.

:::note
[TypeScript recognizes the `@deprecated` tag](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#deprecated), allowing editors to visually indicate deprecated code — usually with a ~strikethrough~.
However, TypeScript doesn't report type errors for deprecated code on its own.
:::

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
/** @deprecated Use apiV2 instead. */
declare function apiV1(): Promise<string>;

declare function apiV2(): Promise<string>;

await apiV1();
```

```ts

// 'parse' is deprecated. Use the WHATWG URL API instead.
const url = parse('/foo');
```

#### ✅ Correct

```ts
/** @deprecated Use apiV2 instead. */
declare function apiV1(): Promise<string>;

declare function apiV2(): Promise<string>;

await apiV2();
```

```ts
// Modern Node.js API, uses `new URL()`
const url2 = new URL('/foo', 'http://www.example.com');
```

<!--/tabs-->

## Options

### `allow`

<!-- insert option description -->

This option takes the shared [`TypeOrValueSpecifier` format](/packages/type-utils/type-or-value-specifier).

Examples of code for this rule with:

```json
{
  "allow": [
    { "from": "file", "name": "apiV1" },
    { "from": "lib", "name": "escape" }
  ]
}
```

<!--tabs-->

#### ❌ Incorrect

```ts option='{"allow":[{"from":"file","name":"apiV1"},{"from":"lib","name":"escape"}]}'
/** @deprecated */
declare function apiV2(): Promise<string>;

await apiV2();

// `unescape` has been deprecated since ES5.
unescape('...');
```

#### ✅ Correct

```ts option='{"allow":[{"from":"file","name":"apiV1"},{"from":"lib","name":"escape"}]}'

/** @deprecated */
declare function apiV1(): Promise<string>;

await apiV1();

// `escape` has been deprecated since ES5.
escape('...');
```

<!--/tabs-->

## When Not To Use It

If portions of your project heavily use deprecated APIs and have no plan for moving to non-deprecated ones, you might want to disable this rule in those portions.

## Related To

- [`import/no-deprecated`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-deprecated.md) and [`import-x/no-deprecated`](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-deprecated.md): Does not use type information, but does also support [TomDoc](http://tomdoc.org)
- [`eslint-plugin-deprecation`](https://github.com/gund/eslint-plugin-deprecation) ([`deprecation/deprecation`](https://github.com/gund/eslint-plugin-deprecation?tab=readme-ov-file#rules)): Predecessor to this rule in a separate plugin
