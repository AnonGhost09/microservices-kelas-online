const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  createChapter,
  updateChapter,
  cekIdChapter,
  getChapter,
  detailChapter,
  deleteChapter,
} = require("./handler/chapter");
const { cekIdCourse } = require("./handler/course");

const chapter = express.Router();

chapter.post(
  "/",
  body("name").isString().notEmpty().withMessage("Nama Tidak Boleh Kosong"),
  body("course_id")
    .isInt()
    .withMessage("Kesalahan Format")
    .notEmpty()
    .withMessage("Course id tidak boleh kosong"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const idCourse = +req.body.course_id;

    const cekId = await cekIdCourse(idCourse);

    if (!cekId) {
      return res.status(404).json({
        status: "error",
        message: "Course Tidak Ada",
      });
    }

    const dataChapter = await createChapter(req.body);

    return res.status(201).json({
      status: "success",
      data: dataChapter,
    });
  }
);

chapter.put(
  "/:id",
  body("name").isString().withMessage("nama masukan string").optional(),
  body("course_id").isInt().withMessage("isi dengan angka").optional(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const id = +req.params.id;
    const dataUpdate = req.body;
    const courseId = dataUpdate.course_id;

    const cekChapter = await cekIdChapter(id);

    if (!cekChapter) {
      return res.status(404).json({
        status: "error",
        message: "Chapter tidak tersedia",
      });
    }

    if (courseId) {
      const cekCourse = await cekIdCourse(courseId);
      if (!cekCourse) {
        return res.status(404).json({
          status: "error",
          message: "Course tidak tersedia",
        });
      }
    }

    try {
      const data = await updateChapter(id, dataUpdate);

      return res.status(200).json({
        status: "success",
        data,
      });
    } catch (e) {
      return res.status(400).json({
        status: "error",
        message: "Data Gagal di perbarui",
      });
    }
  }
);

chapter.get("/", async (req, res) => {
  const courseId = +req.query.course_id;

  const chapter = await getChapter(courseId);

  return res.status(200).json({
    status: "success",
    data: chapter,
  });
});

chapter.get("/:id", async (req, res) => {
  const chapterId = +req.params.id;

  try {
    const dataChapter = await detailChapter(chapterId);

    return res.status(200).json({
      status: "success",
      data: dataChapter,
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Terjadi kesalahan, detail chapter gagal ditampilkan",
    });
  }
});

chapter.delete("/:id", async (req, res) => {
  const chapterId = +req.params.id;

  try {
    const cekChapter = await cekIdChapter(chapterId);

    if (!cekChapter) {
      return res.status(400).json({
        status: "error",
        message: "Chapter tidak ada",
      });
    }

    await deleteChapter(chapterId);

    return res.status(200).json({
      status: "success",
      message: "Chapter berhasil dihapus",
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Gagal menghapus chapter",
    });
  }
});

module.exports = chapter;
