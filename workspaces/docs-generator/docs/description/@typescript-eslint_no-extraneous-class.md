---
description: 'Disallow classes used as namespaces.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-extraneous-class** for documentation.

This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace.

Users who come from a [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming) paradigm may wrap their utility functions in an extra class, instead of putting them at the top level of an ECMAScript module.
Doing so is generally unnecessary in JavaScript and TypeScript projects.

- Wrapper classes add extra cognitive complexity to code without adding any structural improvements
  - Whatever would be put on them, such as utility functions, are already organized by virtue of being in a module.
  - As an alternative, you can `import * as ...` the module to get all of them in a single object.
- IDEs can't provide as good suggestions for static class or namespace imported properties when you start typing property names
- It's more difficult to statically analyze code for unused variables, etc. when they're all on the class (see: [Finding dead code (and dead types) in TypeScript](https://effectivetypescript.com/2020/10/20/tsprune)).

This rule also reports classes that have only a constructor and no fields.
Those classes can generally be replaced with a standalone function.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
class StaticConstants {
  static readonly version = 42;

  static isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}

class HelloWorldLogger {
  constructor() {
    console.log('Hello, world!');
  }
}

abstract class Foo {}
```

#### ✅ Correct

```ts
export const version = 42;

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function logHelloWorld() {
  console.log('Hello, world!');
}

abstract class Foo {
  abstract prop: string;
}
```

<!--/tabs-->

## Alternatives

### Individual Exports (Recommended)

Instead of using a static utility class we recommend you individually export the utilities from your module.

<!--tabs-->

#### ❌ Incorrect

```ts
export class Utilities {
  static util1() {
    return Utilities.util3();
  }

  static util2() {
    /* ... */
  }

  static util3() {
    /* ... */
  }
}
```

#### ✅ Correct

```ts
export function util1() {
  return util3();
}

export function util2() {
  /* ... */
}

export function util3() {
  /* ... */
}
```

<!--/tabs-->

### Namespace Imports (Not Recommended)

If you strongly prefer to have all constructs from a module available as properties of a single object, you can `import * as` the module.
This is known as a "namespace import".
Namespace imports are sometimes preferable because they keep all properties nested and don't need to be changed as you start or stop using various properties from the module.

However, namespace imports are impacted by these downsides:

- They also don't play as well with tree shaking in modern bundlers
- They require a name prefix before each property's usage

<!--tabs-->

#### ❌ Incorrect

```ts
// utilities.ts
export class Utilities {
  static sayHello() {
    console.log('Hello, world!');
  }
}

// consumers.ts

Utilities.sayHello();
```

#### ⚠️ Namespace Imports

```ts
// utilities.ts
export function sayHello() {
  console.log('Hello, world!');
}

// consumers.ts

utilities.sayHello();
```

#### ✅ Standalone Imports

```ts
// utilities.ts
export function sayHello() {
  console.log('Hello, world!');
}

// consumers.ts

sayHello();
```

<!--/tabs-->

### Notes on Mutating Variables

One case you need to be careful of is exporting mutable variables.
While class properties can be mutated externally, exported variables are always constant.
This means that importers can only ever read the first value they are assigned and cannot write to the variables.

Needing to write to an exported variable is very rare and is generally considered a code smell.
If you do need it you can accomplish it using getter and setter functions:

<!--tabs-->

#### ❌ Incorrect

```ts
export class Utilities {
  static mutableCount = 1;

  static incrementCount() {
    Utilities.mutableCount += 1;
  }
}
```

#### ✅ Correct

```ts
let mutableCount = 1;

export function getMutableCount() {
  return mutableField;
}

export function incrementCount() {
  mutableField += 1;
}
```

<!--/tabs-->

## Options

This rule normally bans classes that are empty (have no constructor or fields).
The rule's options each add an exemption for a specific type of class.

### `allowConstructorOnly`

<!-- insert option description -->

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowConstructorOnly": true }'
class NoFields {}
```

#### ✅ Correct

```ts option='{ "allowConstructorOnly": true }'
class NoFields {
  constructor() {
    console.log('Hello, world!');
  }
}
```

<!--/tabs-->

### `allowEmpty`

<!-- insert option description -->

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowEmpty": true }'
class NoFields {
  constructor() {
    console.log('Hello, world!');
  }
}
```

#### ✅ Correct

```ts option='{ "allowEmpty": true }'
class NoFields {}
```

<!--/tabs-->

### `allowStaticOnly`

<!-- insert option description -->

:::caution
We strongly recommend against the `allowStaticOnly` exemption.
It works against this rule's primary purpose of discouraging classes used only for static members.
:::

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowStaticOnly": true }'
class EmptyClass {}
```

#### ✅ Correct

```ts option='{ "allowStaticOnly": true }'
class NotEmptyClass {
  static version = 42;
}
```

<!--/tabs-->

### `allowWithDecorator`

<!-- insert option description -->

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowWithDecorator": true }'
class Constants {
  static readonly version = 42;
}
```

#### ✅ Correct

```ts option='{ "allowWithDecorator": true }'
@logOnRead()
class Constants {
  static readonly version = 42;
}
```

<!--/tabs-->

## When Not To Use It

If your project was set up before modern class and namespace practices, and you don't have the time to switch over, you might not be practically able to use this rule.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.
