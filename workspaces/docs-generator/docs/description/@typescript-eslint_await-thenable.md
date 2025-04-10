---
description: 'Disallow awaiting a value that is not a Thenable.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/await-thenable** for documentation.

A "Thenable" value is an object which has a `then` method, such as a Promise.
The [`await` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) is generally used to retrieve the result of calling a Thenable's `then` method.

If the `await` keyword is used on a value that is not a Thenable, the value is directly resolved, but will still pause execution until the next microtask.
While doing so is valid JavaScript, it is often a programmer error, such as forgetting to add parenthesis to call a function that returns a Promise.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
await 'value';

const createValue = () => 'value';
await createValue();
```

#### ✅ Correct

```ts
await Promise.resolve('value');

const createValue = async () => 'value';
await createValue();
```

<!--/tabs-->

## Async Iteration (`for await...of` Loops)

This rule also inspects [`for await...of` statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of), and reports if the value being iterated over is not async-iterable.

:::info[Why does the rule report on `for await...of` loops used on an array of Promises?]

While `for await...of` can be used with synchronous iterables, and it will await each promise produced by the iterable, it is inadvisable to do so.
There are some tiny nuances that you may want to consider.

The biggest difference between using `for await...of` and using `for...of` (apart from awaiting each result yourself) is error handling.
When an error occurs within the loop body, `for await...of` does _not_ close the original sync iterable, while `for...of` does.
For detailed examples of this, see the [MDN documentation on using `for await...of` with sync-iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of#iterating_over_sync_iterables_and_generators).

Also consider whether you need sequential awaiting at all. Using `for await...of` may obscure potential opportunities for concurrent processing, such as those reported by [`no-await-in-loop`](https://eslint.org/docs/latest/rules/no-await-in-loop). Consider instead using one of the [promise concurrency methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#promise_concurrency) for better performance.

:::

### Examples

<!--tabs-->

#### ❌ Incorrect

```ts
async function syncIterable() {
  const arrayOfValues = [1, 2, 3];
  for await (const value of arrayOfValues) {
    console.log(value);
  }
}

async function syncIterableOfPromises() {
  const arrayOfPromises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ];
  for await (const promisedValue of arrayOfPromises) {
    console.log(promisedValue);
  }
}
```

#### ✅ Correct

```ts
async function syncIterable() {
  const arrayOfValues = [1, 2, 3];
  for (const value of arrayOfValues) {
    console.log(value);
  }
}

async function syncIterableOfPromises() {
  const arrayOfPromises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ];
  for (const promisedValue of await Promise.all(arrayOfPromises)) {
    console.log(promisedValue);
  }
}

async function validUseOfForAwaitOnAsyncIterable() {
  async function* yieldThingsAsynchronously() {
    yield 1;
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield 2;
  }

  for await (const promisedValue of yieldThingsAsynchronously()) {
    console.log(promisedValue);
  }
}
```

<!--/tabs-->

## Explicit Resource Management (`await using` Statements)

This rule also inspects [`await using` statements](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management).
If the disposable being used is not async-disposable, an `await using` statement is unnecessary.

### Examples

<!--tabs-->

#### ❌ Incorrect

```ts
function makeSyncDisposable(): Disposable {
  return {
    [Symbol.dispose](): void {
      // Dispose of the resource
    },
  };
}

async function shouldNotAwait() {
  await using resource = makeSyncDisposable();
}
```

#### ✅ Correct

```ts
function makeSyncDisposable(): Disposable {
  return {
    [Symbol.dispose](): void {
      // Dispose of the resource
    },
  };
}

async function shouldNotAwait() {
  using resource = makeSyncDisposable();
}

function makeAsyncDisposable(): AsyncDisposable {
  return {
    async [Symbol.asyncDispose](): Promise<void> {
      // Dispose of the resource asynchronously
    },
  };
}

async function shouldAwait() {
  await using resource = makeAsyncDisposable();
}
```

<!--/tabs-->

## When Not To Use It

If you want to allow code to `await` non-Promise values.
For example, if your framework is in transition from one style of asynchronous code to another, it may be useful to include `await`s unnecessarily.
This is generally not preferred but can sometimes be useful for visual consistency.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.
