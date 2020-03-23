const os = require('os')

// platform
console.log(os.platform())

// cpu architecture
console.log(os.arch())
// console.log(os.cpus())

// memory
console.log(os.freemem())
console.log(os.totalmem())

// directory
console.log(os.homedir)

// duration of uptime
console.log(os.uptime())
