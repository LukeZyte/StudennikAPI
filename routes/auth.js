const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

// /auth/...
router.get("/getUserById/:id", authController.getUserById);
router.post("/createUser", authController.postCreateUser);
router.post("/authUser", authController.postAuthUser);

module.exports = router;
