---
description: 'Require function parameters to be typed as `readonly` to prevent accidental mutation of inputs.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/prefer-readonly-parameter-types** for documentation.

Mutating function arguments can lead to confusing, hard to debug behavior.
Whilst it's easy to implicitly remember to not modify function arguments, explicitly typing arguments as readonly provides clear contract to consumers.
This contract makes it easier for a consumer to reason about if a function has side-effects.

This rule allows you to enforce that function parameters resolve to readonly types.
A type is considered readonly if:

- it is a primitive type (`string`, `number`, `boolean`, `symbol`, or an enum),
- it is a function signature type,
- it is a readonly array type whose element type is considered readonly.
- it is a readonly tuple type whose elements are all considered readonly.
- it is an object type whose properties are all marked as readonly, and whose values are all considered readonly.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
function array1(arg: string[]) {} // array is not readonly
function array2(arg: readonly string[][]) {} // array element is not readonly
function array3(arg: [string, number]) {} // tuple is not readonly
function array4(arg: readonly [string[], number]) {} // tuple element is not readonly
// the above examples work the same if you use ReadonlyArray<T> instead

function object1(arg: { prop: string }) {} // property is not readonly
function object2(arg: { readonly prop: string; prop2: string }) {} // not all properties are readonly
function object3(arg: { readonly prop: { prop2: string } }) {} // nested property is not readonly
// the above examples work the same if you use Readonly<T> instead

interface CustomArrayType extends ReadonlyArray<string> {
  prop: string; // note: this property is mutable
}
function custom1(arg: CustomArrayType) {}

interface CustomFunction {
  (): void;
  prop: string; // note: this property is mutable
}
function custom2(arg: CustomFunction) {}

function union(arg: string[] | ReadonlyArray<number[]>) {} // not all types are readonly

// rule also checks function types
interface Foo {
  (arg: string[]): void;
}
interface Foo {
  new (arg: string[]): void;
}
const x = { foo(arg: string[]): void {} };
function foo(arg: string[]);
type Foo = (arg: string[]) => void;
interface Foo {
  foo(arg: string[]): void;
}
```

#### ✅ Correct

```ts
function array1(arg: readonly string[]) {}
function array2(arg: readonly (readonly string[])[]) {}
function array3(arg: readonly [string, number]) {}
function array4(arg: readonly [readonly string[], number]) {}
// the above examples work the same if you use ReadonlyArray<T> instead

function object1(arg: { readonly prop: string }) {}
function object2(arg: { readonly prop: string; readonly prop2: string }) {}
function object3(arg: { readonly prop: { readonly prop2: string } }) {}
// the above examples work the same if you use Readonly<T> instead

interface CustomArrayType extends ReadonlyArray<string> {
  readonly prop: string;
}
function custom1(arg: Readonly<CustomArrayType>) {}
// interfaces that extend the array types are not considered arrays, and thus must be made readonly.

interface CustomFunction {
  (): void;
  readonly prop: string;
}
function custom2(arg: CustomFunction) {}

function union(arg: readonly string[] | ReadonlyArray<number>) {}

function primitive1(arg: string) {}
function primitive2(arg: number) {}
function primitive3(arg: boolean) {}
function primitive4(arg: unknown) {}
function primitive5(arg: null) {}
function primitive6(arg: undefined) {}
function primitive7(arg: any) {}
function primitive8(arg: never) {}
function primitive9(arg: string | number | undefined) {}

function fnSig(arg: () => void) {}

enum Foo {
  a,
  b,
}
function enumArg(arg: Foo) {}

function symb1(arg: symbol) {}
const customSymbol = Symbol('a');
function symb2(arg: typeof customSymbol) {}

// function types
interface Foo {
  (arg: readonly string[]): void;
}
interface Foo {
  new (arg: readonly string[]): void;
}
const x = { foo(arg: readonly string[]): void {} };
function foo(arg: readonly string[]);
type Foo = (arg: readonly string[]) => void;
interface Foo {
  foo(arg: readonly string[]): void;
}
```

<!--/tabs-->

## Options

### `allow`

<!-- insert option description -->

Some complex types cannot easily be made readonly, for example the `HTMLElement` type or the `JQueryStatic` type from `@types/jquery`. This option allows you to globally disable reporting of such types.

This option takes the shared [`TypeOrValueSpecifier` format](/packages/type-utils/type-or-value-specifier).

Examples of code for this rule with:

```json
{
  "allow": [
    { "from": "file", "name": "Foo" },
    { "from": "lib", "name": "HTMLElement" },
    { "from": "package", "name": "Bar", "package": "bar-lib" }
  ]
}
```

<!--tabs-->

#### ❌ Incorrect

```ts option='{"allow":[{"from":"file","name":"Foo"},{"from":"lib","name":"HTMLElement"},{"from":"package","name":"Bar","package":"bar-lib"}]}'
interface ThisIsMutable {
  prop: string;
}

interface Wrapper {
  sub: ThisIsMutable;
}

interface WrapperWithOther {
  readonly sub: Foo;
  otherProp: string;
}

// Incorrect because ThisIsMutable is not readonly
function fn1(arg: ThisIsMutable) {}

// Incorrect because Wrapper.sub is not readonly
function fn2(arg: Wrapper) {}

