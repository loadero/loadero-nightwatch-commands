"use strict";

const EventEmitter = require("events");

class TimeExecution extends EventEmitter {
	command(name, timedCommand, timeout = null) {
		const _this = this;

		let doneCallback;

		const cmdName = name || timedCommand.name || "anonymous";

		if (!/^[\w-]{1,150}$/.test(cmdName)) {
			_this.emit(
				"error",
				new Error(
					"Invalid name provided, " +
						"name should not exceed 150 characters in length " +
						"and can only contain alphanumeric characters, " +
						"underscores and hyphens"
				)
			);

			return _this;
		}

		const start = Date.now();

		_this.timeoutID = null;

		if (timeout) {
			if (timeout !== parseInt(timeout, 10)) {
				_this.emit("error", new Error("Invalid timeout value"));

				return _this;
			}

			_this.timeoutID = setTimeout(() => {
				_this.emit(
					"error",
					new Error(
						`Timeout ${timeout}ms reached while ` +
							`timing the execution of '${cmdName}'.`
					)
				);
			}, timeout);
		}

		if (typeof timedCommand === "undefined") {
			_this.emit("error", new Error("Timed command is not set"));

			return _this;
		}

		if (timedCommand.length === 0) {
			const cbResult = _this.runCallback(timedCommand, [_this.api]);

			if (cbResult instanceof Promise) {
				cbResult.then(() => {
					if (_this.timeoutID) {
						clearTimeout(_this.timeoutID);
					}

					_this.logSuccess(cmdName, start);
					_this.emit("complete");
				});

				return _this;
			}

			doneCallback = () => {
				_this.api.perform(() => {
					if (_this.timeoutID) {
						clearTimeout(_this.timeoutID);
					}

					_this.logSuccess(cmdName, start);
					_this.emit("complete");
				});
			};
		} else {
			doneCallback = () => {
				const args = [
					() => {
						if (_this.timeoutID) {
							clearTimeout(_this.timeoutID);
						}
						
						_this.logSuccess(cmdName, start);
						_this.emit("complete");
					}
				];

				if (timedCommand.length > 1) {
					args.unshift(_this.api);
				}

				_this.runCallback(timedCommand, args);
			};
		}

		process.nextTick(doneCallback);

		return _this;
	}

	runCallback(callback, args) {
		const _this = this;

		try {
			return callback.apply(_this.api, args);
		} catch (error) {
			_this.emit("error", error);
		}
	}

	logSuccess(name, start) {
		const end = Date.now();
		const duration = Date.now() - start;

		console.log(
			`[LOADERO] Execution time for ` +
				`'${name}': ${duration}ms (start: ${start}; end: ${end}).`
		);
	}
}

module.exports = TimeExecution;
