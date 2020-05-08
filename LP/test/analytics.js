const expect = require("chai").expect;
const analyticsControllers = require("../api/analytics/analytics_controller");
const todoControllers = require("../api/todo/todo_Controller");
const Todo = require("../api/todo/todo_model");
const setup = require("./setup");

const res = {
  status: function () {
    return this;
  },

  json: function () {},
};

describe("Analytics", () => {
  before((done) => {
    setup.DBSetup(done, Todo);
  });

//   it("should create todo item", () => {
    todoControllers.createTodo(
      {
        body: [
          {
            name: "todo false test data",
            completed: false,
            duration: 10,
            category: "todo",
          },
          {
            name: "todo true test data",
            completed: true,
            duration: 10,
            category: "todo",
          },
          {
            name: "goals false test data",
            completed: false,
            duration: 10,
            category: "goal",
          },
          {
            name: "goals true test data",
            completed: true,
            duration: 10,
            category: "goal",
          },
          {
            name: "reminder false test data",
            completed: false,
            duration: 10,
            category: "reminder",
          },
          {
            name: "reminder true test data",
            completed: true,
            duration: 10,
            category: "reminder",
          },
        ],
        session: { isLoggedIn: true },
      },
      res,
      () => {}
    );
//   });

  // get analytics success
  it("should fetch analytics", () => {
    analyticsControllers.getAnalytics(
      {
        session: {
          isLoggedIn: true,
        },
      },
      res,
      (Response) => {
        expect(Response).to.have.property("message");
        expect(Response).to.have.property("data");
      }
    );
  });

  after((done) => {
    setup.DisconnectDB(done, Todo);
  });
});

describe("No Analytics", () => {
  // fail
  it("should fail to get analytics", () => {
    analyticsControllers.getAnalytics(
      {
        session: {
          isLoggedIn: true,
        },
      },
      res,
      (response) => {
        expect(response).to.have.property("message");
      }
    );
  });
});
