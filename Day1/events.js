const event = require("events");

class MyEmitter extends event {}
// init object
const myemitter = new MyEmitter();

myemitter.on("event", () => console.log("Event fired up"));

// init event
myemitter.emit("event");
