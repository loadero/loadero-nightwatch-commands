"use strict";

const EventEmitter = require("events");

class IgnoreAlert extends EventEmitter {
	command() {
		const _this = this;

		_this.api.alerts.getText(value => {
			const { error, status } = value;
			const { message } = error || {};

			if (status === 0) {
				_this.api.alerts.accept();
			} else if (message && message.includes("no such alert")) {
				console.log("[INFO] Loadero: No alert is open.");
			}

			_this.emit("complete");
		});

		return _this;
	}
}

module.exports = IgnoreAlert;
