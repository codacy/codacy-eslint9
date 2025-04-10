---
description: 'Require or disallow the `Record` type.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/consistent-indexed-object-style** for documentation.

TypeScript supports defining arbitrary object keys using an index signature or mapped type.
TypeScript also has a builtin type named `Record` to create an empty object defining only an index signature.
For example, the following types are equal:

```ts
interface IndexSignatureInterface {
  [key: string]: unknown;
}

type IndexSignatureType = {
  [key: string]: unknown;
};

type MappedType = {
  [key in string]: unknown;
};

type RecordType = Record<string, unknown>;
```

Using one declaration form consistently improves code readability.

## Options

- `'record'` _(default)_: only allow the `Record` type.
- `'index-signature'`: only allow index signatures.

### `'record'`

<!-- insert option description -->

<!--tabs-->

#### ❌ Incorrect

```ts option='"record"'
interface IndexSignatureInterface {
  [key: string]: unknown;
}

type IndexSignatureType = {
  [key: string]: unknown;
};

type MappedType = {
  [key in string]: unknown;
};
```

#### ✅ Correct

```ts option='"record"'
type RecordType = Record<string, unknown>;
```

<!--/tabs-->

### `'index-signature'`

<!--tabs-->

#### ❌ Incorrect

```ts option='"index-signature"'
type RecordType = Record<string, unknown>;
```

#### ✅ Correct

```ts option='"index-signature"'
interface IndexSignatureInterface {
  [key: string]: unknown;
}

type IndexSignatureType = {
  [key: string]: unknown;
};

type MappedType = {
  [key in string]: unknown;
};
```

<!--/tabs-->

## When Not To Use It

This rule is purely a stylistic rule for maintaining consistency in your project.
You can turn it off if you don't want to keep a consistent style for indexed object types.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.
