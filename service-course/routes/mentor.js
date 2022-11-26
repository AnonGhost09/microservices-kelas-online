const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  createMentor,
  cekEmailMentor,
  updateMentor,
  cekIdMentor,
  getMentor,
  detailMentor,
  deleteMentor,
} = require("./handler/mentor");

const mentor = express.Router();

mentor.post(
  "/",
  body("name").isString().notEmpty(),
  body("email")
    .isEmail()
    .withMessage("Isi dengan email")
    .notEmpty()
    .withMessage("Email Tidak Boleh Kosong")
    .custom(value => {
      return cekEmailMentor(value).then(email => {
        if (email) {
          return Promise.reject("Email already taken");
        }
      });
    }),
  body("profile").isURL().notEmpty().withMessage("Profile Tidak Boleh Kosong"),
  body("profession").isString().optional(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    try {
      const dataMentor = await createMentor(req.body);
      return res.status(201).json({
        status: "success",
        data: dataMentor,
      });
    } catch (e) {
      return res.status(400).json({
        status: "error",
        message: "Data gagal dimasukan",
      });
    }
  }
);

mentor.put(
  "/:id",
  body("name").isString().notEmpty().withMessage("Nama Tidak Boleh Kosong"),
  body("email").isEmail().notEmpty().withMessage("Email Tidak Boleh Kosong"),
  body("profile").isURL().notEmpty().withMessage("Profile Tidak Boleh Kosong"),
  body("profession")
    .isString()
    .notEmpty()
    .withMessage("profession Tidak Boleh Kosong"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const id = +req.params.id;
    const email = req.body.email;
    const dataUpdate = req.body;

    const cekId = await cekIdMentor(id);

    if (!cekId) {
      return res.status(404).json({
        status: "error",
        message: "Mentor tidak ditemukan",
      });
    }

    //cek apakah email yang diparams sama dengan di body
    if (cekId.email !== email) {
      const cekEmail = await cekEmailMentor(email); //cek apakah email yang mau diganti sudah terdaftar atau belum... kalo sudah maka response error
      if (cekEmail) {
        return res.status(409).json({
          status: "error",
          message: "Email Sudah Terdaftar",
        });
      }
    }

    const update = await updateMentor(id, dataUpdate);

    return res.status(200).json({
      status: "success",
      data: update,
    });
  }
);

mentor.get("/", async (req, res) => {
  try {
    const dataMentor = await getMentor();

    return res.status(200).json({
      status: "success",
      data: dataMentor,
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Data gagal ditampilkan",
    });
  }
});

mentor.get("/:id", async (req, res) => {
  const id = +req.params.id; //rubah dulu ke integer
  if (!Boolean(id)) {
    return res.status(400).json({
      status: "error",
      message: "Id harus integer",
    });
  }
  const dataMentor = await detailMentor(id);

  return res.status(200).json({
    status: "success",
    data: dataMentor,
  });
});

mentor.delete("/:id", async (req, res) => {
  try {
    const id = +req.params.id;

    const cekMentor = await cekIdMentor(id);

    if (!cekMentor) {
      return res.status(404).json({
        status: "error",
        message: "Mentor tidak ditemukan",
      });
    }
    await deleteMentor(id);

    return res.status(200).json({
      status: "success",
      message: "Data berhasil dihapus",
    });
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Data gagal dihapus",
    });
  }
});

module.exports = mentor;
