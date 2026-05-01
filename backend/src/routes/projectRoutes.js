const express = require("express");
const {
  createProject,
  getProjects,
  addMemberToProject,
  removeMemberFromProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");
const {
  createProjectValidation,
  addMemberValidation,
  removeMemberValidation,
} = require("../validations/projectValidation");

const router = express.Router();

router.use(protect);
router.get("/", getProjects);
router.post("/", allowRoles("admin"), createProjectValidation, validate, createProject);
router.patch("/:projectId/members", allowRoles("admin"), addMemberValidation, validate, addMemberToProject);
router.delete(
  "/:projectId/members/:userId",
  allowRoles("admin"),
  removeMemberValidation,
  validate,
  removeMemberFromProject
);

module.exports = router;
