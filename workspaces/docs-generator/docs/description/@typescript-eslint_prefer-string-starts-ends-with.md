---
description: 'Enforce using `String#startsWith` and `String#endsWith` over other equivalent methods of checking substrings.'
---

> 🛑 This file is source code, not the primary documentation location! 🛑
>
> See **https://typescript-eslint.io/rules/prefer-string-starts-ends-with** for documentation.

There are multiple ways to verify if a string starts or ends with a specific string, such as `foo.indexOf('bar') === 0`.
As of ES2015, the most common way in JavaScript is to use `String#startsWith` and `String#endsWith`.
Keeping to those methods consistently helps with code readability.

This rule reports when a string method can be replaced safely with `String#startsWith` or `String#endsWith`.

## Examples

<!--tabs-->

#### ❌ Incorrect

```ts
declare const foo: string;

// starts with
foo[0] === 'b';
foo.charAt(0) === 'b';
foo.indexOf('bar') === 0;
foo.slice(0, 3) === 'bar';
foo.substring(0, 3) === 'bar';
foo.match(/^bar/) != null;
/^bar/.test(foo);

// ends with
foo[foo.length - 1] === 'b';
foo.charAt(foo.length - 1) === 'b';
foo.lastIndexOf('bar') === foo.length - 3;
foo.slice(-3) === 'bar';
foo.substring(foo.length - 3) === 'bar';
foo.match(/bar$/) != null;
/bar$/.test(foo);
```

#### ✅ Correct

```ts
declare const foo: string;

// starts with
foo.startsWith('bar');

// ends with
foo.endsWith('bar');
```

<!--/tabs-->

## Options

### `allowSingleElementEquality`

<!-- insert option description -->

If switched to `'always'`, the rule will allow equality checks against the first or last character in a string.
This can be preferable in projects that don't deal with special character encodings and prefer a more succinct style.

The following code is considered incorrect by default, but is allowed with `allowSingleElementEquality: 'always'`:

```ts option='{ "allowSingleElementEquality": "always" }' showPlaygroundButton
declare const text: string;

text[0] === 'a';
text[0] === text[0].toUpperCase();
text[0] === text[1];
text[text.length - 1] === 'b';
```

## When Not To Use It

If you don't mind which style of string checking is used, you can turn this rule off safely.
However, keep in mind that inconsistent style can harm readability in a project.
