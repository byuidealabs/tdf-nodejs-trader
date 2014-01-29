tdf-nodejs-trader
=================

__Description:__ NodeJS client for the [Tour de Finance](https://github.com/byuidealabs/tdf) platform.

# Install
`npm install tdf-nodejs-trader`

# Usage
```js
var tdfTrader = require('tdf-nodejs-trader');

tdfTrader.currentStatus().then(function (status) {
  console.log(typeof status); // "object"
});
```

# API

## tdfTrader#currentStatus([options][, cb])

__Description:__ Return the current status of all securities.

__Signature:__ `tdfTrader#currentStatus([options][, cb])`

#### Examples:

__Node-style__:
```js
 tdfTrader.currentStatus(function (err, status) {
     if (err) {
         // handle error
     } else {
         console.log(typeof status); // "object"
     }
 );
```

__Promise-style__:
```js
 tdfTrader.currentStatus()
     .then(function (status) {
         console.log(typeof status); // "object"
     })
     .catch(function (err) {
         // handle error
     });
```

#### Parameters
- `{object=}` - `options` - Configuration options. Properties:
  - `{string=}` - `protocol` - HTTP protocol to use. Default: `tdfTrader#defaults.protocol || "http"`.
  - `{string=}` - `hostname` - Hostname of TDF platform to use. Default: `tdfTrader#defaults.hostname || "localhost"`.
  - `{string=}` - `port` - Port of TDF platform to use. Default: `tdfTrader#defaults.port || 80`.
- `{function=}` - `cb` - Optional callback for Node-style usage.

__Returns:__ `Promise`

## tdfTrader#allHistories([options][, cb])

__Description:__ Retrieve all available price histories.

__Signature:__ `tdfTrader#allHistories([options][, cb])`

#### Examples:

__Node-style__:
```js
 tdfTrader.allHistories(function (err, histories) {
     if (err) {
         // handle error
     } else {
         console.log(typeof histories); // "array"
     }
 );
```

__Promise-style__:
```js
 tdfTrader.allHistories()
     .then(function (histories) {
         console.log(typeof histories); // "array"
     })
     .catch(function (err) {
         // handle error
     });
```

#### Parameters
- `{object=}` - `options` - Configuration options. Properties:
  - `{string=}` - `protocol` - HTTP protocol to use. Default: `tdfTrader#defaults.protocol || "http"`.
  - `{string=}` - `hostname` - Hostname of TDF platform to use. Default: `tdfTrader#defaults.hostname || "localhost"`.
  - `{string=}` - `port` - Port of TDF platform to use. Default: `tdfTrader#defaults.port || 80`.
- `{function=}` - `cb` - Optional callback for Node-style usage.

__Returns:__ `Promise`
