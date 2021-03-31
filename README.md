# rollup-dts-bundle
Rollup plugin for bundling d.ts files

## About

This plugin is useful when you want bundle all your `.d.ts` files into one bundle. Under the hood plugin uses [dts-bundle package](https://github.com/TypeStrong/dts-bundle) for bundling, please check it for options description and examples.

## Installation

```bash
# yarn
yarn add rollup-plugin-dts-bundle -D

# npm
npm install rollup-plugin-dts-bundle -D
```

## Usage

```js
// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import dtsBundle from 'rollup-plugin-dts-bundle';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/app.js',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    dtsBundle({
        bundle: {
            name: '[YOUR_PACKAGE_NAME]',
            main: 'dist/index.d.ts',
            out: 'typings.d.ts' // can be omitted, 'typings.d.ts' - default output.
            
            // Other 'dts-bundle' package options.
        }
    })
  ]
}
```

### Configuration

There are some useful options:

#### bundle

`dts-bundle` package options. See more information [in the package documentation](https://github.com/TypeStrong/dts-bundle#options). Required.

```js
dtsBundle({
  bundle: {
    name: '[YOUR_PACKAGE_NAME]',
    main: 'dist/index.d.ts',
    out: 'typings.d.ts',
    removeSource: true,
  },
})
```

#### deleteOnComplete

Patterns of files and folders to be deleted on successful typings bundling.

```js
dtsBundle({
  bundle: {
    // 'dts-bundle' package options here.
  },
  deleteOnComplete: ['dist/index.d.ts, dist/typings/*']
})
```

#### verbose

Outputs status to console. Default is `false`.

```js
dtsBundle({
  bundle: {
    // 'dts-bundle' package options here.
  },
  verbose: true
})
```

#### hook

[Rollup hook](https://rollupjs.org/guide/en/#build-hooks) the plugin should use. Default is `writeBundle`.

```js
dtsBundle({
  hook: 'buildEnd',
  bundle: {
    // 'dts-bundle' package options here.
  },
})
```

## License

MIT
