# Wallet

This is a wallet for the NXT blockchain software. Information about NXT can be found [here](http://wiki.nxtcrypto.org/wiki/Main_Page) and the NXT API documentation can be found [here](http://wiki.nxtcrypto.org/wiki/The_Nxt_API).

Our definition of wallet is a tool that an user can use to sign and broadcast transactions without giving away their passwords to another party. Everything is handled client side.

## Before you start

The prerequisite for development is NodeJS and NPM. Both are easily installable via [https://nodejs.org/en/.](https://nodejs.org/en/.)

We use Git for version control and the Git Flow for branching (comes built in with [SourceTree](http://sourcetree.com/)).

Project uses [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/)

## Installation

Pull the existing project from Git (either Bitbucket or Github) and then run `npm install` to install all packages

## Running

If necessary fill in `src/config.json`.

- Run `npm start` on the [middleware](https://github.com/DeBuNe/middleware) first. If you're not using the middleware make sure `apiUrl` in `config.json` is set or set `isLocalhost` to `true`.
- Run `npm start` on the wallet

### Version control

Git Flow should be used for version control. `develop` is the active development branch and `master` is for production ready deployment.

`develop/feature` is yours and will merge into `develop`

### Fractal Structure

This project uses Fractal Project structure. That means we group things by feature instead of file type.

To read more about our project’s structure please read the [React Redux Starter Github](https://github.com/davezuko/react-redux-starter-kit/tree/v2.0.0) page.

### Bundling

We use [Webpack](https://webpack.github.io/) with [Babel](https://babeljs.io/) to bundle and compile all our ES6 modules into ES5 code that the browser understands. If you clone our existing projects or us the redux-cli there is no need to set this up manually. Feel free to read up more.

### Material Design

To make our app look and feel great we use [Google’s Material design](https://material.google.com/) guidelines.

For integration in our development workflow we use the [Material UI](http://www.material-ui.com/) that is built using React. Please refer to the Google Material Design guidelines at all times before implementing an component.

### Localization

Many of our projects requires the use of multiple languages. We use [Yahoo’s React Intl](https://github.com/yahoo/react-intl) library to provide localization. All strings should be localized!
