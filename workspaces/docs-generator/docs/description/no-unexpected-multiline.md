---
title: no-unexpected-multiline
rule_type: problem
related_rules:
- func-call-spacing
- semi
- space-unary-ops
---



Semicolons are usually optional in JavaScript, because of automatic semicolon insertion (ASI). You can require or disallow semicolons with the [semi](https://github.com/eslint/eslint/tree/refs/tags/master/docs/src/rules/semi) rule.

The rules for ASI are relatively straightforward: As once described by Isaac Schlueter, a newline character always ends a statement, just like a semicolon, **except** where one of the following is true:

* The statement has an unclosed paren, array literal, or object literal or ends in some other way that is not a valid way to end a statement. (For instance, ending with `.` or `,`.)
* The line is `--` or `++` (in which case it will decrement/increment the next token.)
* It is a `for()`, `while()`, `do`, `if()`, or `else`, and there is no `{`
* The next line starts with `[`, `(`, `+`, `*`, `/`, `-`, `,`, `.`, or some other binary operator that can only be found between two tokens in a single expression.

In the exceptions where a newline does **not** end a statement, a typing mistake to omit a semicolon causes two unrelated consecutive lines to be interpreted as one expression. Especially for a coding style without semicolons, readers might overlook the mistake. Although syntactically correct, the code might throw exceptions when it is executed.

## Rule Details

This rule disallows confusing multiline expressions where a newline looks like it is ending a statement, but is not.

Examples of **incorrect** code for this rule:

::: incorrect

```js
/*eslint no-unexpected-multiline: "error"*/

const foo = bar
(1 || 2).baz();

const hello = 'world'
[1, 2, 3].forEach(addNumber);

const x = function() {}
`hello`

const y = function() {}
y
`hello`

const z = foo
/regex/g.test(bar)
```

:::

Examples of **correct** code for this rule:

::: correct

```js
/*eslint no-unexpected-multiline: "error"*/

const foo = bar;
(1 || 2).baz();

const baz = bar
;(1 || 2).baz()

const hello = 'world';
[1, 2, 3].forEach(addNumber);

const hi = 'world'
void [1, 2, 3].forEach(addNumber);

const x = function() {};
`hello`

const tag = function() {}
tag `hello`
```

:::

## When Not To Use It

You can turn this rule off if you are confident that you will not accidentally introduce code like this.

Note that the patterns considered problems are **not** flagged by the [semi](semi) rule.
