---
description: 'Disallow Promises in places not designed to handle them.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-misused-promises** for documentation.

This rule forbids providing Promises to logical locations such as if statements in places where the TypeScript compiler allows them but they are not handled properly.
These situations can often arise due to a missing `await` keyword or just a misunderstanding of the way async
functions are handled/awaited.

:::tip
`no-misused-promises` only detects code that provides Promises to incorrect _logical_ locations.
See [`no-floating-promises`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-floating-promises.mdx) for detecting unhandled Promise _statements_.
:::

## Options

### `checksConditionals`

<!-- insert option description -->

If you don't want to check conditionals, you can configure the rule with `"checksConditionals": false`:

```json
{
  "@typescript-eslint/no-misused-promises": [
    "error",
    {
      "checksConditionals": false
    }
  ]
}
```

Doing so prevents the rule from looking at code like `if (somePromise)`.

### `checksVoidReturn`

<!-- insert option description -->

Likewise, if you don't want to check functions that return promises where a void return is
expected, your configuration will look like this:

```json
{
  "@typescript-eslint/no-misused-promises": [
    "error",
    {
      "checksVoidReturn": false
    }
  ]
}
```

You can disable selective parts of the `checksVoidReturn` option by providing an object that disables specific checks. For example, if you don't mind that passing a `() => Promise<void>` to a `() => void` parameter or JSX attribute can lead to a floating unhandled Promise:

```json
{
  "@typescript-eslint/no-misused-promises": [
    "error",
    {
      "checksVoidReturn": {
        "arguments": false,
        "attributes": false
      }
    }
  ]
}
```

The following sub-options are supported:

#### `arguments`

Disables checking an asynchronous function passed as argument where the parameter type expects a function that returns `void`.

#### `attributes`

Disables checking an asynchronous function passed as a JSX attribute expected to be a function that returns `void`.

#### `inheritedMethods`

Disables checking an asynchronous method in a type that extends or implements another type expecting that method to return `void`.

:::note
For now, `no-misused-promises` only checks _named_ methods against extended/implemented types: that is, call/construct/index signatures are ignored. Call signatures are not required in TypeScript to be consistent with one another, and construct signatures cannot be `async` in the first place. Index signature checking may be implemented in the future.
:::

#### `properties`

Disables checking an asynchronous function passed as an object property expected to be a function that returns `void`.

#### `returns`

Disables checking an asynchronous function returned in a function whose return type is a function that returns `void`.

#### `variables`

Disables checking an asynchronous function used as a variable whose return type is a function that returns `void`.

### `checksSpreads`

<!-- insert option description -->

If you don't want to check object spreads, you can add this configuration:

```json
{
  "@typescript-eslint/no-misused-promises": [
    "error",
    {
      "checksSpreads": false
    }
  ]
}
```

## Examples

### `checksConditionals`

<!-- insert option description -->

Examples of code for this rule with `checksConditionals: true`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "checksConditionals": true }'
const promise = Promise.resolve('value');

if (promise) {
  // Do something
}

const val = promise ? 123 : 456;

[1, 2, 3].filter(() => promise);

while (promise) {
  // Do something
}
```

#### ✅ Correct

```ts option='{ "checksConditionals": true }'
const promise = Promise.resolve('value');

// Always `await` the Promise in a conditional
if (await promise) {
  // Do something
}

const val = (await promise) ? 123 : 456;

const returnVal = await promise;
[1, 2, 3].filter(() => returnVal);

while (await promise) {
  // Do something
}
```

<!--/tabs-->

### `checksVoidReturn`

<!-- insert option description -->

Examples of code for this rule with `checksVoidReturn: true`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "checksVoidReturn": true }'
[1, 2, 3].forEach(async value => {
  await fetch(`/${value}`);
});

new Promise<void>(async (resolve, reject) => {
  await fetch('/');
  resolve();
});

document.addEventListener('click', async () => {
  console.log('synchronous call');
  await fetch('/');
  console.log('synchronous call');
});

interface MySyncInterface {
  setThing(): void;
}
class MyClass implements MySyncInterface {
  async setThing(): Promise<void> {
    this.thing = await fetchThing();
  }
}
```

#### ✅ Correct

```ts option='{ "checksVoidReturn": true }'
// for-of puts `await` in outer context
for (const value of [1, 2, 3]) {
  await doSomething(value);
}

// If outer context is not `async`, handle error explicitly
Promise.all(
  [1, 2, 3].map(async value => {
    await doSomething(value);
  }),
).catch(handleError);

// Use an async IIFE wrapper
new Promise((resolve, reject) => {
  // combine with `void` keyword to tell `no-floating-promises` rule to ignore unhandled rejection
  void (async () => {
    await doSomething();
    resolve();
  })();
});

// Name the async wrapper to call it later
document.addEventListener('click', () => {
  const handler = async () => {
    await doSomething();
    otherSynchronousCall();
  };

  try {
    synchronousCall();
  } catch (err) {
    handleSpecificError(err);
  }

  handler().catch(handleError);
});

interface MyAsyncInterface {
  setThing(): Promise<void>;
}
class MyClass implements MyAsyncInterface {
  async setThing(): Promise<void> {
    this.thing = await fetchThing();
  }
}
```

<!--/tabs-->

### `checksSpreads`

<!-- insert option description -->

Examples of code for this rule with `checksSpreads: true`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "checksSpreads": true }'
const getData = () => fetch('/');

console.log({ foo: 42, ...getData() });

const awaitData = async () => {
  await fetch('/');
};

console.log({ foo: 42, ...awaitData() });
```

#### ✅ Correct

```ts option='{ "checksSpreads": true }'
const getData = () => fetch('/');

console.log({ foo: 42, ...(await getData()) });

const awaitData = async () => {
  await fetch('/');
};

console.log({ foo: 42, ...(await awaitData()) });
```

<!--/tabs-->

## When Not To Use It

This rule can be difficult to enable on large existing projects that set up many misused Promises.
Alternately, if you're not worried about crashes from floating or misused Promises -such as if you have global unhandled Promise handlers registered- then in some cases it may be safe to not use this rule.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

## Further Reading

- [TypeScript void function assignability](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void)

## Related To

- [`no-floating-promises`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-floating-promises.mdx)
