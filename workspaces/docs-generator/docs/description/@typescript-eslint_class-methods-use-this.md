---
description: 'Enforce that class methods utilize `this`.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/class-methods-use-this** for documentation.

It adds support for ignoring `override` methods and/or methods on classes that implement an interface. It also supports auto-accessor properties.

## Options

This rule adds the following options:

```ts
interface Options extends BaseClassMethodsUseThisOptions {
  ignoreOverrideMethods?: boolean;
  ignoreClassesThatImplementAnInterface?: boolean | 'public-fields';
}

const defaultOptions: Options = {
  ...baseClassMethodsUseThisOptions,
  ignoreOverrideMethods: false,
  ignoreClassesThatImplementAnInterface: false,
};
```

### `ignoreOverrideMethods`

<!-- insert option description -->

Example of correct code when `ignoreOverrideMethods` is set to `true`:

```ts option='{ "ignoreOverrideMethods": true }' showPlaygroundButton
abstract class Base {
  abstract method(): void;
  abstract property: () => void;
}

class Derived extends Base {
  override method() {}
  override property = () => {};
}
```

### `ignoreClassesThatImplementAnInterface`

<!-- insert option description -->

If specified, it can be either:

- `true`: Ignore all classes that implement an interface
- `'public-fields'`: Ignore only the public fields of classes that implement an interface

Note that this option applies to all class members, not just those defined in the interface.

#### `true`

Examples of code when `ignoreClassesThatImplementAnInterface` is set to `true`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignoreClassesThatImplementAnInterface": true }' showPlaygroundButton
class Standalone {
  method() {}
  property = () => {};
}
```

#### ✅ Correct

```ts option='{ "ignoreClassesThatImplementAnInterface": true }' showPlaygroundButton
interface Base {
  method(): void;
}

class Derived implements Base {
  method() {}
  property = () => {};
}
```

<!--/tabs-->

#### `'public-fields'`

Example of incorrect code when `ignoreClassesThatImplementAnInterface` is set to `'public-fields'`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "ignoreClassesThatImplementAnInterface": "public-fields" }' showPlaygroundButton
interface Base {
  method(): void;
}

class Derived implements Base {
  method() {}
  property = () => {};

  private privateMethod() {}
  private privateProperty = () => {};

  protected protectedMethod() {}
  protected protectedProperty = () => {};
}
```

#### ✅ Correct

```ts option='{ "ignoreClassesThatImplementAnInterface": "public-fields" }'
interface Base {
  method(): void;
}

class Derived implements Base {
  method() {}
  property = () => {};
}
```

<!--/tabs-->

## When Not To Use It

If your project dynamically changes `this` scopes around in a way TypeScript has difficulties modeling, this rule may not be viable to use.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.
