const Task = require("../models/Task");
const Project = require("../models/Project");

const getDashboardStats = async (req, res, next) => {
  try {
    let taskQuery = {};
    if (req.user.role === "member") {
      taskQuery = { assignedTo: req.user._id };
    } else {
      const ownedProjects = await Project.find({ createdBy: req.user._id }).select("_id");
      taskQuery = { project: { $in: ownedProjects.map((p) => p._id) } };
    }

    const tasks = await Task.find(taskQuery);
    const now = new Date();

    const stats = tasks.reduce(
      (acc, task) => {
        acc.totalTasks += 1;
        if (task.status === "done") acc.completedTasks += 1;
        if (task.status !== "done") acc.pendingTasks += 1;
        if (task.status !== "done" && new Date(task.dueDate) < now) acc.overdueTasks += 1;
        return acc;
      },
      { totalTasks: 0, completedTasks: 0, pendingTasks: 0, overdueTasks: 0 }
    );

    return res.status(200).json(stats);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDashboardStats };
