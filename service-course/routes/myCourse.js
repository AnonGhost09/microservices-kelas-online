const express = require("express");
const { body, validationResult } = require("express-validator");
const { getUser } = require("../utils/users/serviceUser");
const { cekIdCourse } = require("./handler/course");
const {
  cekMyCourse,
  createMyCourse,
  getMyCourse,
} = require("./handler/myCourse");
const myCourse = express.Router();

myCourse.get("/", async (req, res) => {
  const userId = +req.query.user_id;

  const myCourses = await getMyCourse(userId);

  return res.status(200).json({
    status: "success",
    data: myCourses,
  });
});

myCourse.post(
  "/",
  body("course_id")
    .isInt()
    .notEmpty()
    .withMessage("course_id tidak boleh kosong"),
  body("user_id").isInt().notEmpty().withMessage("user_id tidak boleh kosong"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const idCourse = req.body.course_id;

    const course = await cekIdCourse(idCourse);
    if (!course) {
      return res.status(404).json({
        status: "error",
        message: "course tidak tersedia",
      });
    }

    const idUser = req.body.user_id;

    const user = await getUser(idUser);

    if (user.status === "error") {
      return res.status(user.http_code).json({
        status: user.status,
        message: user.message,
      });
    }

    try {
      //cek apakah myCoursenya udah ada atau belum / cek duplikasi
      const data = req.body;
      const myCourse = await cekMyCourse(data);

      if (myCourse) {
        return res.status(409).json({
          status: "error",
          message: "user sudah terdaftar disini",
        });
      }

      const dataCourse = await createMyCourse(data);

      return res.status(201).json({
        status: "success",
        data: dataCourse,
      });
    } catch (e) {
      return res.status(400).json({
        status: "error",
        message: e.message,
      });
    }
  }
);

module.exports = myCourse;
