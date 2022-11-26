const axios = require("axios").default;
const express = require("express");
const { body, validationResult } = require("express-validator");
const { getUser } = require("../utils/users/serviceUser");
const { cekIdChapter } = require("./handler/chapter");
const {
  createLesson,
  cekIdLesson,
  updateLesson,
  getLesson,
  detailLesson,
  deleteLesson,
} = require("./handler/lesson");

const lesson = express.Router();

lesson.post(
  "/",
  body("name").isString().notEmpty().withMessage("Nama tidak boleh kosong"),
  body("video").isString().notEmpty().withMessage("Video tidak boleh kosong"),
  body("chapter_id")
    .isInt()
    .notEmpty()
    .withMessage("course_id tidak boleh kosong"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const id = req.body.chapter_id;
    const data = req.body;
    const chapterId = await cekIdChapter(id);

    if (!chapterId) {
      return res.status(404).json({
        status: "error",
        message: "Chapter tidak ada",
      });
    }

    console.log(data);

    try {
      const lesson = await createLesson(data);

      return res.status(201).json({
        status: "success",
        data: lesson,
      });
    } catch (e) {
      return res.status(400).json({
        status: "error",
        message: "Data gagal ditambahkan",
      });
    }
  }
);

lesson.put(
  "/:id",
  body("name").isString(),
  body("video").isString().notEmpty(),
  body("chapter_id").isInt().notEmpty(),
  async (req, res) => {
    const id = +req.params.id;
    const data = req.body;

    try {
      const cekLesson = await cekIdLesson(id);

      if (!cekLesson) {
        return res.status(404).json({
          status: "error",
          message: "Lesson tidak ada",
        });
      }

      const cekChapter = await cekIdChapter(data.chapter_id);

      if (!cekChapter) {
        return res.status(404).json({
          status: "error",
          message: "Chapter tidak ada",
        });
      }

      const updateData = await updateLesson(id, data);

      return res.status(200).json({
        status: "success",
        data: updateData,
      });
    } catch (e) {
      return res.status(404).json({
        status: "error",
        message: "Lesson gagal diupdate",
      });
    }
  }
);

lesson.get("/", async (req, res) => {
  const chapterId = req.query.chapter_id;

  try {
    const dataLesson = await getLesson(chapterId);

    return res.status(200).json({
      status: "success",
      data: dataLesson,
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Lesson gagal ditampilkan",
    });
  }
});

lesson.get("/:id", async (req, res) => {
  const id = +req.params.id;

  const user = await axios.get("http://localhost:5000/users");

  console.log("ini user", user.data);

  if (isNaN(id)) {
    return res.status(400).json({
      status: "error",
      message: "Format bukan int",
    });
  }

  try {
    const dataLesson = await detailLesson(id);

    return res.status(200).json({
      status: "success",
      data: dataLesson,
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Detail lesson gagal ditampilkan",
    });
  }
});

lesson.delete("/:id", async (req, res) => {
  const id = +req.params.id;

  try {
    const cekLesson = await cekIdLesson(id);

    if (!cekLesson) {
      return res.status(400).json({
        status: "error",
        message: "Data lesson tidak ada",
      });
    }

    await deleteLesson(id);

    return res.status(200).json({
      status: "success",
      message: "Lesson sudah terhapus",
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Lesson gagal dihapus",
    });
  }
});

module.exports = lesson;
