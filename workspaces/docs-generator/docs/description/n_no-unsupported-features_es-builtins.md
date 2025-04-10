# Disallow unsupported ECMAScript built-ins on the specified version (`n/no-unsupported-features/es-builtins`)

💼 This rule is enabled in the following [configs](https://github.com/eslint-community/eslint-plugin-n#-configs): 🟢 `recommended-module`, ✅ `recommended-script`.

<!-- end auto-generated rule header -->

ECMAScript standard is updating every two months.
You can check [node.green](https://node.green/) to know which Node.js version supports each ECMAScript feature.

This rule reports unsupported ECMAScript built-in variables on the configured Node.js version as lint errors.
Editor integrations of ESLint would be useful to know it in real-time.

## 📖 Rule Details

### Supported ECMAScript features

This rule supports ECMAScript 2019 and proposals that have been approved as Stage 4 by August 2019.
See also [TC39 finished proposals](https://github.com/tc39/proposals/blob/master/finished-proposals.md).

### Configured Node.js version range

[Configured Node.js version range](https://github.com/eslint-community/eslint-plugin-n/tree/README.md#configured-nodejs-version-range)

### Options

```json
{
    "n/no-unsupported-features/es-builtins": ["error", {
        "version": ">=16.0.0",
        "ignores": []
    }]
}
```

#### version

As mentioned above, this rule reads the [`engines`] field of `package.json`.
But, you can overwrite the version by `version` option.

The `version` option accepts [the valid version range of `node-semver`](https://github.com/npm/node-semver#range-grammar).

#### ignores

If you are using transpilers, maybe you want to ignore the warnings about some features.
You can use this `ignores` option to ignore the given features.

The `"ignores"` option accepts an array of the following strings.

<details>

**ES2021:**

- `"AggregateError"`
- `"Promise.any"`
- `"WeakRef"`
- `"FinalizationRegistry"`

**ES2020:**

- `"BigInt"`
- `"BigInt64Array"`
- `"BigUint64Array"`
- `"Promise.allSettled"`
- `"globalThis"`

**ES2019:**

- `"Object.fromEntries"`

**ES2017:**

- `"Atomics"`
- `"Object.values"`
- `"Object.entries"`
- `"Object.getOwnPropertyDescriptors"`
- `"SharedArrayBuffer"`

**ES2015:**

- `"Array.from"`
- `"Array.of"`
- `"Map"`
- `"Math.acosh"`
- `"Math.asinh"`
- `"Math.atanh"`
- `"Math.cbrt"`
- `"Math.clz32"`
- `"Math.cosh"`
- `"Math.expm1"`
- `"Math.fround"`
- `"Math.hypot"`
- `"Math.imul"`
- `"Math.log10"`
- `"Math.log1p"`
- `"Math.log2"`
- `"Math.sign"`
- `"Math.sinh"`
- `"Math.tanh"`
- `"Math.trunc"`
- `"Number.EPSILON"`
- `"Number.isFinite"`
- `"Number.isInteger"`
- `"Number.isNaN"`
- `"Number.isSafeInteger"`
- `"Number.MAX_SAFE_INTEGER"`
- `"Number.MIN_SAFE_INTEGER"`
- `"Number.parseFloat"`
- `"Number.parseInt"`
- `"Object.assign"`
- `"Object.getOwnPropertySymbols"`
- `"Object.is"`
- `"Object.setPrototypeOf"`
- `"Promise"`
- `"Proxy"`
- `"Reflect"`
- `"Set"`
- `"String.fromCodePoint"`
- `"String.raw"`
- `"Symbol"`
- `"Int8Array"`
- `"Uint8Array"`
- `"Uint8ClampedArray"`
- `"Int16Array"`
- `"Uint16Array"`
- `"Int32Array"`
- `"Uint32Array"`
- `"Float32Array"`
- `"Float64Array"`
- `"DataView"`
- `"WeakMap"`
- `"WeakSet"`

</details>

### Shared Settings

The following options can be set by [shared settings](http://eslint.org/docs/user-guide/configuring.html#adding-shared-settings).
Several rules have the same option, but we can set this option at once.

- `version`

For Example:

```json
{
    "settings": {
        "node": {
            "version": ">=16.0.0",
        }
    },
    "rules": {
        "n/no-unsupported-features/es-builtins": ["error", {
            "ignores": []
        }]
    }
}
```

### Known limitations

This rule cannot find non-static things.
For example:

- New properties and methods of instances.
- New parameters of functions.
- New `options` properties of function parameters.
- New events.

[`engines`]: https://docs.npmjs.com/files/package.json#engines

## 🔎 Implementation

- [Rule source](https://github.com/eslint-community/eslint-plugin-n/tree/lib/rules/no-unsupported-features/es-builtins.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-n/tree/tests/lib/rules/no-unsupported-features/es-builtins.js)
