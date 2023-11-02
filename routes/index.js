const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const TaskController = require("../controllers/task.controller");
const { checkUser } = require("../middlewares/users.mw");
const { checkTask, checkOnlyTask } = require("../middlewares/tasks.mw");

const router = Router();

// User methods
router.post("/users", UserController.createUser);
router.get("/users/:userId", checkUser, UserController.getUserInstance);
router.get("/users", UserController.getAllUsers);
router.patch("/users", UserController.updateUserStatic);
router.patch("/users/:userId", checkUser, UserController.updateUserInstance);
router.delete("/users", UserController.deleteUserStatic);
router.delete("/users/:userId", checkUser, UserController.deleteUserInstance);

// Task methods
router.post("/users/:userId/tasks", checkUser, TaskController.createTask);
router.get("/users/:userId/tasks", checkUser, TaskController.getAllTasks);
router.get("/tasks/:taskId", checkOnlyTask, TaskController.getTask);
router.patch(
  "/users/:userId/tasks/:taskId",
  checkUser,
  checkTask,
  TaskController.updateTask
);
router.delete("/tasks/:taskId", checkOnlyTask, TaskController.deleteTask);

module.exports = router;
