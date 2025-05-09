---
description: 'Disallow two overloads that could be unified into one with a union or an optional/rest parameter.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/unified-signatures** for documentation.

Function overload signatures are a TypeScript way to define a function that can be called in multiple very different ways.
Overload signatures add syntax and theoretical bloat, so it's generally best to avoid using them when possible.
Switching to union types and/or optional or rest parameters can often avoid the need for overload signatures.

This rule reports when function overload signatures can be replaced by a single function signature.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
function x(x: number): void;
function x(x: string): void;
```

```ts
function y(): void;
function y(...x: number[]): void;
```

#### ✅ Correct

```ts
function x(x: number | string): void;
```

```ts
function y(...x: number[]): void;
```

```ts
// This rule won't check overload signatures with different rest parameter types.
// See https://github.com/microsoft/TypeScript/issues/5077
function f(...a: number[]): void;
function f(...a: string[]): void;
```

<!--/tabs-->

## Options

### `ignoreDifferentlyNamedParameters`

<!-- insert option description -->

Examples of code for this rule with `ignoreDifferentlyNamedParameters`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignoreDifferentlyNamedParameters": true }'
function f(a: number): void;
function f(a: string): void;
```

#### ✅ Correct

```ts option='{ "ignoreDifferentlyNamedParameters": true }'
function f(a: number): void;
function f(b: string): void;
```

<!--/tabs-->

### `ignoreOverloadsWithDifferentJSDoc`

<!-- insert option description -->

Examples of code for this rule with `ignoreOverloadsWithDifferentJSDoc`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignoreOverloadsWithDifferentJSDoc": true }'
declare function f(x: string): void;
declare function f(x: boolean): void;
/**
 * @deprecate
 */
declare function f(x: number): void;
/**
 * @deprecate
 */
declare function f(x: null): void;
```

#### ✅ Correct

```ts option='{ "ignoreOverloadsWithDifferentJSDoc": true }'
declare function f(x: string): void;
/**
 * This signature does something else.
 */
declare function f(x: boolean): void;
/**
 * @async
 */
declare function f(x: number): void;
/**
 * @deprecate
 */
declare function f(x: null): void;
```

<!--/tabs-->

## When Not To Use It

This is purely a stylistic rule to help with readability of function signature overloads.
You can turn it off if you don't want to consistently keep them next to each other and unified.

## Related To

- [`adjacent-overload-signatures`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.mdx)
