const expect = require("chai").expect;
const todoControllers = require("../api/todo/todo_Controller");
const Todo = require("../api/todo/todo_model");
const setup = require("./setup");

const res = {
  status: function () {
    return this;
  },

  json: function () {},
};

const todoData = {
  body: {
    name: "This is a test todo data",
  },
  session: {
    isLoggedIn: true,
  },
};

const todoFalseData = {
  body: {
    name: "This is a test todo data",
  },
  session: {
    isLoggedIn: false,
  },
};

describe("Todo", () => {
  before((done) => {
    setup.DBSetup(done, Todo);
  });

  // create todo success as logged in user
  it("should create todo item", () => {
    todoControllers.createTodo(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 200);
      expect(response).to.have.property("message", "Todo Item created");
    });
  });

  //   create todo as non-logged in user
  it("should create todo item", () => {
    todoControllers.createTodo(
      {
        body: {
          name: "This is a test todo data",
        },
        session: {
          isLoggedIn: false,
        },
      },
      res,
      (response) => {
        expect(response).to.have.property("statusCode", 200);
        expect(response).to.have.property("message", "Todo Item created");
      }
    );
  });

  // no todo name
  it("should fail on missing todo name", () => {
    todoControllers.createTodo(
      { body: {}, session: { isLoggedIn: false } },
      res,
      (response) => {
        expect(response).to.have.property("statusCode", 404);
        expect(response).to.have.property(
          "message",
          "Todo item name is required"
        );
      }
    );
  });

  // fetch all todos success
  it("should fetch all todo items", () => {
    todoControllers.fetchAllTodoItems(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 200);
      expect(response).to.have.property("message", "All Todo Items");
      expect(response).to.have.property("data");
    });
  });

  //   server error
  it("should fail on server unavailability", () => {
    todoControllers.fetchAllTodoItems(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 500);
    });
  });

  //   fetch user todos success
  it("should fetch user todos", () => {
    todoControllers.fetchUserTodos(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 200);
    });
  });

  //   should fail on no auth
  it("should not fetch user todos to unauthorised users", () => {
    todoControllers.fetchUserTodos(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 401);
      expect(response).to.have.property(
        "message",
        "Unauthorised, you must login to continue"
      );
    });
  });

  after((done) => {
    setup.DisconnectDB(done, Todo);
  });
});

describe("No Todos", () => {
  it("should display no todo items", () => {
    todoControllers.fetchAllTodoItems(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 404);
      expect(response).to.have.property("message", "No Todo items");
    });
  });

  //   no user todo items
  it("Should display empty todo", () => {
    todoControllers.fetchUserTodos(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 404);
    });
  });
});
