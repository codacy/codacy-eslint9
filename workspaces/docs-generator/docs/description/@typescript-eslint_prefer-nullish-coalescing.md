---
description: 'Enforce using the nullish coalescing operator instead of logical assignments or chaining.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/prefer-nullish-coalescing** for documentation.

The `??` nullish coalescing runtime operator allows providing a default value when dealing with `null` or `undefined`.
Because the nullish coalescing operator _only_ coalesces when the original value is `null` or `undefined`, it is much safer than relying upon logical OR operator chaining `||`, which coalesces on any _falsy_ value.

This rule reports when you may consider replacing:

- An `||` operator with `??`
- An `||=` operator with `??=`
- Ternary expressions (`?:`) that are equivalent to `||` or `??` with `??`
- Assignment expressions (`=`) that can be safely replaced by `??=`

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
declare const a: string | null;
declare const b: string | null;

const c = a || b;

declare let foo: { a: string } | null;
declare function makeFoo(): { a: string };

function lazyInitializeFooByTruthiness() {
  if (!foo) {
    foo = makeFoo();
  }
}

function lazyInitializeFooByNullCheck() {
  if (foo == null) {
    foo = makeFoo();
  }
}
```

#### ✅ Correct

```ts
declare const a: string | null;
declare const b: string | null;

const c = a ?? b;

declare let foo: { a: string } | null;
declare function makeFoo(): { a: string };

function lazyInitializeFoo() {
  foo ??= makeFoo();
}
```

<!--/tabs-->

:::caution
This rule will not work as expected if [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) is not enabled.
:::

## Options

### `ignoreTernaryTests`

<!-- insert option description -->

Examples of code for this rule with `{ ignoreTernaryTests: false }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignoreTernaryTests": false }'
declare const a: any;
a !== undefined && a !== null ? a : 'a string';
a === undefined || a === null ? 'a string' : a;
a == undefined ? 'a string' : a;
a == null ? 'a string' : a;

declare const b: string | undefined;
b !== undefined ? b : 'a string';
b === undefined ? 'a string' : b;
b ? b : 'a string';
!b ? 'a string' : b;

declare const c: string | null;
c !== null ? c : 'a string';
c === null ? 'a string' : c;
c ? c : 'a string';
!c ? 'a string' : c;
```

#### ✅ Correct

```ts option='{ "ignoreTernaryTests": false }'
declare const a: any;
a ?? 'a string';

declare const b: string | undefined;
b ?? 'a string';

declare const c: string | null;
c ?? 'a string';
```

<!--/tabs-->

### `ignoreIfStatements`

<!-- insert option description -->

Examples of code for this rule with `{ ignoreIfStatements: false }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignoreIfStatements": false }'
declare let foo: { a: string } | null;
declare function makeFoo(): { a: string };

function lazyInitializeFoo1() {
  if (!foo) {
    foo = makeFoo();
  }
}

function lazyInitializeFoo2() {
  if (!foo) foo = makeFoo();
}
```

#### ✅ Correct

```ts option='{ "ignoreIfStatements": false }'
declare let foo: { a: string } | null;
declare function makeFoo(): { a: string };

function lazyInitializeFoo1() {
  foo ??= makeFoo();
}

function lazyInitializeFoo2() {
  foo ??= makeFoo();
}
```

<!--/tabs-->

### `ignoreConditionalTests`

<!-- insert option description -->

Generally expressions within conditional tests intentionally use the falsy fallthrough behavior of the logical or operator, meaning that fixing the operator to the nullish coalesce operator could cause bugs.

If you're looking to enforce stricter conditional tests, you should consider using the `strict-boolean-expressions` rule.

Examples of code for this rule with `{ ignoreConditionalTests: false }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignoreConditionalTests": false }'
declare let a: string | null;
declare const b: string | null;

if (a || b) {
}
if ((a ||= b)) {
}
while (a || b) {}
while ((a ||= b)) {}
do {} while (a || b);
for (let i = 0; a || b; i += 1) {}
a || b ? true : false;
```

#### ✅ Correct

```ts option='{ "ignoreConditionalTests": false }'
declare let a: string | null;
declare const b: string | null;

