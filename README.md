# POC for Club des Expressions project

## Objectives

- [x] Setup projet
  - [x] From scratch or from community boilerplate
  - [x] RIA app + Horizon.io
  - [x] Hot reload
  - [x] Source map enabled
- [x] Social authentication (Facebook through OAuth0)
- [ ] As a user, I want to see list of allowed colleges (read anonymous data)
- [ ] As a user, I want to customize my personal data: "name" and "college" (persist personal data)
- [x] Allow to log in as an admin
- [ ] As an admin, list all registered users
- [ ] As an admin, update data of one registered user

## Installation

You may need Node v6. Install it manually if your repos are late. The binary
should be named `node`. Type `sudo ln -s /usr/bin/nodejs /usr/bin/node`
if needed.

Install [RethinkDB](https://www.rethinkdb.com/docs/install/).

Then:

```
$ git clone git@github.com:ClubExpressions/poc-expression.club
$ cd poc-expression.club
$ npm install -g horizon  # (as "root" on Linux/OS X)
$ npm install
```

## Development

* Hot reloading via webpack dev server:
  * `$ npm start`
  * Point your browser to [https://localhost:3000/](https://localhost:3000/), page hot reloads automatically when there are changes

* Build once for (ready for ***Production***):
  * `$ npm run build`
  * Open `build/index.html` through the local webserver

## Log in as an admin

```
$ hz make-token admin
eyJ0e...
```

Copy the generated token and paste it the URL of your browser: https://localhost:3000/?admin_token=eyJ0e... 
(replace `eyJ0e...` by the previously copied token).

## Testing

To execute all unit tests, use:

```sh
npm run test
```

To run unit tests continuously during development (watch tests), use:

```sh
npm run test:watch
```

## Technologies

- [webpack](http://webpack.github.io/) and [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) as a client-side module builder and module loader.
- [npm](https://www.npmjs.com/) as a package manager and task runner (say [**NO**](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/) to gulp/grunt).
- [Babel](http://babeljs.io/) 6 as a transpiler from ES6 to ES5.
- [React](https://facebook.github.io/react/) and [JSX](https://facebook.github.io/jsx/) as a virtual Dom JavaScript library for rendering user interfaces (views).
- [Redux](http://redux.js.org/) as an incredibly simple way of modelling your data app state, with great community support.
- [Redux DevTools](https://github.com/gaearon/redux-devtools) as a live-editing environment for your Redux apps.
- [ESLint](http://eslint.org/) as a reporter for syntax and style issues. [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules.
- [Sass](http://sass-lang.com/) as a compiler of CSS styles with variables, mixins, and more.
- [Mocha](https://mochajs.org/) as a test framework.
- [Chai](http://chaijs.com/) as a BDD assertion library that works along with `Mocha`.


## License

[MIT](http://opensource.org/licenses/MIT)
Initial author: Nick S. Plekhanov
