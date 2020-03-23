// const person = require('./person')

// const me = new person('Nickie', 26)

// me.greeting()

const Logger = require('./logger')

const logger = new Logger()

logger.on('message', data => console.log(`caller listerner`, data))

logger.on("Nickie")