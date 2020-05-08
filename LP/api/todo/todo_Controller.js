const Todo = require("./todo_model");

exports.createTodo = (req, res) => {
  const { name, startTime, endTime, duration, category, completed } = req.body;
  if (name === "") {
    return res.status(404).json({ message: "Todo item name is required" });
  }
  if (req.session.isLoggedIn) {
    const user = req.session.user;
    const todo = new Todo({
      name,
      startTime,
      endTime,
      duration,
      user,
      category,
      completed,
    });
    // Todo.insertMany
    Todo.insertMany(req.body).then((todoItem) => {
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
  Todo.find({ archived: false }).then((todos) => {
    if (todos.length === 0) {
      res.status(404).json({ message: "No Todo items" });
    }
    res.status(200).json({ message: "All Todo Items", data: todos });
  });
};

// fetch user todos
exports.fetchUserTodos = (req, res) => {
  const { user } = req.session;
  Todo.find({ user, archived: false }).then((userTodos) => {
    if (userTodos.length === 0) {
      return res.status(404).json({ message: "You don't have any todo items" });
    }
    return res
      .status(200)
      .json({ message: "Your all todo items", data: userTodos });
  });
};

// list uncompleted todos
exports.fetchUnCompletedTodos = (req, res) => {
  Todo.find({ completed: false, archived: false }).then((unCompletedTodos) => {
    if (unCompletedTodos.length === 0) {
      return res.status(404).json({ message: "You don't have any todo items" });
    }
    return res.status(200).json({
      message: `${unCompletedTodos.length} Ongoing Todo`,
      data: unCompletedTodos,
    });
  });
};

// update todo item to finished
exports.updateUnCompletedTodos = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  if (completed === "" || completed === null || completed === undefined) {
    return res.status(404).json({ message: "Completed status is required" });
  }
  Todo.findByIdAndUpdate({ _id: id }, { completed: !completed }).then(() => {
    Todo.findById({ _id: id }).then((data) => {
      return res.status(200).json({ message: "Todo item updated", data });
    });
  });
};

// list completed todos
exports.fetchCompletedTodos = (req, res) => {
  Todo.find({ completed: true, archived: false }).then((completedTodos) => {
    if (completedTodos.length === 0) {
      return res.status(404).json({ message: "You don't have any todo items" });
    }
    return res.status(200).json({
      message: `${completedTodos.length} Todo done`,
      data: completedTodos,
    });
  });
};

// soft delete todo items items
// archive todo
exports.archivedTodo = (req, res) => {
  const { archived } = req.body;
  Todo.findOneAndUpdate({ _id: req.params._id }, { archived: !archived }).then(
    (archivedTodo) => {
      if (!archivedTodo) {
        return res.status(404).json({ message: "Todo item doesn't exists" });
      }
      return res
        .status(200)
        .json({ message: "Todo has been archived", data: archivedTodo });
    }
  );
};

// fetch all archived data
exports.fetchedArchivedTodo = (req, res) => {
  Todo.aggregate([
    { $match: { archived: true, user: req.session.user } },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]).then((allArchivedTodo) => {
    if (allArchivedTodo.length === 0) {
      return res.status(404).json({ message: "No archived todo items" });
    }
    return res
      .status(200)
      .json({ message: "Archived todo items", data: allArchivedTodo });
  });
};

// delete(hard) todo item
exports.deleteTodoItem = (req, res) => {
  const { _id } = req.params;
  Todo.findByIdAndDelete({ _id }).then((deletedTodo) => {
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo item does not exist" });
    }
    return res.status(200).json({ message: "Todo item deleted" });
  });
};

exports.deleteAllUserTodoItems = (req, res) => {
  Todo.deleteMany({ user: req.session.user }).then((userTodoItems) => {
    if (userTodoItems.deletedCount === 0) {
      return res.status(404).json({ message: "You don't have any todo items" });
    }
    return res
      .status(200)
      .json({ message: `${userTodoItems.deletedCount} todo items deleted` });
  });
};

// fetch single todo item

exports.getSingleTodo = (req, res) => {
  const { _id } = req.params;
  Todo.findOne({ _id }).then((singleTodo) => {
    if (singleTodo === null) {
      return res.status(404).json({ message: "Todo item not available" });
    }
    return res.status(200).json({ message: "Todo item", data: singleTodo });
  });
};
// update single todo item body
exports.updateSingleTodo = (req, res) => {
  const { _id } = req.params;
  Todo.findByIdAndUpdate({ _id }, req.body).then((updatedItem) => {
    if (!updatedItem) {
      return res.status(404).json({ message: "Todo item not available" });
    }
    Todo.findOne({ _id }).then((data) => {
      return res.status(200).json({ message: "Todo updated", data });
    });
  });
};

// search todo by name
exports.searchTodoItemByName = (req, res) => {
  const { name } = req.params;
  Todo.find({ name: { $regex: name } }).then((data) => {
    if (!data.length) {
      return res.status(200).json({ message: `No todo with ${name} found` });
    }
    return res.status(200).json({ message: `${data.length} todo found`, data });
  });
};

// list todo by tags
exports.listTodoByTags = (req, res) => {
  const { tag } = req.params;
  Todo.find({ tags: { $regex: tag } })
    .sort({ createdAt: -1 })
    .then((data) => {
      if (!data.length) {
        return res
          .status(200)
          .json({ message: `No todo with  tag ${tag} found` });
      }
      return res
        .status(200)
        .json({ message: `${data.length} todo with tag ${tag}`, data });
    });
};
