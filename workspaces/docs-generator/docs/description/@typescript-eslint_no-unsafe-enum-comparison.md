---
description: 'Disallow comparing an enum value with a non-enum value.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/no-unsafe-enum-comparison** for documentation.

The TypeScript compiler can be surprisingly lenient when working with enums.
While overt safety problems with enums were [resolved in TypeScript 5.0](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#all-enums-are-union-enums), some logical pitfalls remain permitted.
For example, it is allowed to compare enum values against non-enum values:

```ts
enum Vegetable {
  Asparagus = 'asparagus',
}

declare const vegetable: Vegetable;

vegetable === 'asparagus'; // No error
```

The above code snippet should instead be written as `vegetable === Vegetable.Asparagus`.
Allowing non-enums in comparisons subverts the point of using enums in the first place.
By enforcing comparisons with properly typed enums:

- It makes a codebase more resilient to enum members changing values.
- It allows for code IDEs to use the "Rename Symbol" feature to quickly rename an enum.
- It aligns code to the proper enum semantics of referring to them by name and treating their values as implementation details.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
enum Fruit {
  Apple,
}

declare let fruit: Fruit;

// bad - comparison between enum and explicit value instead of named enum member
fruit === 0;

enum Vegetable {
  Asparagus = 'asparagus',
}

declare let vegetable: Vegetable;

// bad - comparison between enum and explicit value instead of named enum member
vegetable === 'asparagus';

declare let anyString: string;

// bad - comparison between enum and non-enum value
anyString === Vegetable.Asparagus;
```

#### ✅ Correct

```ts
enum Fruit {
  Apple,
}

declare let fruit: Fruit;

fruit === Fruit.Apple;

enum Vegetable {
  Asparagus = 'asparagus',
}

declare let vegetable: Vegetable;

vegetable === Vegetable.Asparagus;
```

<!--/tabs-->

## When Not To Use It

If you don't mind enums being treated as a namespaced bag of values, rather than opaque identifiers, you likely don't need this rule.

Sometimes, you may want to ingest a value from an API or user input, then use it as an enum throughout your application.
While validating the input, it may be appropriate to disable the rule.
Alternately, you might consider making use of a validation library like [Zod](https://zod.dev/?id=native-enums).
See further discussion of this topic in [#8557](https://github.com/typescript-eslint/typescript-eslint/issues/8557).

Finally, in the rare case of relying on an third party enums that are only imported as `type`s, it may be difficult to adhere to this rule.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.
