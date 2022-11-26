const express = require("express");
const {
  createCourse,
  cekIdCourse,
  updateCourse,
  getCourse,
  deleteCourse,
  getReviewMyCourse,
} = require("./handler/course");
const { cekIdMentor } = require("./handler/mentor");
const { body, validationResult } = require("express-validator");
const { getUserByIds } = require("../utils/users/serviceUser");

const course = express.Router();

course.get("/:id", async (req, res) => {
  const id = +req.params.id;

  if (!Boolean(id)) {
    return res.status(400).json({
      status: "error",
      message: "Parameter harus integer",
    });
  }

  const course = await getReviewMyCourse(id);

  if (!course) {
    return res.status(400).json({
      status: "error",
      message: "Course tidak ada",
    });
  }

  course.total_student = course._count.myCourse;
  delete course._count;

  const userIds = course.review.map(value => value.user_id);

  const users = await getUserByIds(userIds);

  let total = 0;
  for (data of course.chapter) {
    total += data.lesson.length;
  }

  course.total_lesson = total;

  if (users.status === "error") {
    course.review = [];
  } else {
    course.review = course.review.map(value => {
      return {
        ...value,
        users: users.data.data.find(user => user.id === value.user_id),
      };
    });
  }

  return res.status(200).json({
    status: "success",
    data: course,
  });
});

course.post(
  "/",
  body("name").isString().notEmpty().withMessage("Tidak boleh kosong"),
  body("certificate").isBoolean().notEmpty().withMessage("Tidak boleh kosong"),
  body("thumbnail").isString().isURL().withMessage("harus url").optional(),
  body("type")
    .isIn(["FREE", "PREMIUM"])
    .notEmpty()
    .withMessage("Tidak boleh kosong"),
  body("status")
    .isIn(["DRAFT", "PUBLISHED"])
    .notEmpty()
    .withMessage("Tidak boleh kosong"),
  body("price").isInt().withMessage("isi dengan integer").optional(),
  body("level")
    .isIn(["ALL-LEVEL", "BEGINNER", "INTERMEDIATE", "ADVANCE"])
    .notEmpty()
    .withMessage("Tidak boleh kosong"),
  body("description").isString().optional(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const data = req.body;
    const idMentor = req.body.mentor_id;

    try {
      const cekMentor = await cekIdMentor(idMentor);

      if (!cekMentor) {
        return res.status(404).json({
          status: "error",
          message: "Mentor Not Found",
        });
      }

      const dataCourse = await createCourse(data);

      return res.status(201).json({
        status: "success",
        data: dataCourse,
      });
    } catch (e) {
      return res.status(400).json({
        status: "error",
        message: "Gagal membuat course",
      });
    }
  }
);

course.put(
  "/:id",
  body("name").isString().optional(),
  body("certificate").isBoolean().optional(),
  body("thumbnail").isString().isURL().optional(),
  body("type").isIn(["FREE", "PREMIUM"]).optional(),
  body("status").isIn(["DRAFT", "PUBLISHED"]).optional(),
  body("price").isInt().optional(),
  body("level")
    .isIn(["ALL-LEVEL", "BEGINNER", "INTERMEDIATE", "ADVANCE"])
    .optional(),
  body("description").isString().optional(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const id = +req.params.id;

    const cekId = await cekIdCourse(id);

    if (!cekId) {
      return res.status(404).json({
        statu: "error",
        message: "Course tidak ditemukan",
      });
    }

    const mentorId = +req.body.mentor_id;

    if (mentorId) {
      const mentor = await cekIdMentor(mentorId);
      if (!mentor) {
        return res.status(404).json({
          status: "error",
          message: "Mentor tidak ditemukan",
        });
      }
    }

    const updatedData = req.body;

    try {
      const dataCourse = await updateCourse(id, updatedData);

      return res.status(201).json({
        status: "success",
        data: dataCourse,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        status: "error",
        message: "Course gagal di update",
      });
    }
  }
);

course.get("/", async (req, res) => {
  const currentPage = req.query.page;
  const limitPage = req.query.limit;
  const searchName = req.query.q;
  const searchStatus = req.query.status;

  try {
    const dataCourse = await getCourse(
      +currentPage,
      +limitPage,
      searchName,
      searchStatus
    );

    return res.status(200).json({
      status: "success",
      data: dataCourse,
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Data Gagal Ditampilkan",
    });
  }
});

course.delete("/:id", async (req, res) => {
  const id = +req.params.id;

  try {
    const cekId = await cekIdCourse(id);

    if (!cekId) {
      return res.status(404).json({
        status: "error",
        message: "Course Tidak Ada",
      });
    }

    await deleteCourse(id);

    return res.status(200).json({
      status: "success",
      message: "Data Course Berhasil Dihapus",
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Data Gagal Dihapus",
    });
  }
});
module.exports = course;
