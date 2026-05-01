const express = require("express");
const { login, signup, me } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const { signupValidation, loginValidation } = require("../validations/authValidation");

const router = express.Router();

router.post("/signup", signupValidation, validate, signup);
router.post("/login", loginValidation, validate, login);
router.get("/me", protect, me);

module.exports = router;
