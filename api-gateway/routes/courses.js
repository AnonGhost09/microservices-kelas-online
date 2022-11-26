const express = require("express");
const router = express.Router();
const coursesHandler = require("./handler/courses");

router.get("/", coursesHandler.getAll);

module.exports = router;
