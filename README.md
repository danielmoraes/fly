<h1 align="center">
  <br>
  <img src="https://dmoraes.org/fly.png" alt="fly" width="200"></a>
  <br>
  Fly
  <br>
  <br>
</h1>

<h4 align="center">Airfare search engine for Node.js.</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/@danielmoraes/fly"><img src="https://img.shields.io/npm/v/@danielmoraes/fly.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@danielmoraes/fly"><img src="https://img.shields.io/npm/dm/@danielmoraes/fly.svg" alt="npm downloads"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
</p>

<br>

### Install

To install Fly for use in Node.js with `require('@danielmoraes/fly')`, run:

```bash
npm install @danielmoraes/fly
```

To install a `fly`
[command line app](https://github.com/danielmoraes/fly-cli), run:

```bash
npm install @danielmoraes/fly-cli -g
```

### Usage

#### In Node.js

```javascript
import { findLowestFares } from '@danielmoraes/fly'

findLowestFares('sao', 'aju', '2019-01-01')
  .then(response => { console.log(response) }
```

#### As a command line app

Fly is also available as a
[command line app](https://github.com/danielmoraes/fly-cli). Here's how to use
it:

```bash
$ npm install @danielmoraes/fly-cli -g
$ fly-cli --help
```

To make a query:

```bash
$ fly-cli --origin sao --destination aju --date 2019-01-01
```

### License

MIT. Copyright (c) [Daniel Moraes](https://dmoraes.org).
