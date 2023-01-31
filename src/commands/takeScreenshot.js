"use strict";

const EventEmitter = require("events");

class TakeScreenshot extends EventEmitter {
	command(fileName, exitOnFail) {
		this.api.saveScreenshot(fileName, payload => {
			if (payload.status !== 0) {
				if (exitOnFail) {
					throw new Error("Unable to take screenshot");
				}

				console.error("Unable to take screenshot");
			}

			this.emit("complete");
		});

		return this;
	}
}

module.exports = TakeScreenshot;
