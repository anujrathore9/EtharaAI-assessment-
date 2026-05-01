const { body, param } = require("express-validator");

const createProjectValidation = [
  body("name").trim().notEmpty().withMessage("Project name is required"),
  body("description").optional().isString(),
  body("members").optional().isArray().withMessage("Members should be an array"),
];

const projectIdValidation = [
  param("projectId").isMongoId().withMessage("Invalid project ID"),
];

const addMemberValidation = [
  ...projectIdValidation,
  body("userId").isMongoId().withMessage("Valid user ID is required"),
];

const removeMemberValidation = [
  ...projectIdValidation,
  param("userId").isMongoId().withMessage("Invalid user ID"),
];

module.exports = {
  createProjectValidation,
  projectIdValidation,
  addMemberValidation,
  removeMemberValidation,
};
