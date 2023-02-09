"use strict";

const EventEmitter = require("events");

class TimeExecution extends EventEmitter {
	command(name, timedCommand, timeout = null) {
		let doneCallback;

		const cmdName = name || timedCommand.name || "anonymous";

		if (!/^[\w-]{1,150}$/.test(cmdName)) {
			this.emit(
				"error",
				new Error(
					"Invalid name provided, " +
						"name should not exceed 150 characters in length " +
						"and can only contain alphanumeric characters, " +
						"underscores and hyphens"
				)
			);

			return this;
		}

		const start = Date.now();

		this.timeoutID = null;

		if (timeout) {
			if (timeout !== parseInt(timeout, 10)) {
				this.emit("error", new Error("Invalid timeout value"));

				return this;
			}

			this.timeoutID = setTimeout(() => {
				this.emit(
					"error",
					new Error(
						`Timeout ${timeout}ms reached while ` +
							`timing the execution of '${cmdName}'.`
					)
				);
			}, timeout);
		}

		if (typeof timedCommand === "undefined") {
			this.emit("error", new Error("Timed command is not set"));

			return this;
		}

		if (timedCommand.length === 0) {
			const cbResult = this.runCallback(timedCommand, [this.api]);

			if (cbResult instanceof Promise) {
				cbResult.then(() => {
					if (this.timeoutID) {
						clearTimeout(this.timeoutID);
					}

					this.logSuccess(cmdName, start);
					this.emit("complete");
				});

				return this;
			}

			doneCallback = () => {
				this.api.perform(() => {
					if (this.timeoutID) {
						clearTimeout(this.timeoutID);
					}

					this.logSuccess(cmdName, start);
					this.emit("complete");
				});
			};
		} else {
			doneCallback = () => {
				const args = [
					() => {
						if (this.timeoutID) {
							clearTimeout(this.timeoutID);
						}
						
						this.logSuccess(cmdName, start);
						this.emit("complete");
					}
				];

				if (timedCommand.length > 1) {
					args.unshift(this.api);
				}

				this.runCallback(timedCommand, args);
			};
		}

		process.nextTick(doneCallback);

		return this;
	}

	runCallback(callback, args) {
		try {
			return callback.apply(this.api, args);
		} catch (error) {
			this.emit("error", error);
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
