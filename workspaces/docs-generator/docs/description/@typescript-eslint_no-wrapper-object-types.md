---
description: 'Disallow using confusing built-in primitive class wrappers.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-wrapper-object-types** for documentation.

TypeScript defines several confusing pairs of types that look very similar to each other, but actually mean different things: `boolean`/`Boolean`, `number`/`Number`, `string`/`String`, `bigint`/`BigInt`, `symbol`/`Symbol`, `object`/`Object`.
In general, only the lowercase variant is appropriate to use.
Therefore, this rule enforces that you only use the lowercase variant.

JavaScript has [8 data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) at runtime, and these are described in TypeScript by the lowercase types `undefined`, `null`, `boolean`, `number`, `string`, `bigint`, `symbol`, and `object`.

As for the uppercase types, these are _structural types_ which describe JavaScript "wrapper" objects for each of the data types, such as [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) and [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).
Additionally, due to the quirks of structural typing, the corresponding primitives are _also_ assignable to these uppercase types, since they have the same "shape".

It is a universal best practice to work directly with the built-in primitives, like `0`, rather than objects that "look like" the corresponding primitive, like `new Number(0)`.

- Primitives have the expected value semantics with `==` and `===` equality checks, whereas their object counterparts are compared by reference.
  That is to say, `"str" === "str"` but `new String("str") !== new String("str")`.
- Primitives have well-known behavior around truthiness/falsiness which is common to rely on, whereas all objects are truthy, regardless of the wrapped value (e.g. `new Boolean(false)` is truthy).
- TypeScript only allows arithmetic operations (e.g. `x - y`) to be performed on numeric primitives, not objects.

As a result, using the lowercase type names like `number` in TypeScript types instead of the uppercase names like `Number` is a better practice that describes code more accurately.

Examples of code for this rule:

<!--tabs-->

#### ❌ Incorrect

```ts
let myBigInt: BigInt;
let myBoolean: Boolean;
let myNumber: Number;
let myString: String;
let mySymbol: Symbol;

let myObject: Object = 'allowed by TypeScript';
```

#### ✅ Correct

```ts
let myBigint: bigint;
let myBoolean: boolean;
let myNumber: number;
let myString: string;
let mySymbol: symbol;

let myObject: object = "Type 'string' is not assignable to type 'object'.";
```

<!--/tabs-->

## When Not To Use It

If your project is a rare one that intentionally deals with the class equivalents of primitives, it might not be worthwhile to use this rule.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

## Further Reading

- [MDN documentation on primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
- [MDN documentation on `string` primitives and `String` objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_primitives_and_string_objects)

## Related To

- [`no-empty-object-type`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-empty-object-type.mdx)
- [`no-restricted-types`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-restricted-types.mdx)
- [`no-unsafe-function-type`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-unsafe-function-type.mdx)
