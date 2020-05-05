const expect = require("chai").expect;
const authControllers = require("../api/users/auth_controllers");
const userControllers = require("../api/users/users_controllers");
const setup = require("./setup");

const User = require("../api/users/users_models");

describe("Auth", () => {
  before(function (done) {
    setup.DBSetup(done, User);
  });

  const userTest = {
    body: {
      name: "test Username",
      email: "testUserndame@gmail.com",
      role: "user",
      password: "AveryStrongPassword",
    },
  };
  const response = {
    status: function () {
      return this;
    },
    json: function () {},
  };

  // no users 
  it('no users available', () => {
    userControllers.fetchAllUsers(userTest, response, (users) => {
      expect(users).to.have.property("statusCode", 404)
      expect(users).to.have.property("message", "No users available")
    })
  })

  // test create user
  it("should create a new user", () => {
    authControllers.registerUser(userTest, response, (user) => {
      expect(user).to.have.property("data");
      expect(user.data).to.have.length(1);
    });
  });

  // wrong email
  it("Email already exists", () => {
    authControllers.registerUser(userTest, response, (result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 409);
    });
  });

  // test login success
  it("Login Success", () => {
    authControllers.loginUser(userTest, response, (user) => {
      expect(user).to.have.property("statusCode", 200);
      expect(user).to.have.property("data");
      expect(user).to.have.property("token");
    });
  });

  // email does not exists
  it("Email does not exist", () => {
    authControllers.loginUser(
      {
        body: {
          email: "wrongemail@gmail.com",
          password: "AveryStrongPassword",
        },
      },
      response,
      (user) => {
        expect(user).to.have.property("statusCode", 404);
        expect(user).to.be.an("error");
        expect(user).to.have.property("message");
      }
    );
  });

  // account unverfied
  it("Returns Account not verified", () => {
    authControllers.loginUser(
      {
        body: {
          email: "testUserndame@gmail.com",
          password: "AveryStrongPassword",
          verified: false,
        },
      },
      response,
      (user) => {
        expect(user).to.have.property("statusCode", 403);
        expect(user).to.be.an("error");
        expect(user).to.have.property("message");
      }
    );
  });

  // wrong password
  it("Wrong Password", () => {
    authControllers.loginUser(
      {
        body: {
          email: "testUserndame@gmail.com",
          password: "AveryStrngPassword",
        },
      },
      response,
      (user) => {
        expect(user).to.have.property("statusCode", 404);
        expect(user).to.be.an("error");
        expect(user).to.have.property("message").to.equal("Wrong password");
      }
    );
  });

  // verify account success
  it("Verify account", () => {
    authControllers.verifyAccount(
      { params: { email: "testUserndame@gmail.com" } }, response, 
      (res) => {
        expect(res).to.have.property("statusCode", 200);
        expect(res)
          .to.have.property("message")
          .to.equal("Account has been verified");
        expect(res).to.have.property("data");
      }
    );
  });

  // verify non-existing email
  it("Doesn't verify  non-existing emails", () => {
    authControllers.verifyAccount(
      { params: { email: "testUseame@gmail.com" } }, response, 
      (res) => {
        expect(res).to.have.property("statusCode", 404);
        expect(res).to.have.property("message");
      }
    );
  });

  // test fetch all users
  it("should fetch all users", () => {
    userControllers.fetchAllUsers(userTest ,response, (users) => {
      expect(users).to.have.property("statusCode", 200)
      expect(users).to.have.property("message", "All users")
      expect(user).to.have.property("data");
    });
  });

  // logout user
  // it("logout user", () => {
  //   authControllers.Logout(userTest, data => {
  //     expect(data).to.have.property("message").to.equal("Logout successful");
  //     expect(data).to.have.property("statusCode", 200);
  //   });
  // });

  after(function (done) {
    setup.DisconnectDB(done, User);
    // no users available
  
  });

  
});

// logout
// describe("Logout", () => {
//   before(function (done) {
//     setup.DBSetup(done, User);
//   });

//   // login user
//   it("Login Success", () => {
//     authControllers.loginUser(userTest, response, (user) => {
//       expect(user).to.have.property("statusCode", 200);
//       expect(user).to.have.property("data");
//       expect(user).to.have.property("token");
//     });
//   });

//   // logout

//   // server error

//   after(function (done) {
//     setup.DisconnectDB(done, User);
//   });
// })
