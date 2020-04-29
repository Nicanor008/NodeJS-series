const mongoose = require("mongoose");

const User = require("../models/user");

describe("Auth Controller", () => {
  before((done) => {
    mongoose
      .connect(
        "mongodb+srv://nicanor:nicanor@cluster0-mfpbg.mongodb.net/shopTests?retryWrites=true"
      )
      .then((result) => {
        const user = new User({
          email: "test@nic.com",
          password: "TestPass",
          username: "Test",
          role: "user",
        });
        return user.save();
      })
      .then(() => done());
  });

  // it('should throw 500 if DB connection fails', (done) => {

  // })

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
