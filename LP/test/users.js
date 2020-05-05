const expect = require("chai").expect;
const mongoose = require("mongoose");
const authControllers = require("../api/users/auth_controllers");
const userControllers = require("../api/users/users_controllers");

const User = require("../api/users/users_models");

describe("Auth", () => {
  before(function (done) {
    mongoose
      .connect("mongodb://127.0.0.1/LP-test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          role: "author"
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });
  const req = {
    body: {
      name: "test Username",
      email: "testUserndame@gmail.com",
      role: "user",
      password: "AveryStrongPassword",
    },
  };
  const res = {
    status: function () {
      return this;
    },
    json: function () {},
  };
  it("should create create a new user", () => {
    authControllers.registerUser(req, res, (user) => {
      expect(user).to.have.property("data");
      expect(user.data).to.have.length(1);
    });
  });

  // test fetch all users
  it("should fetch all users", () => {
    userControllers.fetchAllUsers((user) => {
        expect(user).to.have.property('data')
    });
  });

  after(function(done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
