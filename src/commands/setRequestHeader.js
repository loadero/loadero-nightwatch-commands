'use strict';

const EventEmitter = require('events');

class SetRequestHeader extends EventEmitter {
    command(header, value) {
        console.log(`[LOADERO] Setting request header '${header}' to '${value}'`);

        this.emit('complete');

        return this;
    }
}

module.exports = SetRequestHeader;
