const { Task } = require("../models");

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { taskId },
    } = req;
    const [task] = await userInstance.getTasks({ where: { id: taskId } });
    if (!task) {
      return res.status(404).send({ data: "Task not exists" });
    }
    req.taskInstance = task;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.checkOnlyTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const wantedTask = await Task.findOne({
      where: { id: taskId },
    });
    if (!wantedTask) {
      return res.status(404).send({ data: "Task not exists" });
    }
    req.task = wantedTask;
    next();
  } catch (error) {
    next(error);
  }
};
