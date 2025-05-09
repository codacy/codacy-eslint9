---
description: "Disallow type parameters that aren't used multiple times."
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-unnecessary-type-parameters** for documentation.

This rule forbids type parameters that aren't used multiple times in a function, method, or class definition.

Type parameters relate two types.
If a type parameter is only used once, then it is not relating anything.
It can usually be replaced with explicit types such as `unknown`.

At best unnecessary type parameters make code harder to read.
At worst they can be used to disguise unsafe type assertions.

:::warning
This rule was recently added, and has a surprising amount of hidden complexity compared to most of our rules. If you encounter unexpected behavior with it, please check closely the [Limitations](#limitations) and [FAQ](#faq) sections below and our [issue tracker](https://github.com/typescript-eslint/typescript-eslint/issues?q=is%3Aissue+no-unnecessary-type-parameters).
If you don't see your case covered, please [reach out to us](https://typescript-eslint.io/contributing/issues)!
:::

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
function second<A, B>(a: A, b: B): B {
  return b;
}

function parseJSON<T>(input: string): T {
  return JSON.parse(input);
}

function printProperty<T, K extends keyof T>(obj: T, key: K) {
  console.log(obj[key]);
}
```

#### ✅ Correct

```ts
function second<B>(a: unknown, b: B): B {
  return b;
}

function parseJSON(input: string): unknown {
  return JSON.parse(input);
}

function printProperty<T>(obj: T, key: keyof T) {
  console.log(obj[key]);
}

// T appears twice: in the type of arg and as the return type
function identity<T>(arg: T): T {
  return arg;
}

// T appears twice: "keyof T" and in the inferred return type (T[K]).
// K appears twice: "key: K" and in the inferred return type (T[K]).
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

<!--/tabs-->

## Limitations

Note that this rule allows any type parameter that is used multiple times, even if those uses are via a type argument.
For example, the following `T` is used multiple times by virtue of being in an `Array`, even though its name only appears once after declaration:

```ts
declare function createStateHistory<T>(): T[];
```

This is because the type parameter `T` relates multiple methods in `T[]` (`Array<T>`) together, making it used more than once.

Therefore, this rule won't report on type parameters used as a type argument.
This includes type arguments provided to global types such as `Array`, `Map`, and `Set` that have multiple methods and properties that can change values based on the type parameter.

On the other hand, readonly and fixed array-likes such as `readonly T[]`, `ReadonlyArray`, and tuples such as `[T]` are special cases that are specifically reported on when used as input types, or as `readonly` output types.
The following example will be reported because `T` is used only once as type argument for the `ReadonlyArray` global type:

<!--tabs-->

#### ❌ Incorrect

```ts
declare function length<T>(array: ReadonlyArray<T>): number;
```

#### ✅ Correct

```ts
declare function length(array: ReadonlyArray<unknown>): number;
```

<!--/tabs-->

## FAQ

### The return type is only used as an input, so why isn't the rule reporting?

One common reason that this might be the case is when the return type is not specified explicitly.
The rule uses uses type information to count implicit usages of the type parameter in the function signature, including in the inferred return type.
For example, the following function...

```ts
function identity<T>(arg: T) {
  return arg;
}
```

...implicitly has a return type of `T`. Therefore, the type parameter `T` is used twice, and the rule will not report this function.

For other reasons the rule might not be reporting, be sure to check the [Limitations section](#limitations) and other FAQs.

### I'm using the type parameter inside the function, so why is the rule reporting?

You might be surprised to that the rule reports on a function like this:

```ts
function log<T extends string>(string1: T): void {
  const string2: T = string1;
  console.log(string2);
}
```

After all, the type parameter `T` relates the input `string1` and the local variable `string2`, right?
However, this usage is unnecessary, since we can achieve the same results by replacing all usages of the type parameter with its constraint.
That is to say, the function can always be rewritten as:

```ts
function log(string1: string): void {
  const string2: string = string1;
  console.log(string2);
}
```

Therefore, this rule only counts usages of a type parameter in the _signature_ of a function, method, or class, but not in the implementation. See also [#9735](https://github.com/typescript-eslint/typescript-eslint/issues/9735)

### Why am I getting TypeScript errors saying "Object literal may only specify known properties" after removing an unnecessary type parameter?

Suppose you have a situation like the following, which will trigger the rule to report.

```ts
interface SomeProperties {
  foo: string;
}

// T is only used once, so the rule will report.
function serialize<T extends SomeProperties>(x: T): string {
  return JSON.stringify(x);
}

serialize({ foo: 'bar', anotherProperty: 'baz' });
```

If we remove the unnecessary type parameter, we'll get an error:

```ts
function serialize(x: SomeProperties): string {
  return JSON.stringify(x);
}

// TS Error: Object literal may only specify known properties, and 'anotherProperty' does not exist in type 'SomeProperties'.
serialize({ foo: 'bar', anotherProperty: 'baz' });
```

This is because TypeScript figures it's _usually_ an error to explicitly provide excess properties in a location that expects a specific type.
See [the TypeScript handbook's section on excess property checks](https://www.typescriptlang.org/docs/handbook/2/objects.html#excess-property-checks) for further discussion.

To resolve this, you have two approaches to choose from.

1. If it doesn't make sense to accept excess properties in your function, you'll want to fix the errors at the call sites. Usually, you can simply remove any excess properties where the function is called.
2. Otherwise, if you do want your function to accept excess properties, you can modify the parameter type in order to allow excess properties explicitly by using an [index signature](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures):

   ```ts
   interface SomeProperties {
     foo: string;

     // This allows any other properties.
     // You may wish to make these types more specific according to your use case.
     [key: PropertKey]: unknown;
   }

   function serialize(x: SomeProperties): string {
     return JSON.stringify(x);
   }

   // No error!
   serialize({ foo: 'bar', anotherProperty: 'baz' });
   ```

Which solution is appropriate is a case-by-case decision, depending on the intended use case of your function.

### I have a complex scenario that is reported by the rule, but I can't see how to remove the type parameter. What should I do?

Sometimes, you may be able to rewrite the code by reaching for some niche TypeScript features, such as [the `NoInfer<T>` utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#noinfertype) (see [#9751](https://github.com/typescript-eslint/typescript-eslint/issues/9751)).

But, quite possibly, you've hit an edge case where the type is being used in a subtle way that the rule doesn't account for.
For example, the following arcane code is a way of testing whether two types are equal, and will be reported by the rule (see [#9709](https://github.com/typescript-eslint/typescript-eslint/issues/9709)):

<!-- prettier-ignore -->
```ts
type Compute<A> = A extends Function ? A : { [K in keyof A]: Compute<A[K]> };
type Equal<X, Y> =
  (<T1>() => T1 extends Compute<X> ? 1 : 2) extends
    (<T2>() => T2 extends Compute<Y> ? 1 : 2)
  ? true
  : false;
```

In this case, the function types created within the `Equal` type are never expected to be assigned to; they're just created for the purpose of type system manipulations.
This usage is not what the rule is intended to analyze.

Use eslint-disable comments as appropriate to suppress the rule in these kinds of cases.

<!-- TODO - include an FAQ entry regarding instantiation expressions once the conversation in https://github.com/typescript-eslint/typescript-eslint/pull/9536#discussion_r1705850744 is done -->

## When Not To Use It

This rule will report on functions that use type parameters solely to test types, for example:

```ts
function assertType<T>(arg: T) {}

assertType<number>(123);
assertType<number>('abc');
//                 ~~~~~
// Argument of type 'string' is not assignable to parameter of type 'number'.
```

If you're using this pattern then you'll want to disable this rule on files that test types.

## Further Reading

- TypeScript handbook: [Type Parameters Should Appear Twice](https://microsoft.github.io/TypeScript-New-Handbook/everything/#type-parameters-should-appear-twice)
- Effective TypeScript: [The Golden Rule of Generics](https://effectivetypescript.com/2020/08/12/generics-golden-rule/)

## Related To

- eslint-plugin-etc's [`no-misused-generics`](https://github.com/cartant/eslint-plugin-etc/blob/main/docs/rules/no-misused-generics.md)
- wotan's [`no-misused-generics`](https://github.com/fimbullinter/wotan/blob/master/packages/mimir/docs/no-misused-generics.md)
- DefinitelyTyped-tools' [`no-unnecessary-generics`](https://github.com/microsoft/DefinitelyTyped-tools/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-generics.md)
