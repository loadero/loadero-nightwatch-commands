"use strict";

const EventEmitter = require("events");

class IgnoreAlert extends EventEmitter {
	command() {
		const _this = this;

		_this.api.getAlertText(value => {
			if (value.status === 0) {
				_this.api.acceptAlert();
			}

			_this.emit("complete");
		});

		return _this;
	}
}

module.exports = IgnoreAlert;
