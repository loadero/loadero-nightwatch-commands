"use strict";

const EventEmitter = require("events");

class PerformTimed extends EventEmitter {
	command(callback = () => {}, timeout) {
		let doneCallback;

		if (!timeout) {
			this.emit("error", new Error("Timeout is not set"));

			return this;
		}

		if (timeout !== parseInt(timeout, 10)) {
			this.emit("error", new Error("Invalid timeout value"));

			return this;
		}

		this.timeoutID = setTimeout(() => {
			this.emit(
				"error",
				new Error(
					`Timeout while waiting (${timeout}ms) ` +
						`for the .performTimed() command callback to be called.`
				)
			);
		}, timeout);

		if (callback.length === 0) {
			const cbResult = this.runCallback(callback, [this.api]);

			if (cbResult instanceof Promise) {
				cbResult.then(() => {
					clearTimeout(this.timeoutID);
					this.emit("complete");
				});

				return this;
			}

			doneCallback = () => {
				clearTimeout(this.timeoutID);

				this.emit("complete");
			};
		} else {
			doneCallback = () => {
				let args = [
					() => {
						clearTimeout(this.timeoutID);

						this.emit("complete");
					}
				];

				if (callback.length > 1) {
					args.unshift(this.api);
				}

				this.runCallback(callback, args);
			};
		}

		process.nextTick(doneCallback);

		return this;
	}

	runCallback(callback, args) {
		try {
			return callback.apply(this.api, args);
		} catch (error) {
			if (this.timeoutID) {
				clearTimeout(this.timeoutID);
			}

			this.emit("error", error);
		}
	}
}

module.exports = PerformTimed;
