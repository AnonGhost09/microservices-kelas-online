var express = require("express");
var router = express.Router();

const mentorRouter = require("./mentor");
const courseRouter = require("./course");
const chapterRoute = require("./chapter");
const lessonRouter = require("./lesson");
const imageCourseRouter = require("./imageCourse");
const myCourseRouter = require("./myCourse");
const reviewRouter = require("./review");

router.use("/mentors", mentorRouter);
router.use("/courses", courseRouter);
router.use("/chapters", chapterRoute);
router.use("/lessons", lessonRouter);
router.use("/image-courses", imageCourseRouter);
router.use("/my-courses", myCourseRouter);
router.use("/reviews", reviewRouter);

module.exports = router;
