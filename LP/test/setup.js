const mongoose = require("mongoose");

exports.DBSetup = (done, model) => {
  mongoose
    .connect("mongodb://127.0.0.1/LP-test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      const user = new model({
        email: "test@test.com",
        password: "tester",
        name: "Test",
        role: "author",
      });
      return user.save();
    })
    .then(() => {
      done();
    });
};

exports.DisconnectDB = (done, model) => {
  model
    .deleteMany({})
    .then(() => {
      return mongoose.disconnect();
    })
    .then(() => {
      done();
    });
};
