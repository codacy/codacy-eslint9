---
description: 'Disallow invocation of `require()`.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-require-imports** for documentation.

Depending on your TSConfig settings and whether you're authoring ES Modules or CommonJS, TS may allow both `import` and `require()` to be used, even within a single file.

This rule enforces that you use the newer ES Module `import` syntax over CommonJS `require()`.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
const lib1 = require('lib1');
const { lib2 } = require('lib2');
import lib3 = require('lib3');
```

#### ✅ Correct

```ts

```

<!--/tabs-->

## Options

### `allow`

<!-- insert option description -->

These strings will be compiled into regular expressions with the `u` flag and be used to test against the imported path. A common use case is to allow importing `package.json`. This is because `package.json` commonly lives outside of the TS root directory, so statically importing it would lead to root directory conflicts, especially with `resolveJsonModule` enabled. You can also use it to allow importing any JSON if your environment doesn't support JSON modules, or use it for other cases where `import` statements cannot work.

With `{ allow: ['/package\\.json$'] }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allow": ["/package.json$"] }'
console.log(require('../data.json').version);
```

#### ✅ Correct

```ts option='{ "allow": ["/package.json$"] }'
console.log(require('../package.json').version);
```

<!--/tabs-->

### `allowAsImport`

<!-- insert option description -->

When set to `true`, `import ... = require(...)` declarations won't be reported.
This is beneficial if you use certain module options that require strict CommonJS interop semantics, such as [verbatimModuleSyntax](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax).

With `{ allowAsImport: true }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowAsImport": true }'
var foo = require('foo');
const foo = require('foo');
let foo = require('foo');
```

#### ✅ Correct

```ts option='{ "allowAsImport": true }'
import foo = require('foo');

```

<!--/tabs-->

## Usage with CommonJS

While this rule is primarily intended to promote ES Module syntax, it still makes sense to enable this rule when authoring CommonJS modules.

If you prefer to use TypeScript's built-in `import ... from ...` ES Module syntax, which is transformed to `require()` calls during transpilation when outputting CommonJS, you can use the rule's default behavior.

If, instead, you prefer to use `require()` syntax, we recommend you use this rule with [`allowAsImport`](#allowAsImport) enabled.
That way, you still enforce usage of `import ... = require(...)` rather than bare `require()` calls, which are not statically analyzed by TypeScript.
We don't directly a way to _prohibit_ ES Module syntax from being used; consider instead using TypeScript's [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax) option if you find yourself in a situation where you would want this.

## When Not To Use It

If you are authoring CommonJS modules _and_ your project frequently uses dynamic `require`s, then this rule might not be applicable to you.
Otherwise the `allowAsImport` option probably suits your needs.

If only a subset of your project uses dynamic `require`s then you might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

## Related To

- [`no-var-requires`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-var-requires.mdx)
