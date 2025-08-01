const authController = require("../Controllers/authController");
const router = require("express").Router();

router.post("/register", authController.RegisterController);

router.post("/login", authController.LoginController);

module.exports = router;
