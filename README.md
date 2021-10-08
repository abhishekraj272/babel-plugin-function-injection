<h1 align="center">babel-plugin-function-injection 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/babel-plugin-function-injection" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/babel-plugin-function-injection.svg">
  </a>
  <img src="https://img.shields.io/badge/npm-%3E%3D1.0.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D1.0.0-blue.svg" />
  <a href="https://github.com/abhishekraj272/babel-plugin-function-injection#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/abhishekraj272/babel-plugin-function-injection/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/abhishekraj272/babel-plugin-function-injection/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/abhishekraj272/babel-plugin-function-injection" />
  </a>
  <a href="https://twitter.com/abhishekraj272" target="_blank">
    <img alt="Twitter: abhishekraj272" src="https://img.shields.io/twitter/follow/abhishekraj272.svg?style=social" />
  </a>
</p>

> A Babel plugin to inject and wrap a function on an exported object

### 🏠 [Homepage](https://github.com/abhishekraj272/babel-plugin-function-injection#readme)

## Prerequisites

- npm >=1.0.0
- node >=1.0.0

## Install

```sh
yarn add -D babel-plugin-function-injection

--OR--

npm i -D babel-plugin-function-injection
```

## Usage

You need to pass 2 keys to the plugin options.

```js
{
  imports: IImport[],
  target: RegEx // Files need to be injected
}

interface IImport {
  name: string;
  lib: string;
  defaultImport: boolean;
}
```

## Example  

```js
// Plugin

module.exports = function (api) {
  api.cache(true);

  const plugins = [
    [
      "babel-plugin-function-injection", 
      {
        imports: [
          {
            name: "connect",
            lib: "react-redux",
            defaultImport: false,
          },
          {
            name: "mapStateToProps",
            lib: "@utils/stateToProps",
            defaultImport: true,
          },
        ],
        target: /(.*components.*index.[js|mjs|jsx|ts|tsx]*)/,
      },
    ],
  ];

  return {
    plugins,
  };
};

// Result

// File: components/index.js

// Input --> to plugin

export { default } from './Navbar';

----

export default Navbar;

// Output <-- from plugin
import { connect } from "react-redux";
import mapStateToProps from "@utils/stateToProps";


export const Something = connect(mapStateToProps)(Component);

----

export default connect(mapStateToProps)(Navbar);
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/abhishekraj272/babel-plugin-function-injection/issues). You can also take a look at the [contributing guide]( ).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Abhishek Raj](https://github.com/abhishekraj272).<br />
This project is [MIT](https://github.com/abhishekraj272/babel-plugin-function-injection/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_