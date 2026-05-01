const Project = require("../models/Project");
const Task = require("../models/Task");

const createTask = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title, description, dueDate, assignedTo } = req.body;

    const project = await Project.findOne({ _id: projectId, createdBy: req.user._id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.members.some((memberId) => memberId.toString() === assignedTo)) {
      return res.status(400).json({ message: "Assignee must be a project member" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      project: projectId,
      assignedTo,
      createdBy: req.user._id,
    });

    const populatedTask = await task.populate([
      { path: "assignedTo", select: "name email role" },
      { path: "project", select: "name description" },
    ]);

    return res.status(201).json({ message: "Task created", task: populatedTask });
  } catch (error) {
    return next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { status, overdue } = req.query;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isMember = project.members.some((id) => id.toString() === req.user._id.toString());
    const isAdminOwner = project.createdBy.toString() === req.user._id.toString();
    if (!isMember && !isAdminOwner) {
      return res.status(403).json({ message: "Not allowed to view tasks for this project" });
    }

    const query = { project: projectId };
    if (req.user.role === "member") {
      query.assignedTo = req.user._id;
    }
    if (status) {
      query.status = status;
    }
    if (overdue === "true") {
      query.dueDate = { $lt: new Date() };
      query.status = { $ne: "done" };
    }

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email role")
      .sort({ dueDate: 1, createdAt: -1 });

    return res.status(200).json({ tasks });
  } catch (error) {
    return next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const canUpdate =
      req.user.role === "admin"
        ? task.createdBy.toString() === req.user._id.toString()
        : task.assignedTo.toString() === req.user._id.toString();
    if (!canUpdate) {
      return res.status(403).json({ message: "Not allowed to update this task" });
    }

    task.status = status;
    await task.save();
    const populatedTask = await task.populate("assignedTo", "name email role");

    return res.status(200).json({ message: "Task updated", task: populatedTask });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createTask, getTasks, updateTaskStatus };
