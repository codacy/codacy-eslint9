---
description: 'Require destructuring from arrays and/or objects.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/prefer-destructuring** for documentation.

It adds support for TypeScript's type annotations in variable declarations.

## Examples

<!--tabs-->

#### `eslint/prefer-destructuring`

```ts
const x: string = obj.x; // This is incorrect and the auto fixer provides following untyped fix.
// const { x } = obj;
```

#### `@typescript-eslint/prefer-destructuring`

```ts
const x: string = obj.x; // This is correct by default. You can also forbid this by an option.
```

<!--/tabs-->

And it infers binding patterns more accurately thanks to the type checker.

<!--tabs-->

#### ❌ Incorrect

```ts
const x = ['a'];
const y = x[0];
```

#### ✅ Correct

```ts
const x = { 0: 'a' };
const y = x[0];
```

It is correct when `enforceForRenamedProperties` is not true.
Valid destructuring syntax is renamed style like `{ 0: y } = x` rather than `[y] = x` because `x` is not iterable.

<!--/tabs-->

## Options

This rule adds the following options:

```ts
type Options = [
  BasePreferDestructuringOptions[0],
  BasePreferDestructuringOptions[1] & {
    enforceForDeclarationWithTypeAnnotation?: boolean;
  },
];

const defaultOptions: Options = [
  basePreferDestructuringDefaultOptions[0],
  {
    ...basePreferDestructuringDefaultOptions[1],
    enforceForDeclarationWithTypeAnnotation: false,
  },
];
```

### `enforceForDeclarationWithTypeAnnotation`

<!-- insert option description -->

Examples with `{ enforceForDeclarationWithTypeAnnotation: true }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "object": true }, { "enforceForDeclarationWithTypeAnnotation": true }'
const x: string = obj.x;
```

#### ✅ Correct

```ts option='{ "object": true }, { "enforceForDeclarationWithTypeAnnotation": true }'
const { x }: { x: string } = obj;
```

<!--/tabs-->

