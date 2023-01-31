"use strict";

const EventEmitter = require("events");

class SetFile extends EventEmitter {
	command(selector, fileName) {
		this.api.sendKeys(selector, fileName, (result) => {
			if (result.status !== 0) {
				console.error(`Failed to set file value for '${selector}'`);

				this.emit("error", new Error(result.error));

				return;
			}

			this.emit("complete");
		});

		return this;
	}
}

module.exports = SetFile;
