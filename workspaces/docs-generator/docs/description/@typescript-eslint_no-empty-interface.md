---
description: 'Disallow the declaration of empty interfaces.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-empty-interface** for documentation.

:::danger Deprecated

This rule has been deprecated in favour of the more comprehensive [`@typescript-eslint/no-empty-object-type`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-empty-object-type.mdx) rule.

:::

An empty interface in TypeScript does very little: any non-nullable value is assignable to `{}`.
Using an empty interface is often a sign of programmer error, such as misunderstanding the concept of `{}` or forgetting to fill in fields.

This rule aims to ensure that only meaningful interfaces are declared in the code.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
// an empty interface
interface Foo {}

// an interface with only one supertype (Bar === Foo)
interface Bar extends Foo {}

// an interface with an empty list of supertypes
interface Baz {}
```

#### ✅ Correct

```ts
// an interface with any number of members
interface Foo {
  name: string;
}

// same as above
interface Bar {
  age: number;
}

// an interface with more than one supertype
// in this case the interface can be used as a replacement of an intersection type.
interface Baz extends Foo, Bar {}
```

<!--/tabs-->

## Options

### `allowSingleExtends`

<!-- insert option description -->

`allowSingleExtends: true` will silence warnings about extending a single interface without adding additional members.

## When Not To Use It

If you don't care about having empty/meaningless interfaces, then you will not need this rule.

## Related To

- [`no-empty-object-type`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-empty-object-type.mdx)
