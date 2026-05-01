const { body, param, query } = require("express-validator");

const createTaskValidation = [
  param("projectId").isMongoId().withMessage("Invalid project ID"),
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").optional().isString(),
  body("dueDate").isISO8601().withMessage("Valid due date is required"),
  body("assignedTo").isMongoId().withMessage("Valid assignee is required"),
];

const updateTaskStatusValidation = [
  param("taskId").isMongoId().withMessage("Invalid task ID"),
  body("status")
    .isIn(["todo", "in-progress", "done"])
    .withMessage("Status must be todo, in-progress or done"),
];

const getTasksValidation = [
  param("projectId").isMongoId().withMessage("Invalid project ID"),
  query("status")
    .optional()
    .isIn(["todo", "in-progress", "done"])
    .withMessage("Invalid status filter"),
  query("overdue").optional().isIn(["true", "false"]).withMessage("Invalid overdue filter"),
];

module.exports = {
  createTaskValidation,
  updateTaskStatusValidation,
  getTasksValidation,
};
