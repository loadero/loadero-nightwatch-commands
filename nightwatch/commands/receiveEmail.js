"use strict";

const EventEmitter = require("events");
const fs = require("fs");

class ReceiveEmail extends EventEmitter {
    command(address, callback = () => { }) {
		const _this = this;

        if (!address) {
            _this.emit("error", Error("No email address provided"));

            return _this;
        }
        
        if (fs.existsSync("emails.json")) {            
            const content = fs.readFileSync("emails.json", "utf-8")

            _this.api.perform(() => {callback(JSON.parse(content)["emails"])})
            _this.emit("complete");
            
            return _this;
        }
        
        _this.api.perform(() => {callback([])})
        _this.emit("complete");
        
        return _this;
    }
}

module.exports = ReceiveEmail;
