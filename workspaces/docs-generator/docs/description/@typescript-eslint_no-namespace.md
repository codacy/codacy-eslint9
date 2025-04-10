---
description: 'Disallow TypeScript namespaces.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-namespace** for documentation.

TypeScript historically allowed a form of code organization called "custom modules" (`module Example {}`), later renamed to "namespaces" (`namespace Example`).
Namespaces are an outdated way to organize TypeScript code.
ES2015 module syntax is now preferred (`import`/`export`).

> This rule does not report on the use of TypeScript module declarations to describe external APIs (`declare module 'foo' {}`).

## Examples

Examples of code with the default options:

<!--tabs-->

#### ❌ Incorrect

```ts
module foo {}
namespace foo {}

declare module foo {}
declare namespace foo {}
```

#### ✅ Correct

```ts
declare module 'foo' {}

// anything inside a d.ts file
```

<!--/tabs-->

## Options

### `allowDeclarations`

<!-- insert option description -->

Examples of code with the `{ "allowDeclarations": true }` option:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowDeclarations": true }'
module foo {}
namespace foo {}
```

#### ✅ Correct

```ts option='{ "allowDeclarations": true }'
declare module 'foo' {}
declare module foo {}
declare namespace foo {}

declare global {
  namespace foo {}
}

declare module foo {
  namespace foo {}
}
```

<!--/tabs-->

Examples of code for the `{ "allowDeclarations": false }` option:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowDeclarations": false }'
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
```

#### ✅ Correct

```ts option='{ "allowDeclarations": false }'
declare module 'foo' {}
```

<!--/tabs-->

### `allowDefinitionFiles`

<!-- insert option description -->

Examples of code for the `{ "allowDefinitionFiles": true }` option:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowDefinitionFiles": true }'
// if outside a d.ts file
module foo {}
namespace foo {}

// if outside a d.ts file and allowDeclarations = false
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
```

#### ✅ Correct

```ts option='{ "allowDefinitionFiles": true }'
declare module 'foo' {}

// anything inside a d.ts file
```

<!--/tabs-->

## When Not To Use It

If your project uses TypeScript's CommonJS export syntax (`export = ...`), you may need to use namespaces in order to export types from your module.
You can learn more about this at:

- [TypeScript#52203](https://github.com/microsoft/TypeScript/pull/52203), the pull request introducing [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax)
- [TypeScript#60852](https://github.com/microsoft/TypeScript/issues/60852), an issue requesting syntax to export types from a CommonJS module.

If your project uses this syntax, either because it was architected before modern modules and namespaces, or because a module option such as `verbatimModuleSyntax` requires it, it may be difficult to migrate off of namespaces.
In that case you may not be able to use this rule for parts of your project.

You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

## Further Reading

<!-- cspell:disable-next-line -->

- [FAQ: I get errors from the `@typescript-eslint/no-namespace` and/or `no-var` rules about declaring global variables](/troubleshooting/faqs/eslint#i-get-errors-from-the-typescript-eslintno-namespace-andor-no-var-rules-about-declaring-global-variables)
- [FAQ: How should I handle reports that conflict with verbatimModuleSyntax?](/troubleshooting/faqs/typescript#how-should-i-handle-reports-that-conflict-with-verbatimmodulesyntax)
- [TypeScript handbook entry on Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [TypeScript handbook entry on Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [TypeScript handbook entry on Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)
