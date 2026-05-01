const express = require("express");
const { createTask, getTasks, updateTaskStatus } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");
const {
  createTaskValidation,
  updateTaskStatusValidation,
  getTasksValidation,
} = require("../validations/taskValidation");

const router = express.Router();

router.use(protect);
router.post("/projects/:projectId", allowRoles("admin"), createTaskValidation, validate, createTask);
router.get("/projects/:projectId", getTasksValidation, validate, getTasks);
router.patch("/:taskId/status", updateTaskStatusValidation, validate, updateTaskStatus);

module.exports = router;
