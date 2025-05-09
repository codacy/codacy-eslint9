---
description: 'Disallow non-null assertion in locations that may be confusing.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-confusing-non-null-assertion** for documentation.

Using a non-null assertion (`!`) next to an assignment or equality check (`=` or `==` or `===`) creates code that is confusing as it looks similar to an inequality check (`!=` `!==`).

```typescript
a! == b; // a non-null assertion(`!`) and an equals test(`==`)
a !== b; // not equals test(`!==`)
a! === b; // a non-null assertion(`!`) and a triple equals test(`===`)
```

Using a non-null assertion (`!`) next to an in test (`in`) or an instanceof test (`instanceof`) creates code that is confusing since it may look like the operator is negated, but it is actually not.

<!-- prettier-ignore -->
```typescript
a! in b; // a non-null assertion(`!`) and an in test(`in`)
a !in b; // also a non-null assertion(`!`) and an in test(`in`)
!(a in b); // a negated in test

a! instanceof b; // a non-null assertion(`!`) and an instanceof test(`instanceof`)
a !instanceof b; // also a non-null assertion(`!`) and an instanceof test(`instanceof`)
!(a instanceof b); // a negated instanceof test
````

This rule flags confusing `!` assertions and suggests either removing them or wrapping the asserted expression in `()` parenthesis.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
interface Foo {
  bar?: string;
  num?: number;
}

const foo: Foo = getFoo();
const isEqualsBar = foo.bar! == 'hello';
const isEqualsNum = 1 + foo.num! == 2;
```

#### ✅ Correct

<!-- prettier-ignore -->
```ts
interface Foo {
  bar?: string;
  num?: number;
}

const foo: Foo = getFoo();
const isEqualsBar = foo.bar == 'hello';
const isEqualsNum = (1 + foo.num!) == 2;
```

<!--/tabs-->

## When Not To Use It

If you don't care about this confusion, then you will not need this rule.

## Further Reading

- [`Issue: Easy misunderstanding: "! ==="`](https://github.com/microsoft/TypeScript/issues/37837) in [TypeScript repo](https://github.com/microsoft/TypeScript)
