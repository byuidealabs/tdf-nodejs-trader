tdf-nodejs-trader
=================

__Description:__ NodeJS client for the [Tour de Finance](https://github.com/byuidealabs/tdf) platform.

# Install
`npm install tdf-nodejs-trader`

# Usage
```js
var tdfTrader = require('tdf-nodejs-trader');

tdfTrader.defaults.hostname = 'ideaquant.cs.byu.edu';

tdfTrader.currentStatus().then(function (status) {
  console.log(status);
});
```

# API

## tdfTrader#defaults

__Description:__ Defaults `tdfTrader` should use.

__Properties:__

- `{string}` - `protocol` - Protocol to use. Default: `"http"`.
- `{string}` - `hostname` -  Hostname to use. Default: `"localhost"`.
- `{number}` - `port` -  Port to use. Default: `80`.

## tdfTrader#trade(securities, options[, cb])

__Description:__ Trade the given securities.

__Signature:__ `tdfTrader#trade(securities, options[, cb])`

#### Examples:

__Node-style__:
```js
 tdfTrader.trade([
     {
         symbol: 'GOOG',
         amount: 24 // but 24 shares of 'GOOG'
     },
     {
         symbol: 'FB',
         amount: -30 // Sell 30 shares of 'FB'
     }
 ], { agentId: '1234', apiKey: '5678' }, function (err, status) {
     if (err) {
         // handle error
     } else {
         console.log(status);
     }
 );
```

__Promise-style__:
```js
 tdfTrader.trade([
     {
         symbol: 'GOOG',
         amount: 24 // but 24 shares of 'GOOG'
     },
     {
         symbol: 'FB',
         amount: -30 // Sell 30 shares of 'FB'
     }
 ], { agentId: '1234', apiKey: '5678' })
     .then(function (status) {
         console.log(status);
     })
     .catch(function (err) {
         // handle error
     });
```

#### Parameters
- `{object}` - `options` - Configuration options. Properties:
  - `{string}` - `agentId` - The id of the agent for which to retrieve the status.
  - `{string}` - `apiKey` - The API key of the agent's owner.
  - `{string=}` - `protocol` - Protocol to use. Default: `tdfTrader#defaults.protocol || "http"`.
  - `{string=}` - `hostname` - Hostname of TDF platform to use. Default: `tdfTrader#defaults.hostname || "localhost"`.
  - `{string=}` - `port` - Port of TDF platform to use. Default: `tdfTrader#defaults.port || 80`.
- `{function=}` - `cb` - Optional callback for Node-style usage.

__Returns:__ `Promise`

## tdfTrader#agentStatus(options[, cb])

__Description:__ Return the status of the agent with the given agent id.

__Signature:__ `tdfTrader#agentStatus(options[, cb])`

#### Examples:

__Node-style__:
```js
 tdfTrader.agentStatus({ agentId: '1234', apiKey: '5678' }, function (err, status) {
     if (err) {
         // handle error
     } else {
         console.log(status);
     }
 );
```

__Promise-style__:
```js
 tdfTrader.agentStatus({ agentId: '1234', apiKey: '5678' })
     .then(function (status) {
         console.log(status);
     })
     .catch(function (err) {
         // handle error
     });
```

#### Parameters
- `{object}` - `options` - Configuration options. Properties:
  - `{string}` - `agentId` - The id of the agent for which to retrieve the status.
  - `{string}` - `apiKey` - The API key of the agent's owner.
  - `{string=}` - `protocol` - Protocol to use. Default: `tdfTrader#defaults.protocol || "http"`.
  - `{string=}` - `hostname` - Hostname of TDF platform to use. Default: `tdfTrader#defaults.hostname || "localhost"`.
  - `{string=}` - `port` - Port of TDF platform to use. Default: `tdfTrader#defaults.port || 80`.
- `{function=}` - `cb` - Optional callback for Node-style usage.

__Returns:__ `Promise`

## tdfTrader#securities([options][, cb])

__Description:__ Return the list of available securities.

__Signature:__ `tdfTrader#securities([options][, cb])`

#### Examples:

__Node-style__:
```js
 tdfTrader.securities(function (err, securities) {
     if (err) {
         // handle error
     } else {
         console.log(securities.length); // 500
     }
 );
```

__Promise-style__:
```js
 tdfTrader.securities()
     .then(function (securities) {
         console.log(securities.length); // 500
     })
     .catch(function (err) {
         // handle error
     });
```

#### Parameters
- `{object=}` - `options` - Configuration options. Properties:
  - `{string=}` - `protocol` - Protocol to use. Default: `tdfTrader#defaults.protocol || "http"`.
  - `{string=}` - `hostname` - Hostname of TDF platform to use. Default: `tdfTrader#defaults.hostname || "localhost"`.
  - `{string=}` - `port` - Port of TDF platform to use. Default: `tdfTrader#defaults.port || 80`.
- `{function=}` - `cb` - Optional callback for Node-style usage.

__Returns:__ `Promise`

## tdfTrader#history(symbol[, options][, cb])

__Description:__ Return the history for a single security.

__Signature:__ `tdfTrader#history([options][, cb])`

#### Examples:

__Node-style__:
```js
 tdfTrader.history('GOOG', function (err, history) {
     if (err) {
         // handle error
     } else {
         console.log(history);
     }
 );
```

__Promise-style__:
```js
 tdfTrader.history('GOOG')
     .then(function (history) {
         console.log(history);
     })
     .catch(function (err) {
         // handle error
     });
```

#### Parameters
- `{string}` - `symbol` - The symbol of the security for which to retrieve the history.
- `{object=}` - `options` - Configuration options. Properties:
  - `{string=}` - `protocol` - Protocol to use. Default: `tdfTrader#defaults.protocol || "http"`.
  - `{string=}` - `hostname` - Hostname of TDF platform to use. Default: `tdfTrader#defaults.hostname || "localhost"`.
  - `{string=}` - `port` - Port of TDF platform to use. Default: `tdfTrader#defaults.port || 80`.
- `{function=}` - `cb` - Optional callback for Node-style usage.

__Returns:__ `Promise`

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
  - `{string=}` - `protocol` - Protocol to use. Default: `tdfTrader#defaults.protocol || "http"`.
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
  - `{string=}` - `protocol` - Protocol to use. Default: `tdfTrader#defaults.protocol || "http"`.
  - `{string=}` - `hostname` - Hostname of TDF platform to use. Default: `tdfTrader#defaults.hostname || "localhost"`.
  - `{string=}` - `port` - Port of TDF platform to use. Default: `tdfTrader#defaults.port || 80`.
- `{function=}` - `cb` - Optional callback for Node-style usage.

__Returns:__ `Promise`

Copyright (C) 2014 BYU Idea Labs

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
