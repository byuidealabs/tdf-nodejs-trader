/**
 * Filename: tdfTrader.js
 * Description: NodeJS client for the [Tour de Finance](https://github.com/byuidealabs/tdf) platform.
 *
 * Copyright (C) 2014 BYU Idea Labs
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
var lang = require('mout/lang'),
	Promise = require('bluebird'),
	request = Promise.promisify(require("request")),
	URL = require('url'),
	errorPrefixes = {
		trade: 'tdfClient.trade(securities, options, cb): ',
		agentStatus: 'tdfClient.agentStatus(options, cb): ',
		history: 'tdfClient.history(options, cb): ',
		currentStatus: 'tdfClient.currentStatus(options, cb): ',
		allHistories: 'tdfClient.allHistories(options, cb): '
	};

'use strict';

module.exports = {
	defaults: {
		protocol: 'http',
		hostname: 'localhost',
		port: 80
	},

	trade: function (securities, options, cb) {
		var _this = this;

		if (cb && !lang.isFunction(cb)) {
			throw new TypeError(errorPrefixes.trade + 'cb: Must be a function!');
		}

		return Promise.resolve().then(function () {
			if (!lang.isArray(securities) && !lang.isObject(securities)) {
				throw new TypeError(errorPrefixes.trade + 'securities: Must be an object or an array!');
			} else if (!lang.isObject(options)) {
				throw new TypeError(errorPrefixes.trade + 'options: Must be an object!');
			} else if (!('agentId' in options) || !lang.isString(options.agentId)) {
				throw new TypeError(errorPrefixes.trade + 'options.agentId: Must be a string!');
			} else if (!('apiKey' in options) || !lang.isString(options.apiKey)) {
				throw new TypeError(errorPrefixes.trade + 'options.apiKey: Must be a string!');
			}

			if (!lang.isArray(securities)) {
				securities = [securities];
			}

			var url = URL.format({
					protocol: options.protocol || _this.defaults.protocol,
					hostname: options.hostname || _this.defaults.hostname,
					port: options.port || _this.defaults.port,
					pathname: URL.resolve('/agents/trade/', options.agentId)
				}),
				query = {
					apikey: options.apiKey
				};

			for (var i = 0; i < securities.length; i++) {
				var security = securities[i];
				if (!lang.isObject(security)) {
					throw new TypeError(errorPrefixes.trade + 'security (' + security + '): Must be an object!');
				} else if (!lang.isString(security.symbol)) {
					throw new TypeError(errorPrefixes.trade + 'security.symbol (' + security + '): Must be a string!');
				} else if (!lang.isNumber(security.amount)) {
					throw new TypeError(errorPrefixes.trade + 'security.amount (' + security + '): Must be a number!');
				}
				query[security.symbol] = security.amount;
			}

			return request({
				method: 'GET',
				url: url,
				qs: query
			}).then(function (result) {
					var response = result[0],
						body = result[1];

					if (body.indexOf('Not authorized to operate on agent.') !== -1) {
						throw new Error('Unauthorized. Invalid apiKey.')
					} else if (body.indexOf('Failed to load agent') !== -1) {
						throw new Error('Failed to load agent ' + options.agentId + '. Agent not found.')
					} else {
						var json;
						try {
							json = JSON.parse(body);
						} catch (err) {
							console.error(err.stack);
							throw new Error('Failed to parse TDF server response!');
						}
						return json;
					}
				});
		}).nodeify(cb);
	},

	agentStatus: function (options, cb) {
		var _this = this;

		if (cb && !lang.isFunction(cb)) {
			throw new TypeError(errorPrefixes.agentStatus + 'cb: Must be a function!');
		}

		return Promise.resolve().then(function () {
			if (!lang.isObject(options)) {
				throw new TypeError(errorPrefixes.agentStatus + 'options: Must be an object!');
			} else if (!('agentId' in options) || !lang.isString(options.agentId)) {
				throw new TypeError(errorPrefixes.agentStatus + 'options.agentId: Must be a string!');
			} else if (!('apiKey' in options) || !lang.isString(options.apiKey)) {
				throw new TypeError(errorPrefixes.agentStatus + 'options.apiKey: Must be a string!');
			}

			var url = URL.format({
					protocol: options.protocol || _this.defaults.protocol,
					hostname: options.hostname || _this.defaults.hostname,
					port: options.port || _this.defaults.port,
					pathname: URL.resolve('/agents/', options.agentId, '/composition')
				}),
				query = {
					// TODO: The server doesn't even check for this right now. It's a bug?
					apikey: options.apiKey
				};

			return request({
				method: 'GET',
				url: url,
				qs: query
			}).then(function (result) {
					var response = result[0],
						body = result[1];

					if (body.indexOf('Not authorized to operate on agent.') !== -1) {
						throw new Error('Unauthorized. Invalid apiKey.')
					} else if (body.indexOf('Failed to load agent') !== -1) {
						throw new Error('Failed to load agent ' + options.agentId + '. Agent not found.')
					} else {
						var json;
						try {
							json = JSON.parse(body);
						} catch (err) {
							console.error(err.stack);
							throw new Error('Failed to parse TDF server response!');
						}
						return json;
					}
				});
		}).nodeify(cb);
	},

	history: function (options, cb) {
		var _this = this;

		if (cb && !lang.isFunction(cb)) {
			throw new TypeError(errorPrefixes.history + 'cb: Must be a function!');
		}

		return Promise.resolve().then(function () {
			if (!lang.isObject(options)) {
				throw new TypeError(errorPrefixes.history + 'options: Must be an object!');
			} else if (options.symbol && !lang.isString(options.symbol)) {
				throw new TypeError(errorPrefixes.history + 'options.symbol: Must be a string!');
			}

			var url = URL.format({
				protocol: options.protocol || _this.defaults.protocol,
				hostname: options.hostname || _this.defaults.hostname,
				port: options.port || _this.defaults.port,
				pathname: options.symbol ? URL.resolve('/history/', options.symbol) : '/history'
			});

			return request({
				method: 'GET',
				url: url
			}).then(function (result) {
					var response = result[0],
						body = result[1];

					if (body.indexOf('Not authorized to operate on agent.') !== -1) {
						throw new Error('Unauthorized. Invalid apiKey.')
					} else if (body.indexOf('Failed to load agent') !== -1) {
						throw new Error('Failed to load agent ' + options.agentId + '. Agent not found.')
					} else {
						var json;
						try {
							json = JSON.parse(body);
						} catch (err) {
							throw new Error('Failed to parse TDF server response!');
						}
						if (json.error) {
							throw new Error('code: ' + json.error.code + '. message: ' + json.error.message);
						}
						return json;
					}
				});
		}).nodeify(cb);
	},

	/**
	 * @doc method
	 * @id tdfTrader.methods:currentStatus
	 * @name currentStatues
	 * @description
	 * Return the current status of all securities.
	 *
	 * ## Signature:
	 * ```
	 * ```
	 *
	 * ## Examples:
	 *
	 * __Node-style:__
	 * ```js
	 *  tdfTrader.currentStatus(function (err, status) {
	 *      if (err) {
	 *          // handle error
	 *      } else {
	 *          console.log(typeof status); // "object"
	 *      }
	 *  );
	 * ```
	 *
	 * __Promise-style:__
	 * ```js
	 *  tdfTrader.currentStatus()
	 *      .then(function (status) {
	 *          console.log(typeof status); // "object"
	 *      })
	 *      .catch(function (err) {
	 *          // handle error
	 *      });
	 * ```
	 *
	 * @param {object=} options Configuration options. Properties:
	 * - `{string=}` - `protocol` - HTTP protocol to use. Default: `tdfTrader#defaults.protocol || "http"`.
	 * - `{string=}` - `hostname` - Hostname of TDF platform to use. Default: `tdfTrader#defaults.hostname || "localhost"`.
	 * - `{string=}` - `port` - Port of TDF platform to use. Default: `tdfTrader#defaults.port || 80`.
	 * @param {function=} cb Optional callback for Node-style usage.
	 * @returns {Promise}
	 */
	currentStatus: function (options, cb) {
		var _this = this;

		if (lang.isFunction(options)) {
			cb = options;
			options = {};
		}

		if (cb && !lang.isFunction(cb)) {
			throw new TypeError(errorPrefixes.currentStatus + 'cb: Must be a function!');
		}

		return Promise.resolve().then(function () {
			if (!lang.isObject(options)) {
				throw new TypeError(errorPrefixes.currentStatus + 'options: Must be an object!');
			} else if (options.symbol && !lang.isString(options.symbol)) {
				throw new TypeError(errorPrefixes.currentStatus + 'options.symbol: Must be a string!');
			}

			var url = URL.format({
				protocol: options.protocol || _this.defaults.protocol,
				hostname: options.hostname || _this.defaults.hostname,
				port: options.port || _this.defaults.port,
				pathname: '/currentstatus'
			});

			return request({
				method: 'GET',
				url: url
			}).then(function (result) {
					var response = result[0],
						body = result[1];

					if (body.indexOf('Not authorized to operate on agent.') !== -1) {
						throw new Error('Unauthorized. Invalid apiKey.')
					} else if (body.indexOf('Failed to load agent') !== -1) {
						throw new Error('Failed to load agent ' + options.agentId + '. Agent not found.')
					} else {
						var json;
						try {
							json = JSON.parse(body);
						} catch (err) {
							throw new Error('Failed to parse TDF server response!');
						}
						if (json.error) {
							throw new Error('code: ' + json.error.code + '. message: ' + json.error.message);
						}
						return json;
					}
				});
		}).nodeify(cb);
	},

	/**
	 * @doc method
	 * @id tdfTrader.methods:allHistories
	 * @name allHistories
	 * @description
	 * Retrieve all available price histories.
	 *
	 * ## Signature:
	 * ```js
	 *  tdfTrader#allHistories([options][, cb])
	 * ```
	 *
	 * ## Examples:
	 *
	 * __Node-style:__
	 * ```js
	 *  tdfTrader.allHistories(function (err, histories) {
	 *      if (err) {
	 *          // handle error
	 *      } else {
	 *          console.log(typeof histories); // "array"
	 *      }
	 *  );
	 * ```
	 *
	 * __Promise-style:__
	 * ```js
	 *  tdfTrader.allHistories()
	 *      .then(function (histories) {
	 *          console.log(typeof histories); // "array"
	 *      })
	 *      .catch(function (err) {
	 *          // handle error
	 *      });
	 * ```
	 *
	 * @param {object=} options Configuration options. Properties:
	 * - `{string=}` - `protocol` - HTTP protocol to use. Default: `tdfTrader#defaults.protocol || "http"`.
	 * - `{string=}` - `hostname` - Hostname of TDF platform to use. Default: `tdfTrader#defaults.hostname || "localhost"`.
	 * - `{string=}` - `port` - Port of TDF platform to use. Default: `tdfTrader#defaults.port || 80`.
	 * @param {function=} cb Optional callback for Node-style usage.
	 * @returns {Promise}
	 */
	allHistories: function (options, cb) {
		var _this = this;

		if (lang.isFunction(options)) {
			cb = options;
			options = {};
		}

		if (cb && !lang.isFunction(cb)) {
			throw new TypeError(errorPrefixes.allHistories + 'cb: Must be a function!');
		}

		return Promise.resolve().then(function () {
			if (!lang.isObject(options)) {
				throw new TypeError(errorPrefixes.allHistories + 'options: Must be an object!');
			} else if (options.symbol && !lang.isString(options.symbol)) {
				throw new TypeError(errorPrefixes.allHistories + 'options.symbol: Must be a string!');
			}

			var url = URL.format({
				protocol: options.protocol || _this.defaults.protocol,
				hostname: options.hostname || _this.defaults.hostname,
				port: options.port || _this.defaults.port,
				pathname: '/allhistories'
			});

			return request({
				method: 'GET',
				url: url
			}).then(function (result) {
					var response = result[0],
						body = result[1];

					if (body.indexOf('Not authorized to operate on agent.') !== -1) {
						throw new Error('Unauthorized. Invalid apiKey.')
					} else if (body.indexOf('Failed to load agent') !== -1) {
						throw new Error('Failed to load agent ' + options.agentId + '. Agent not found.')
					} else {
						var json;
						try {
							json = JSON.parse(body);
						} catch (err) {
							throw new Error('Failed to parse TDF server response!');
						}
						if (json.error) {
							throw new Error('code: ' + json.error.code + '. message: ' + json.error.message);
						}
						return json;
					}
				});
		}).nodeify(cb);
	}
};