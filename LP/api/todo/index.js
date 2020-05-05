const express = require("express");
const isAuth=require("../../middlewares/isAuth")

const todoControllers = require("./todo_Controller");

const router = express.Router();

router
  .route("/")
  .post(todoControllers.createTodo)
  .get(todoControllers.fetchAllTodoItems);

router.route("/user").get(isAuth, todoControllers.fetchUserTodos)
module.exports = router;
