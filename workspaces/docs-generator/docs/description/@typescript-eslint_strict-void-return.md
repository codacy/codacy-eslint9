---
description: 'Disallow passing a value-returning function in a position accepting a void function.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/strict-void-return** for documentation.

## Rule Details

TypeScript considers functions returning a value to be assignable to a function returning `void`.
Using this feature of TypeScript can lead to bugs or confusing code.

## Examples

### Return type unsafety

Passing a value-returning function in a place expecting a `void`-returning function can be unsound.
TypeScript generally treats the `void` type as though it has the same runtime behavior as `undefined`,
so this pattern will cause a mismatch between the runtime behavior and the types.

```ts
// TypeScript errors on overtly wrong ways of populating the `void` type...
function returnsVoid(): void {
  return 1234; // TS Error:  Type 'number' is not assignable to type 'void'.
}

// ...but allows more subtle ones
const returnsVoid: () => void = () => 1234;

// Likewise, TypeScript errors on overtly wrong usages of `void` as a runtime value...
declare const v: void;
if (v) {
  // TS Error: An expression of type 'void' cannot be tested for truthiness.
  // ... do something
}

// ...but silently treats `void` as `undefined` in more subtle scenarios
declare const voidOrString: void | string;
if (voidOrString) {
  // voidOrString is narrowed to string in this branch, so this is allowed.
  console.log(voidOrString.toUpperCase());
}
```

Between these two behaviors, examples like the following will throw at runtime, despite not reporting a type error:

<!--tabs-->

#### ❌ Incorrect

```ts
const getNothing: () => void = () => 2137;
const getString: () => string = () => 'Hello';
const maybeString = Math.random() > 0.1 ? getNothing() : getString();
if (maybeString) console.log(maybeString.toUpperCase()); // ❌ Crash if getNothing was called
```

#### ✅ Correct

```ts
const getNothing: () => void = () => {};
const getString: () => string = () => 'Hello';
const maybeString = Math.random() > 0.1 ? getNothing() : getString();
if (maybeString) console.log(maybeString.toUpperCase()); // ✅ No crash
```

<!--/tabs-->

### Unhandled returned promises

If a callback is meant to return void, values returned from functions are likely ignored.
Ignoring a returned Promise means any Promise rejection will be silently ignored
or crash the process depending on runtime.

<!--tabs-->

#### ❌ Incorrect

```ts
declare function takesCallback(cb: () => void): void;

takesCallback(async () => {
  const response = await fetch('https://api.example.com/');
  const data = await response.json();
  console.log(data);
});
```

#### ✅ Correct

```ts
declare function takesCallback(cb: () => void): void;

takesCallback(() => {
  (async () => {
    const response = await fetch('https://api.example.com/');
    const data = await response.json();
    console.log(data);
  })().catch(console.error);
});
```

<!--/tabs-->

:::info
If you only care about promises,
you can use the [`no-misused-promises`](no-misused-promises.mdx) rule instead.
:::

:::tip
Use [`no-floating-promises`](no-floating-promises.mdx)
to also enforce error handling of non-awaited promises in statement positions.
:::

### Ignored returned generators

If a generator is returned from a void function it won't even be started.

<!--tabs-->

#### ❌ Incorrect

```ts
declare function takesCallback(cb: () => void): void;

takesCallback(function* () {
  console.log('Hello');
  yield;
  console.log('World');
});
```

#### ✅ Correct

```ts
declare function takesCallback(cb: () => void): void;

takesCallback(() => {
  function* gen() {
    console.log('Hello');
    yield;
    console.log('World');
  }
  for (const _ of gen());
});
```

<!--/tabs-->

### Accidental dead code

Returning a value from a void function often is an indication of incorrect assumptions about APIs.
Those incorrect assumptions can often lead to unnecessary code.

The following `forEach` loop is a common mistake: its author likely either meant to add `console.log` or meant to use `.map` instead.

<!--tabs-->

#### ❌ Incorrect

```ts
['Kazik', 'Zenek'].forEach(name => `Hello, ${name}!`);
```

#### ✅ Correct

```ts
['Kazik', 'Zenek'].forEach(name => console.log(`Hello, ${name}!`));
```

<!--/tabs-->

### Void context from extended classes

This rule enforces class methods which override a void method to also be void.

<!--tabs-->

#### ❌ Incorrect

```ts
class Foo {
  cb() {
    console.log('foo');
  }
}

class Bar extends Foo {
  cb() {
    super.cb();
    return 'bar';
  }
}
```

#### ✅ Correct

```ts
class Foo {
  cb() {
    console.log('foo');
  }
}

class Bar extends Foo {
  cb() {
    super.cb();
    console.log('bar');
  }
}
```

<!--/tabs-->

### Void context from implemented interfaces

This rule enforces class methods which implement a void method to also be void.

<!--tabs-->

#### ❌ Incorrect

```ts
interface Foo {
  cb(): void;
}

class Bar implements Foo {
  cb() {
    return 'cb';
  }
}
```

#### ✅ Correct

```ts
interface Foo {
  cb(): void;
}

class Bar implements Foo {
  cb() {
    console.log('cb');
  }
}
```

<!--/tabs-->

## Options

### `allowReturnAny`

<!-- insert option description -->

Additional incorrect code when the option is **disabled**:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowReturnAny": false }'
declare function fn(cb: () => void): void;

fn(() => JSON.parse('{}'));

fn(() => {
  return someUntypedApi();
});
```

#### ✅ Correct

```ts option='{ "allowReturnAny": false }'
declare function fn(cb: () => void): void;

fn(() => void JSON.parse('{}'));

fn(() => {
  someUntypedApi();
});
```

<!--/tabs-->

## When Not To Use It

Some projects are architected so that values returned from synchronous `void` functions are generally safe.
If you only want to check for misused `void`s with asynchronous functions then you can use [`no-misused-promises`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-misused-promises.mdx) instead.

In browser contexts, an unhandled Promise will be reported as an error in the console.
It's generally a good idea to also show some kind of indicator on the page that something went wrong,
but if you are just prototyping or don't care about that, the default behavior might be acceptable.
In such cases you can disable this rule.

Similarly, the default server runtime behaviors of crashing the process on unhandled Promise rejections
might be acceptable when developing, for example, a CLI tool.
If your promise handlers simply call `process.exit(1)` on rejection,
you may prefer to avoid this rule and rely on the default behavior.

## Related To

- [`no-misused-promises`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-misused-promises.mdx) - A subset of this rule which only cares about promises.
- [`no-floating-promises`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-floating-promises.mdx) - Warns about unhandled promises in _statement_ positions.
- [`no-confusing-void-expression`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-confusing-void-expression.mdx) - Disallows returning _void_ values.

## Further Reading

- [TypeScript FAQ - Void function assignability](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void)
