const EventEmitter = require('events')

class Logger extends EventEmitter{
    log(msg) {
        this.emit('message', {id:12, msg})
    }
}

module.exports = Logger