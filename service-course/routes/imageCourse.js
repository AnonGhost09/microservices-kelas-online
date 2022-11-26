const express = require("express");
const { body, validationResult } = require("express-validator");
const { cekIdCourse } = require("./handler/course");
const {
  createImageCourse,
  deleteImageCourse,
} = require("./handler/imageCourse");
const cekIdImageCourse = require("./handler/imageCourse/cekIdImageCourse");
const imageCourse = express.Router();

imageCourse.post(
  "/",
  body("course_id")
    .isInt()
    .withMessage("course id harus integer")
    .notEmpty()
    .withMessage("course Id tidak boleh kosong"),
  body("image").isString().notEmpty().withMessage("image tidak boleh kosong"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const data = req.body;
    const courseId = data.course_id;

    try {
      const cekCourse = await cekIdCourse(courseId);

      if (!cekCourse) {
        return res.status(404).json({
          status: "error",
          message: "Course tidak ada",
        });
      }

      const dataImage = await createImageCourse(data);

      return res.status(201).json({
        status: "success",
        data: dataImage,
      });
    } catch (e) {
      return res.status(400).json({
        status: "error",
        message: "Image course gagal dibuat",
      });
    }
  }
);

imageCourse.delete("/:id", async (req, res) => {
  const id = +req.params.id;

  try {
    const cekImage = await cekIdImageCourse(id);

    if (!cekImage) {
      return res.status(404).json({
        status: "error",
        message: "Image course tidak ada",
      });
    }

    await deleteImageCourse(id);

    return res.status(200).json({
      status: "success",
      message: "Image course telah dihapus",
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Image course gagal dihapus",
    });
  }
});

module.exports = imageCourse;
