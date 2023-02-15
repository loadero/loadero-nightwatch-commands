"use strict";

const EventEmitter = require("events");

class PerformTimed extends EventEmitter {
	command(callback = () => {}, timeout) {
		const _this = this;

		let doneCallback;

		if (!timeout) {
			_this.emit("error", new Error("Timeout is not set"));

			return this;
		}

		if (timeout !== parseInt(timeout, 10)) {
			_this.emit("error", new Error("Invalid timeout value"));

			return this;
		}

		_this.timeoutID = setTimeout(() => {
			_this.emit(
				"error",
				new Error(
					`Timeout while waiting (${timeout}ms) ` +
						`for the .performTimed() command callback to be called.`
				)
			);
		}, timeout);

		if (callback.length === 0) {
			const cbResult = _this.runCallback(callback, [_this.api]);

			if (cbResult instanceof Promise) {
				cbResult.then(() => {
					clearTimeout(_this.timeoutID);
					_this.emit("complete");
				});

				return this;
			}

			doneCallback = () => {
				clearTimeout(_this.timeoutID);

				_this.emit("complete");
			};
		} else {
			doneCallback = () => {
				let args = [
					() => {
						clearTimeout(_this.timeoutID);

						_this.emit("complete");
					}
				];

				if (callback.length > 1) {
					args.unshift(_this.api);
				}

				_this.runCallback(callback, args);
			};
		}

		process.nextTick(doneCallback);

		return this;
	}

	runCallback(callback, args) {
		const _this = this;
		
		try {
			return callback.apply(_this.api, args);
		} catch (error) {
			if (_this.timeoutID) {
				clearTimeout(_this.timeoutID);
			}

			_this.emit("error", error);
		}
	}
}

module.exports = PerformTimed;
