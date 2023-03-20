"use strict";

const EventEmitter = require("events");

class SetFile extends EventEmitter {
	command(selector, fileName) {
		const _this = this;

		_this.api.sendKeys(selector, fileName, result => {
			if (result.status !== 0) {
				console.error(`Failed to set file value for '${selector}'`);

				_this.emit("error", new Error(result.error));

				return;
			}

			_this.emit("complete");
		});

		return _this;
	}
}

module.exports = SetFile;
