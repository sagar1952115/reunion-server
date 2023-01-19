const express = require("express");
const controller = require("../controllers/AuthControllers.js");
const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);

module.exports = router;
