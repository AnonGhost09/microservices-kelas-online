const express = require("express");
const usersHandler = require("./handler/users");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

/* GET users listing. */
router.post("/register", usersHandler.register);
router.post("/login", usersHandler.login);
router.put("/", verifyToken, usersHandler.update);
router.get("/", verifyToken, usersHandler.getUser);
router.delete("/logout", verifyToken, usersHandler.logout);

module.exports = router;
