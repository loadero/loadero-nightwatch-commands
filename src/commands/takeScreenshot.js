"use strict";

const EventEmitter = require("events");

class TakeScreenshot extends EventEmitter {
	command(fileName, exitOnFail) {
		const _this = this;

		fileName = fileName.replace(/[<>:"/\\|?*]/g, "_");

		_this.api.saveScreenshot(fileName, payload => {
			if (payload.status !== 0) {
				if (exitOnFail) {
					throw new Error("Unable to take screenshot");
				}

				console.error("Unable to take screenshot");
			}

			_this.emit("complete");
		});

		return _this;
	}
}

module.exports = TakeScreenshot;
