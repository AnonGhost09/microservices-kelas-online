const express = require("express");
const mediaHandler = require("./handler/media");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken"); //bisadi taro di route route tertentu saja

/* GET users listing. */
router.post("/", mediaHandler.create);
router.get("/", verifyToken, mediaHandler.getAll);
router.delete("/:id", mediaHandler.destroy);

module.exports = router;
