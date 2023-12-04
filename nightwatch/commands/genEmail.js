"use strict";

const EventEmitter = require("events");

class GenEmail extends EventEmitter {
	command(address, callback = () => { }) {
		const _this = this;

		_this.api.perform(() => {
			let value = address
			if (!address.includes("@")) {
				value = `${address}@mailinator.com`
			}

			callback(value)
		});

		_this.emit("complete");

		return _this;
	}
}

module.exports = GenEmail
