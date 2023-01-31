"use strict";

const EventEmitter = require("events");

class SetUserAgent extends EventEmitter {
	command(userAgent) {
		console.log(`[LOADERO] Setting user agent to: ${userAgent}`);

		this.emit("complete");

		return this;
	}
}

module.exports = SetUserAgent;
