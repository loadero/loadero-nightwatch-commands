"use strict";

const EventEmitter = require("events");

class SetUserAgent extends EventEmitter {
	command(userAgent) {
		const _this = this;

		console.log(`[LOADERO] Setting user agent to: ${userAgent}`);

		_this.emit("complete");

		return _this;
	}
}

module.exports = SetUserAgent;
