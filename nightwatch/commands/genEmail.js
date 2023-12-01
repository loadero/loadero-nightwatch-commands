"use strict";

const EventEmitter = require("events");

class GenEmail extends EventEmitter {
    command(address, callback = () => { }) {
        const self = this;

        self.emit("complete");

        self.api.perform(() => {
            let value = address

            if (!address.includes("@")) {
                value = `${address}@mailinator.com`
            }
            
            callback(value)
        });

        return self;
    }
}

module.exports = GenEmail
