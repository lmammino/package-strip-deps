# package-strip-deps

[![npm version](https://badge.fury.io/js/package-strip-deps.svg)](http://badge.fury.io/js/package-strip-deps)
[![Build Status](https://travis-ci.org/lmammino/package-strip-deps.svg?branch=master)](https://travis-ci.org/lmammino/package-strip-deps)
[![codecov.io](https://codecov.io/gh/lmammino/package-strip-deps/coverage.svg?branch=master)](https://codecov.io/gh/lmammino/package-strip-deps)

A little command line utility that allows to strip dependencies from a NPM package.json file.

The command basically takes the JSON content of a `package.json` file and prints in the standard output the same content but by stripping
the keys `dependencies` and `devDependencies`.


## Install

Globally:

```bash
npm install --global package-strip-deps
```

Or as a dev depencies (e.g. you need it as part of your build process)

```bash
npm install --save-dev package-strip-deps
```


## Usage

Using "pipes":

```bash
cat package.json | package-strip-deps
```

Using input redirection:

```bash
package-strip-deps < package.json
```

If you want to save the output to a file just use output redirection:

```bash
package-strip-deps < package.json > strippedPackage.json
```

## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/package-strip-deps/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
