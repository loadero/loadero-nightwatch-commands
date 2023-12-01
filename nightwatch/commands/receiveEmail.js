"use strict";

const EventEmitter = require("events");
const fs = require("fs");

class ReceiveEmail extends EventEmitter {
    command(address, callback = () => { }) {
        const self = this;

        if (!address) {
            self.emit("error", Error("No email address provided"));

            return self;
        }
        
        if (fs.existsSync("emails.json")) {            
            const content = fs.readFileSync("emails.json", "utf-8")

            self.emit("complete");
            self.api.perform(() => {callback(JSON.parse(content)["emails"])})
            
            return self;
        }
        
        self.emit("complete");
        self.api.perform(() => {callback([])})
        
        return self;
    }
}

module.exports = ReceiveEmail;
