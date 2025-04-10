---
description: 'Disallow unused variables.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-unused-vars** for documentation.

It adds support for TypeScript features, such as types.

## Options

## FAQs

### What benefits does this rule have over TypeScript?

TypeScript provides [`noUnusedLocals`](https://www.typescriptlang.org/tsconfig#noUnusedLocals) and [`noUnusedParameters`](https://www.typescriptlang.org/tsconfig#noUnusedParameters) compiler options that can report errors on unused local variables or parameters, respectively.
Those compiler options can be convenient to use if you don't want to set up ESLint and typescript-eslint.
However:

- These lint rules are more configurable than TypeScript's compiler options.
  - For example, the [`varsIgnorePattern` option](https://eslint.org/docs/latest/rules/no-unused-vars#varsignorepattern) can customize what names are always allowed to be exempted. TypeScript hardcodes its exemptions to names starting with `_`.
    If you would like to emulate the TypeScript style of exempting names starting with `_`, you can use this configuration (this includes errors as well):
    ```json
    {
      "rules": {
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            "args": "all",
            "argsIgnorePattern": "^_",
            "caughtErrors": "all",
            "caughtErrorsIgnorePattern": "^_",
            "destructuredArrayIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
            "ignoreRestSiblings": true
          }
        ]
      }
    }
    ```
- [ESLint can be configured](https://eslint.org/docs/latest/use/configure/rules) within lines, files, and folders. TypeScript compiler options are linked to their TSConfig file.
- Many projects configure TypeScript's reported errors to block builds more aggressively than ESLint complaints. Blocking builds on unused variables can be inconvenient.

We generally recommend using `@typescript-eslint/no-unused-vars` to flag unused locals and parameters instead of TypeScript.

:::tip
Editors such as VS Code will still generally "grey out" unused variables even if `noUnusedLocals` and `noUnusedParameters` are not enabled in a project.
:::

Also see similar rules provided by ESLint:

- [`no-unused-private-class-members`](https://eslint.org/docs/latest/rules/no-unused-private-class-members)
- [`no-unused-labels`](https://eslint.org/docs/latest/rules/no-unused-labels)

### Why does this rule report variables used only for types?

This rule does not count type-only uses when determining whether a variable is used.
Declaring variables only to use them for types adds code and runtime complexity.
The variables are never actually used at runtime.
They can be misleading to readers of the code.

<!--tabs-->

#### typeof Variables

For example, if a variable is only used for `typeof`, this rule will report:

```ts
const box = {
  //  ~~~
  //  'box' is assigned a value but only used as a type.
  value: 123,
};

export type Box = typeof box;
```

Instead, it's often cleaner and less code to write out the types directly:

```ts
export interface Box {
  value: number;
}
```

#### Zod Schemas

For example, if a Zod schema variable is only used for `typeof`, this rule will report:

```ts

const schema = z.object({
  //  ~~~~~~
  //  'schema' is assigned a value but only used as a type.
  value: z.number(),
});

export type Box = z.infer<typeof schema>;
```

Instead, it's often cleaner and less code to write out the types directly:

```ts
export interface Box {
  value: number;
}
```

<!--/tabs-->

If you find yourself writing runtime values only for types, consider refactoring your code to declare types directly.
