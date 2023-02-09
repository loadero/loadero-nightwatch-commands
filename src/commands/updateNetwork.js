"use strict";

const EventEmitter = require("events");

class UpdateNetwork extends EventEmitter {
    command(networkMode, networkConfig = {}) {
        console.log(
            `[LOADERO] Updating network mode to "${networkMode}" ` +
                `with config: ${JSON.stringify(networkConfig)}`
        );

        this.emit('complete');

        return this;
    }
}

module.exports = UpdateNetwork;
