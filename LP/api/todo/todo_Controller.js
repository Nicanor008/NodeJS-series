const Todo = require("./todo_model");

exports.createTodo = (req, res) => {
  const { name, startTime, endTime, duration } = req.body;
  if (!name) {
    res.status(404).json({ message: "Todo item name is required" });
  }
  if (req.session.isLoggedIn) {
    const user = req.session.user;
    const todo = new Todo({
      name,
      startTime,
      endTime,
      duration,
      user,
    });
    todo.save().then((todoItem) => {
      return res
        .status(200)
        .json({ message: "Todo Item created", data: todoItem });
    });
  } else {
    const todo = new Todo(req.body);
    todo.save().then((todoItem) => {
      return res
        .status(200)
        .json({ message: "Todo Item created", data: todoItem });
    });
  }
};

// get all todo items
// not considering the user
exports.fetchAllTodoItems = (req, res) => {
  Todo.find()
    .then((todos) => {
      if (todos.length === 0) {
        res.status(404).json({ message: "No Todo items" });
      }
      res.status(200).json({ message: "All Todo Items", data: todos });
    })
};

// fetch user todos
exports.fetchUserTodos = (req, res) => {
  const { user } = req.session;
  Todo.find({ user }).then((userTodos) => {
    if (userTodos.length === 0) {
      return res.status(404).json({ message: "You don't have any todo items" });
    }
    return res
      .status(200)
      .json({ message: "Your all todo items", data: userTodos });
  });
};
