"use strict";

const EventEmitter = require("events");

class WaitForDownloadFinished extends EventEmitter {
	command(filename, timeout = 1000) {
		const _this = this;

		if (filename === "") {
			throw new Error(`no filename provided`);
		}

		console.log(`[LOADERO] Waiting for '${filename}' to finish downloading`);

		_this.emit("complete");

		return _this;
	}
}

module.exports = WaitForDownloadFinished;
