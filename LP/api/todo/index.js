const express = require("express");
const isAuth = require("../../middlewares/isAuth");

const todoControllers = require("./todo_Controller");

const router = express.Router();

router
  .route("/")
  .post(todoControllers.createTodo)
  .get(todoControllers.fetchAllTodoItems);

router
  .route("/user")
  .get(isAuth, todoControllers.fetchUserTodos)
  .delete(isAuth, todoControllers.deleteAllUserTodoItems);

router.route("/complete").get(isAuth, todoControllers.fetchCompletedTodos);
router.route("/ongoing").get(isAuth, todoControllers.fetchUnCompletedTodos);
router
  .route("/ongoing/:id")
  .patch(isAuth, todoControllers.updateUnCompletedTodos);

// archives
router.route("/archive").get(isAuth, todoControllers.fetchedArchivedTodo);
router.route("/archive/:_id").patch(isAuth, todoControllers.archivedTodo);

// delete todo items
router
  .route("/:_id")
  .get(todoControllers.getSingleTodo)
  .patch(isAuth, todoControllers.updateSingleTodo)
  .delete(isAuth, todoControllers.deleteTodoItem);

module.exports = router;
