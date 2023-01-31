"use strict";

const EventEmitter = require("events");

class WaitForDownloadFinished extends EventEmitter {
	command(filename, timeout = 1000) {
		console.log(`[LOADERO] Waiting for '${filename}' to finish downloading`);

		this.emit("complete");

		return this;
	}
}

module.exports = WaitForDownloadFinished;
