"use strict";

const EventEmitter = require("events");

class IgnoreAlert extends EventEmitter {
	command() {
		this.api.getAlertText(value => {
			if (value.status === 0) {
				self.api.acceptAlert();
			}

			this.emit("complete");
		});

		return this;
	}
}

module.exports = IgnoreAlert;
