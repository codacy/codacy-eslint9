---
description: 'Disallow certain types.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-restricted-types** for documentation.

It can sometimes be useful to ban specific types from being used in type annotations.
For example, a project might be migrating from using one type to another, and want to ban references to the old type.

This rule can be configured to ban a list of specific types and can suggest alternatives.
Note that it does not ban the corresponding runtime objects from being used.

## Options

### `types`

<!-- insert option description -->

The type can either be a type name literal (`OldType`) or a a type name with generic parameter instantiation(s) (`OldType<MyArgument>`).

The values can be:

- A string, which is the error message to be reported; or
- An object with the following properties:
  - `message: string`: the message to display when the type is matched.
  - `fixWith?: string`: a string to replace the banned type with when the fixer is run. If this is omitted, no fix will be done.
  - `suggest?: string[]`: a list of suggested replacements for the banned type.

Example configuration:

```jsonc
{
  "@typescript-eslint/no-restricted-types": [
    "error",
    {
      "types": {
        // add a custom message to help explain why not to use it
        "OldType": "Don't use OldType because it is unsafe",

        // add a custom message, and tell the plugin how to fix it
        "OldAPI": {
          "message": "Use NewAPI instead",
          "fixWith": "NewAPI",
        },

        // add a custom message, and tell the plugin how to suggest a fix
        "SoonToBeOldAPI": {
          "message": "Use NewAPI instead",
          "suggest": ["NewAPIOne", "NewAPITwo"],
        },
      },
    },
  ],
}
```

## When Not To Use It

If you have no need to ban specific types from being used in type annotations, you don't need this rule.

## Related To

- [`no-empty-object-type`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-empty-object-type.mdx)
- [`no-unsafe-function-type`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-unsafe-function-type.mdx)
- [`no-wrapper-object-types`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules/no-wrapper-object-types.mdx)