if (a ?? b) {
}
if ((a ??= b)) {
}
while (a ?? b) {}
while ((a ??= b)) {}
do {} while (a ?? b);
for (let i = 0; a ?? b; i += 1) {}
(a ?? b) ? true : false;
```

<!--/tabs-->

### `ignoreMixedLogicalExpressions`

<!-- insert option description -->

Generally expressions within mixed logical expressions intentionally use the falsy fallthrough behavior of the logical or operator, meaning that fixing the operator to the nullish coalesce operator could cause bugs.

If you're looking to enforce stricter conditional tests, you should consider using the `strict-boolean-expressions` rule.

Examples of code for this rule with `{ ignoreMixedLogicalExpressions: false }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignoreMixedLogicalExpressions": false }'
declare let a: string | null;
declare const b: string | null;
declare const c: string | null;
declare const d: string | null;

a || (b && c);
a ||= b && c;
(a && b) || c || d;
a || (b && c) || d;
a || (b && c && d);
```

#### ✅ Correct

```ts option='{ "ignoreMixedLogicalExpressions": false }'
declare let a: string | null;
declare const b: string | null;
declare const c: string | null;
declare const d: string | null;

a ?? (b && c);
a ??= b && c;
(a && b) ?? c ?? d;
a ?? (b && c) ?? d;
a ?? (b && c && d);
```

<!--/tabs-->

**_NOTE:_** Errors for this specific case will be presented as suggestions (see below), instead of fixes. This is because it is not always safe to automatically convert `||` to `??` within a mixed logical expression, as we cannot tell the intended precedence of the operator. Note that by design, `??` requires parentheses when used with `&&` or `||` in the same expression.

### `ignorePrimitives`

<!-- insert option description -->

If you would like to ignore expressions containing operands of certain primitive types that can be falsy then you may pass an object containing a boolean value for each primitive:

- `string: true`, ignores `null` or `undefined` unions with `string` (default: `false`).
- `number: true`, ignores `null` or `undefined` unions with `number` (default: `false`).
- `bigint: true`, ignores `null` or `undefined` unions with `bigint` (default: `false`).
- `boolean: true`, ignores `null` or `undefined` unions with `boolean` (default: `false`).

Examples of code for this rule with `{ ignorePrimitives: { string: false } }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignorePrimitives": { "string": false } }'
declare const foo: string | undefined;

foo || 'a string';
```

#### ✅ Correct

```ts option='{ "ignorePrimitives": { "string": false } }'
declare const foo: string | undefined;

foo ?? 'a string';
```

<!--/tabs-->

Also, if you would like to ignore all primitives types, you can set `ignorePrimitives: true`. It is equivalent to `ignorePrimitives: { string: true, number: true, bigint: true, boolean: true }`.

### `ignoreBooleanCoercion`

<!-- insert option description -->

Examples of code for this rule with `{ ignoreBooleanCoercion: false }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignoreBooleanCoercion": false }'
declare const a: string | true | undefined;
declare const b: string | boolean | undefined;

const x = Boolean(a || b);
```

#### ✅ Correct

```ts option='{ "ignoreBooleanCoercion": false }'
declare const a: string | true | undefined;
declare const b: string | boolean | undefined;

const x = Boolean(a ?? b);
```

<!--/tabs-->

### `allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing`

:::danger Deprecated

This option will be removed in the next major version of typescript-eslint.

:::

<!-- insert option description -->

Without `strictNullChecks`, TypeScript essentially erases `undefined` and `null` from the types. This means when this rule inspects the types from a variable, **it will not be able to tell that the variable might be `null` or `undefined`**, which essentially makes this rule useless.

You should be using `strictNullChecks` to ensure complete type-safety in your codebase.

If for some reason you cannot turn on `strictNullChecks`, but still want to use this rule - you can use this option to allow it - but know that the behavior of this rule is _undefined_ with the compiler option turned off. We will not accept bug reports if you are using this option.

## When Not To Use It

If you are not using TypeScript 3.7 (or greater), then you will not be able to use this rule, as the operator is not supported.

## Further Reading

- [TypeScript 3.7 Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html)
- [Nullish Coalescing Operator Proposal](https://github.com/tc39/proposal-nullish-coalescing/)
- [`logical-assignment-operators`](https://eslint.org/docs/latest/rules/logical-assignment-operators)
