---
description: 'Disallow the use of variables before they are defined.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-use-before-define** for documentation.

It adds support for `type`, `interface` and `enum` declarations.

## Options

This rule adds the following options:

```ts
interface Options extends BaseNoUseBeforeDefineOptions {
  enums?: boolean;
  typedefs?: boolean;
  ignoreTypeReferences?: boolean;
}

const defaultOptions: Options = {
  ...baseNoUseBeforeDefineDefaultOptions,
  enums: true,
  typedefs: true,
  ignoreTypeReferences: true,
};
```

### `enums`

<!-- insert option description -->

If this is `true`, this rule warns every reference to a enum before the enum declaration.
If this is `false`, this rule will ignore references to enums, when the reference is in a child scope.

Examples of code for the `{ "enums": true }` option:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "enums": true }'
const x = Foo.FOO;

enum Foo {
  FOO,
}
```

#### ✅ Correct

```ts option='{ "enums": false }'
function foo() {
  return Foo.FOO;
}

enum Foo {
  FOO,
}
```

<!--/tabs-->

### `typedefs`

<!-- insert option description -->

If this is `true`, this rule warns every reference to a type before the type declaration.
If this is `false`, this rule will ignore references to types.

Examples of **correct** code for the `{ "typedefs": false }` option:

```ts option='{ "typedefs": false }' showPlaygroundButton
let myVar: StringOrNumber;
type StringOrNumber = string | number;
```

### `ignoreTypeReferences`

<!-- insert option description -->

If this is `true`, this rule ignores all type references.
If this is `false`, this will check all type references.

Examples of **correct** code for the `{ "ignoreTypeReferences": true }` option:

```ts option='{ "ignoreTypeReferences": true }' showPlaygroundButton
let var1: StringOrNumber;
type StringOrNumber = string | number;

let var2: Enum;
enum Enum {}
```
