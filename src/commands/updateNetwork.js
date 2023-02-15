"use strict";

const EventEmitter = require("events");

class UpdateNetwork extends EventEmitter {
    command(networkMode, networkConfig = {}) {
		const _this = this;

        console.log(
            `[LOADERO] Updating network mode to "${networkMode}" ` +
                `with config: ${JSON.stringify(networkConfig)}`
        );

        _this.emit('complete');

        return _this;
    }
}

module.exports = UpdateNetwork;
