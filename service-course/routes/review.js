const { default: axios } = require("axios");
const express = require("express");
const { body, validationResult } = require("express-validator");
const { getUser } = require("../utils/users/serviceUser");
const { cekIdCourse } = require("./handler/course");
const {
  createReview,
  cekReview,
  cekIdReview,
  updateReview,
} = require("./handler/review");
const deleteReview = require("./handler/review/deleteReview");
const review = express.Router();

review.post(
  "/",
  body("user_id").isInt().notEmpty(),
  body("course_id").isInt().notEmpty(),
  body("rating").isInt({ min: 1, max: 5 }).notEmpty(),
  body("note").isString().optional(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const { user_id: userId, course_id: courseId } = req.body;

    const [user, course, review] = await Promise.all([
      getUser(userId),
      cekIdCourse(courseId),
      cekReview({ userId, courseId }),
    ]);

    if (user.status === "error") {
      return res.status(user.http_code).json({
        status: user.status,
        message: user.message,
      });
    }

    if (!course) {
      return res.status(404).json({
        status: "error",
        message: "Course tidak ada",
      });
    }

    if (review) {
      return res.status(409).json({
        status: "error",
        message: "Review sudah ada",
      });
    }

    const dataReview = await createReview(req.body);

    return res.status(201).json({
      status: "success",
      data: dataReview,
    });
  }
);

review.put(
  "/:id",
  body("rating").isInt({ min: 1, max: 5 }),
  body("note").isString(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const id = +req.params.id;

    const cekReview = await cekIdReview(id);

    if (!cekReview) {
      return res.status(400).json({
        status: "error",
        message: "Review tidak ada",
      });
    }

    const data = req.body;
    try {
      const review = await updateReview(id, data);

      return res.status(200).json({
        status: "success",
        data: review,
      });
    } catch (e) {
      return res.status(200).json({
        status: "error",
        message: "data gagal diupdate",
      });
    }
  }
);

review.delete("/:id", async (req, res) => {
  const id = +req.params.id;

  const reviewId = await cekIdReview(id);

  if (!reviewId) {
    return res.status(404).json({
      status: "error",
      message: "Review tidak ada",
    });
  }

  try {
    await deleteReview(id);

    return res.status(200).json({
      status: "success",
      message: "Review telah terhapus",
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Review gagal dihapus",
    });
  }
});

review.get("/:id", async (req, res) => {
  const id = +req.params.id;

  if (!Boolean(id)) {
    //cek apakah paramsnya integer atau bukan
    return res.status(400).json({
      status: "error",
      message: "Params harus integer",
    });
  }

  try {
    const review = await cekIdReview(id);

    if (!review) {
      return res.status(404).json({
        status: "error",
        message: "Review tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "success",
      data: review,
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Terdapat kesalahan",
    });
  }
});

module.exports = review;
