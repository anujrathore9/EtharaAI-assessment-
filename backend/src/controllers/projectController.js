const Project = require("../models/Project");
const User = require("../models/User");

const createProject = async (req, res, next) => {
  try {
    const { name, description, members = [] } = req.body;
    const uniqueMembers = [...new Set([...members, req.user._id.toString()])];

    const validMembers = await User.find({ _id: { $in: uniqueMembers } }).select("_id");
    if (validMembers.length !== uniqueMembers.length) {
      return res.status(400).json({ message: "One or more members are invalid" });
    }

    const project = await Project.create({
      name,
      description,
      members: uniqueMembers,
      createdBy: req.user._id,
    });

    return res.status(201).json({ message: "Project created", project });
  } catch (error) {
    return next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const query =
      req.user.role === "admin" ? { createdBy: req.user._id } : { members: req.user._id };
    const projects = await Project.find(query)
      .populate("members", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({ projects });
  } catch (error) {
    return next(error);
  }
};

const addMemberToProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;
    const project = await Project.findOne({ _id: projectId, createdBy: req.user._id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }

    const populated = await project.populate("members", "name email role");
    return res.status(200).json({ message: "Member added", project: populated });
  } catch (error) {
    return next(error);
  }
};

const removeMemberFromProject = async (req, res, next) => {
  try {
    const { projectId, userId } = req.params;
    const project = await Project.findOne({ _id: projectId, createdBy: req.user._id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.members = project.members.filter((memberId) => memberId.toString() !== userId);
    await project.save();

    const populated = await project.populate("members", "name email role");
    return res.status(200).json({ message: "Member removed", project: populated });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  addMemberToProject,
  removeMemberFromProject,
};
