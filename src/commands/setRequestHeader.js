"use strict";

const EventEmitter = require("events");

class SetRequestHeader extends EventEmitter {
    command(header, value) {
		const _this = this;
        
        console.log(`[LOADERO] Setting request header '${header}' to '${value}'`);

        _this.emit('complete');

        return _this;
    }
}

module.exports = SetRequestHeader;
