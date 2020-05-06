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
  params: {
    _id: "5ea06d80285916894e347168",
  },
  body: {
    name: "This is a test todo data",
    completed: false,
    _id: "5ea06d80285916894e347168",
  },
  session: {
    isLoggedIn: true,
  },
};

const todoFalseData = {
  body: {
    name: "This is a test todo data",
    completed: true,
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

  // no archived data
  it("should fail to fetch archived todo - 404", () => {
    todoControllers.fetchedArchivedTodo(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 404);
      expect(response).to.have.property("message");
    });
  });

  // delete no existing item
  it("Should fail to delete a todo item - 404", () => {
    todoControllers.deleteTodoItem(
      { params: { _id: "5eb2ca85b3ee2902b2349614" } },
      res,
      (response) => {
        expect(response).to.have.property("statusCode", 404);
        expect(response).to.have.property("message");
      }
    );
  });

  // no single item
  it("Should fail get single todo item - 404", () => {
    todoControllers.getSingleTodo(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 404);
      expect(response).to.have.property("message");
    });
  });

  // 404 on update item
  it("Should fail to update single todo item - 404", () => {
    todoControllers.updateSingleTodo(
      { params: { _id: "5ea06d80285916894e347161" }, body: { name: "Update" } },
      res,
      (response) => {
        expect(response).to.have.property("statusCode", 404);
        expect(response).to.have.property("message");
      }
    );
  });
});

describe("Completed Todos", () => {
  before((done) => {
    setup.DBSetup(done, Todo);
  });

  // success uncompleted
  it("should fetch all uncompleted todo", () => {
    todoControllers.fetchUnCompletedTodos(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 200);
      expect(response).to.have.property("message");
      expect(response).to.have.property("data");
    });
  });

  // no uncomplted
  todoControllers.fetchUnCompletedTodos(todoFalseData, res, (response) => {
    expect(response).to.have.property("statusCode", 200);
    expect(response).to.have.property("message", "No Todo items");
  });

  // updated todo
  it("should update todo", () => {
    const todoUpdateData = {
      params: {
        id: "5eb17400111b429364f89b46",
      },
      body: {
        name: "This is a test todo data",
        completed: false,
      },
      session: {
        isLoggedIn: true,
      },
    };

    // update todo success
    todoControllers.updateUnCompletedTodos(todoUpdateData, res, (response) => {
      expect(response).to.have.property("statuscode", 200);
      expect(response).to.have.property("message");
      expect(response).to.have.property("data");
    });
  });

  it("should update null todo", () => {
    todoControllers.updateUnCompletedTodos(
      { params: { id: "5eb17400111b429364f89b46" }, body: { completed: "" } },
      res,
      (response) => {
        expect(response).to.have.property("statuscode", 200);
        expect(response).to.have.property("message");
        expect(response).to.have.property("data");
      }
    );
  });

  // completed todo: success
  it("should fetch all completed todo", () => {
    todoControllers.createTodo(todoFalseData, res, () => {});
    todoControllers.fetchCompletedTodos(todoFalseData, res, (response) => {
      expect(response).to.have.property("statusCode", 200);
      expect(response).to.have.property("message");
      expect(response).to.have.property("data");
    });
  });

  // completed todo: 404
  it("should fetch empty completed todo", () => {
    todoControllers.createTodo(todoFalseData, res, (response) => {});
    todoControllers.fetchCompletedTodos(
      {
        params: {
          id: "5eb17400111b219364f89b46",
        },
        body: {
          name: "This is a test todo data",
        },
        session: {
          isLoggedIn: true,
        },
      },
      res,
      (response) => {
        expect(response).to.have.property("statusCode", 404);
        expect(response).to.have.property("message");
      }
    );
  });

  // update archive item
  it("Should archive or unarchive items", () => {
    const archiveData = {
      params: {
        _id: "5eb2ca85b3ee2902b2349645",
      },
      body: {
        archived: false,
        _id: "5eb2ca85b3ee2902b2349314",
      },
      session: {
        user: "5eb2ca85b3ee2902b2349645",
      },
    };
    todoControllers.archivedTodo(archiveData, res, (response) => {
      expect(response).to.have.property("statusCode", 200);
      expect(response).to.have.property("message");
    });
  });

  // fetch archived todo
  it("should fetch archived todo", () => {
    todoControllers.fetchedArchivedTodo(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 200);
      expect(response).to.have.property("message");
    });
  });

  // should get single todo
  it("Should get single todo item", () => {
    todoControllers.getSingleTodo(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 200);
      expect(response).to.have.property("message");
      expect(response).to.have.property("data");
    });
  });

  // update todo item
  it("Should update single todo item", () => {
      todoControllers.updateSingleTodo(
        {
          params: { _id: "5ea06d80285916894e347168" },
          body: { name: "Update" },
        },
        res,
        (response) => {
          expect(response).to.have.property("statusCode", 200);
          expect(response).to.have.property("message");
          expect(response).to.have.property("data");
        }
      );
  });

  // fetch deleted todo
  it("Should delete a todo item", () => {
    todoControllers.deleteTodoItem(
      { params: { _id: "5eb2ca85b3ee2902b2349645" } },
      res,
      (response) => {
        expect(response).to.have.property("statusCode", 200);
      }
    );
  });

  // delete user todo
  it("should delete all user todo", () => {
    todoControllers.deleteAllUserTodoItems(todoData, res, (response) => {
      expect(response).to.have.property("statusCode", 200);
      expect(response).to.have.property("message");
    });
  });

  after((done) => {
    setup.DisconnectDB(done, Todo);
  });
});
