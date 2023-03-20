"use strict";

const EventEmitter = require("events");

const modes = [
    "custom",
    "default",
    "4g",
    "3g",
    "hsdpa",
    "gprs",
    "edge",
    "jitter",
    "latency",
    "asymmetric",
    "satellite",
    "5packet",
    "10packet",
    "20packet",
    "50packet",
    "100packet"
];

class UpdateNetwork extends EventEmitter {
    command(networkMode, networkConfig = {}) {
		const _this = this;

        if (!modes.includes(networkMode)) {
            throw new Error(`invalid network mode: ${networkMode}`);
        }

        console.log(
            `[LOADERO] Updating network mode to "${networkMode}" ` +
                `with config: ${JSON.stringify(networkConfig)}`
        );

        _this.emit('complete');

        return _this;
    }
}

module.exports = UpdateNetwork;
