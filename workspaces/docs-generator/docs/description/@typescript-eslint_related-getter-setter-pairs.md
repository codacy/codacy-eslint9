---
description: 'Enforce that `get()` types should be assignable to their equivalent `set()` type.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/related-getter-setter-pairs** for documentation.

TypeScript allows defining different types for a `get` parameter and its corresponding `set` return.
Prior to TypeScript 4.3, the types had to be identical.
From TypeScript 4.3 to 5.0, the `get` type had to be a subtype of the `set` type.
As of TypeScript 5.1, the types may be completely unrelated as long as there is an explicit type annotation.

Defining drastically different types for a `get` and `set` pair can be confusing.
It means that assigning a property to itself would not work:

```ts
// Assumes box.value's get() return is assignable to its set() parameter
box.value = box.value;
```

This rule reports cases where a `get()` and `set()` have the same name, but the `get()`'s type is not assignable to the `set()`'s.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
interface Box {
  get value(): string;
  set value(newValue: number);
}
```

#### ✅ Correct

```ts
interface Box {
  get value(): string;
  set value(newValue: string);
}
```

<!--/tabs-->

## When Not To Use It

If your project needs to model unusual relationships between data, such as older DOM types, this rule may not be useful for you.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

## Further Reading

- [MDN documentation on `get`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
- [MDN documentation on `set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)
- [TypeScript 5.1 Release Notes > Unrelated Types for Getters and Setters](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html#unrelated-types-for-getters-and-setters)