// Incorrect because WrapperWithOther.otherProp is not readonly and not in the allowlist
function fn3(arg: WrapperWithOther) {}
```

```ts option='{"allow":[{"from":"file","name":"Foo"},{"from":"lib","name":"HTMLElement"},{"from":"package","name":"Bar","package":"bar-lib"}]}'

interface HTMLElement {
  prop: string;
}

// Incorrect because Foo is not a local type
function fn1(arg: Foo) {}

// Incorrect because HTMLElement is not from the default library
function fn2(arg: HTMLElement) {}

// Incorrect because Bar is not from "bar-lib"
function fn3(arg: Bar) {}
```

#### ✅ Correct

```ts option='{"allow":[{"from":"file","name":"Foo"},{"from":"lib","name":"HTMLElement"},{"from":"package","name":"Bar","package":"bar-lib"}]}'
interface Foo {
  prop: string;
}

interface Wrapper {
  readonly sub: Foo;
  readonly otherProp: string;
}

// Works because Foo is allowed
function fn1(arg: Foo) {}

// Works even when Foo is nested somewhere in the type, with other properties still being checked
function fn2(arg: Wrapper) {}
```

```ts option='{"allow":[{"from":"file","name":"Foo"},{"from":"lib","name":"HTMLElement"},{"from":"package","name":"Bar","package":"bar-lib"}]}'

interface Foo {
  prop: string;
}

// Works because Foo is a local type
function fn1(arg: Foo) {}

// Works because HTMLElement is from the default library
function fn2(arg: HTMLElement) {}

// Works because Bar is from "bar-lib"
function fn3(arg: Bar) {}
```

```ts option='{"allow":[{"from":"file","name":"Foo"},{"from":"lib","name":"HTMLElement"},{"from":"package","name":"Bar","package":"bar-lib"}]}'

// Works because Foo is still a local type - it has to be in the same package
function fn(arg: Foo) {}
```

<!--/tabs-->

### `checkParameterProperties`

<!-- insert option description -->

Because parameter properties create properties on the class, it may be undesirable to force them to be readonly.

Examples of code for this rule with `{checkParameterProperties: true}`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "checkParameterProperties": true }'
class Foo {
  constructor(private paramProp: string[]) {}
}
```

#### ✅ Correct

```ts option='{ "checkParameterProperties": true }'
class Foo {
  constructor(private paramProp: readonly string[]) {}
}
```

<!--/tabs-->

Examples of **correct** code for this rule with `{checkParameterProperties: false}`:

```ts option='{ "checkParameterProperties": false }' showPlaygroundButton
class Foo {
  constructor(
    private paramProp1: string[],
    private paramProp2: readonly string[],
  ) {}
}
```

### `ignoreInferredTypes`

<!-- insert option description -->

This may be desirable in cases where an external dependency specifies a callback with mutable parameters, and manually annotating the callback's parameters is undesirable.

Examples of code for this rule with `{ignoreInferredTypes: true}`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignoreInferredTypes": true }' skipValidation

acceptsCallback((options: CallbackOptions) => {});
```

<details>
<summary>external-dependency.d.ts</summary>

```ts option='{ "ignoreInferredTypes": true }'
export interface CallbackOptions {
  prop: string;
}
type Callback = (options: CallbackOptions) => void;
type AcceptsCallback = (callback: Callback) => void;

export const acceptsCallback: AcceptsCallback;
```

</details>

#### ✅ Correct

```ts option='{ "ignoreInferredTypes": true }'

acceptsCallback(options => {});
```

<details>
<summary>external-dependency.d.ts</summary>

```ts option='{ "ignoreInferredTypes": true }' skipValidation
export interface CallbackOptions {
  prop: string;
}
type Callback = (options: CallbackOptions) => void;
type AcceptsCallback = (callback: Callback) => void;

export const acceptsCallback: AcceptsCallback;
```

</details>

<!--/tabs-->

### `treatMethodsAsReadonly`

<!-- insert option description -->

This may be desirable when you are never reassigning methods.

Examples of code for this rule with `{treatMethodsAsReadonly: false}`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "treatMethodsAsReadonly": false }'
type MyType = {
  readonly prop: string;
  method(): string; // note: this method is mutable
};
function foo(arg: MyType) {}
```

#### ✅ Correct

```ts option='{ "treatMethodsAsReadonly": false }'
type MyType = Readonly<{
  prop: string;
  method(): string;
}>;
function foo(arg: MyType) {}

type MyOtherType = {
  readonly prop: string;
  readonly method: () => string;
};
function bar(arg: MyOtherType) {}
```

<!--/tabs-->

Examples of **correct** code for this rule with `{treatMethodsAsReadonly: true}`:

```ts option='{ "treatMethodsAsReadonly": true }' showPlaygroundButton
type MyType = {
  readonly prop: string;
  method(): string; // note: this method is mutable
};
function foo(arg: MyType) {}
```

## When Not To Use It

If your project does not attempt to enforce strong immutability guarantees of parameters, you can avoid this rule.

This rule is very strict on what it considers mutable.
Many types that describe themselves as readonly are considered mutable because they have mutable properties such as arrays or tuples.
To work around these limitations, you might need to use the rule's options.
In particular, the [`allow` option](#allow) can explicitly mark a type as readonly.
