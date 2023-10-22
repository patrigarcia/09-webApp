const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication, isTeacher } = require("../middleware/authentication");
const upload = require("../middleware/upload");

router.post("/", UserController.register);

router.post("/login", UserController.login);

router.delete("/logout", authentication, UserController.logout);

module.exports = router;
