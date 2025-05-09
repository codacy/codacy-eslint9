---
description: 'Disallow using the `delete` operator on computed key expressions.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-dynamic-delete** for documentation.

Deleting dynamically computed keys can be dangerous and in some cases not well optimized.
Using the `delete` operator on keys that aren't runtime constants could be a sign that you're using the wrong data structures.
Consider using a `Map` or `Set` if you’re using an object as a key-value collection.

Dynamically adding and removing keys from objects can cause occasional edge case bugs. For example, some objects use "hidden properties" (such as `__data`) for private storage, and deleting them can break the object's internal state. Furthermore, [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) cannot remove inherited properties or non-configurable properties. This makes it interact badly with anything more complicated than a plain object:

- The [`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) of an array is non-configurable, and deleting it is a runtime error.
- You can't remove properties on the prototype of an object, such as deleting methods from class instances.
- Sometimes, `delete` only removes the own property, leaving the inherited property intact. For example, deleting the [`name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) property of a function only removes the own property, but there's also a `Function.prototype.name` property that remains.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
// Dynamic, difficult-to-reason-about lookups
const name = 'name';
delete container[name];
delete container[name.toUpperCase()];
```

#### ✅ Correct

```ts
const container: { [i: string]: number } = {
  /* ... */
};

// Constant runtime lookups by string index
delete container.aaa;

// Constants that must be accessed by []
delete container[7];
delete container[-1];

// All strings are allowed, to be compatible with the noPropertyAccessFromIndexSignature
// TS compiler option
delete container['aaa'];
delete container['Infinity'];
```

<!--/tabs-->

## When Not To Use It

When you know your keys are safe to delete, this rule can be unnecessary.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

Do not consider this rule as performance advice before profiling your code's bottlenecks.
Even repeated minor performance slowdowns likely do not significantly affect your application's general perceived speed.
