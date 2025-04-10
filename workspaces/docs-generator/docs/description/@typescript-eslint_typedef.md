---
description: 'Require type annotations in certain places.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/typedef** for documentation.

TypeScript cannot always infer types for all places in code.
Some locations require type annotations for their types to be inferred.

This rule can enforce type annotations in locations regardless of whether they're required.
This is typically used to maintain consistency for element types that sometimes require them.

```ts
class ContainsText {
  // There must be a type annotation here to infer the type
  delayedText: string;

  // `typedef` requires a type annotation here to maintain consistency
  immediateTextExplicit: string = 'text';

  // This is still a string type because of its initial value
  immediateTextImplicit = 'text';
}
```

> To enforce type definitions existing on call signatures, use [`explicit-function-return-type`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/explicit-function-return-type.mdx), or [`explicit-module-boundary-types`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.mdx).

:::caution

Requiring type annotations unnecessarily can be cumbersome to maintain and generally reduces code readability.
TypeScript is often better at inferring types than easily written type annotations would allow.

**Instead of enabling `typedef`, it is generally recommended to use the `--noImplicitAny` and `--strictPropertyInitialization` compiler options to enforce type annotations only when useful.**

:::

## Options

For example, with the following configuration:

```json
{
  "rules": {
    "@typescript-eslint/typedef": [
      "error",
      {
        "arrowParameter": true,
        "variableDeclaration": true
      }
    ]
  }
}
```

- Type annotations on arrow function parameters are required
- Type annotations on variables are required

### `arrayDestructuring`

<!-- insert option description -->

Examples of code with `{ "arrayDestructuring": true }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "arrayDestructuring": true }'
const [a] = [1];
const [b, c] = [1, 2];
```

#### ✅ Correct

```ts option='{ "arrayDestructuring": true }'
const [a]: number[] = [1];
const [b]: [number] = [2];
const [c, d]: [boolean, string] = [true, 'text'];

for (const [key, val] of new Map([['key', 1]])) {
}
```

<!--/tabs-->

### `arrowParameter`

<!-- insert option description -->

Examples of code with `{ "arrowParameter": true }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "arrowParameter": true }'
const logsSize = size => console.log(size);

['hello', 'world'].map(text => text.length);

const mapper = {
  map: text => text + '...',
};
```

#### ✅ Correct

```ts option='{ "arrowParameter": true }'
const logsSize = (size: number) => console.log(size);

['hello', 'world'].map((text: string) => text.length);

const mapper = {
  map: (text: string) => text + '...',
};
```

<!--/tabs-->

### `memberVariableDeclaration`

<!-- insert option description -->

Examples of code with `{ "memberVariableDeclaration": true }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "memberVariableDeclaration": true }'
class ContainsText {
  delayedText;
  immediateTextImplicit = 'text';
}
```

#### ✅ Correct

```ts option='{ "memberVariableDeclaration": true }'
class ContainsText {
  delayedText: string;
  immediateTextImplicit: string = 'text';
}
```

<!--/tabs-->

### `objectDestructuring`

<!-- insert option description -->

Examples of code with `{ "objectDestructuring": true }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "objectDestructuring": true }'
const { length } = 'text';
const [b, c] = Math.random() ? [1, 2] : [3, 4];
```

#### ✅ Correct

```ts option='{ "objectDestructuring": true }'
const { length }: { length: number } = 'text';
const [b, c]: [number, number] = Math.random() ? [1, 2] : [3, 4];

for (const { key, val } of [{ key: 'key', val: 1 }]) {
}
```

<!--/tabs-->

### `parameter`

<!-- insert option description -->

Examples of code with `{ "parameter": true }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "parameter": true }'
function logsSize(size): void {
  console.log(size);
}

const doublesSize = function (size): number {
  return size * 2;
};

const divider = {
  curriesSize(size): number {
    return size;
  },
  dividesSize: function (size): number {
    return size / 2;
  },
};

class Logger {
  log(text): boolean {
    console.log('>', text);
    return true;
  }
}
```

#### ✅ Correct

```ts option='{ "parameter": true }'
function logsSize(size: number): void {
  console.log(size);
}

const doublesSize = function (size: number): number {
  return size * 2;
};

const divider = {
  curriesSize(size: number): number {
    return size;
  },
  dividesSize: function (size: number): number {
    return size / 2;
  },
};

class Logger {
  log(text: boolean): boolean {
    console.log('>', text);
    return true;
  }
}
```

<!--/tabs-->

### `propertyDeclaration`

<!-- insert option description -->

Examples of code with `{ "propertyDeclaration": true }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "propertyDeclaration": true }'
type Members = {
  member;
  otherMember;
};
```

#### ✅ Correct

```ts option='{ "propertyDeclaration": true }'
type Members = {
  member: boolean;
  otherMember: string;
};
```

<!--/tabs-->

### `variableDeclaration`

<!-- insert option description -->

Examples of code with `{ "variableDeclaration": true }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "variableDeclaration": true }'
const text = 'text';
let initialText = 'text';
let delayedText;
```

#### ✅ Correct

```ts option='{ "variableDeclaration": true }'
const text: string = 'text';
let initialText: string = 'text';
let delayedText: string;
```

<!--/tabs-->

### `variableDeclarationIgnoreFunction`

<!-- insert option description -->

Examples of code with `{ "variableDeclaration": true, "variableDeclarationIgnoreFunction": true }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "variableDeclaration": true, "variableDeclarationIgnoreFunction": true }'
const text = 'text';
```

#### ✅ Correct

```ts option='{ "variableDeclaration": true, "variableDeclarationIgnoreFunction": true }'
const a = (): void => {};
const b = function (): void {};
const c: () => void = (): void => {};

class Foo {
  a = (): void => {};
  b = function (): void {};
  c: () => void = (): void => {};
}
```

<!--/tabs-->

## When Not To Use It

If you are using stricter TypeScript compiler options, particularly `--noImplicitAny` and/or `--strictPropertyInitialization`, you likely don't need this rule.

In general, if you do not consider the cost of writing unnecessary type annotations reasonable, then do not use this rule.

## Further Reading

- [TypeScript Type System](https://basarat.gitbooks.io/typescript/docs/types/type-system.html)
- [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
