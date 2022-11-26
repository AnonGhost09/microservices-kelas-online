const bycrpt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
  };

  const validate = v.validate(req.body, schema); //untuk validation

  if (validate.length > 0) {
    //jika panjangnya tidak sama dengan 0 maka ada error
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(409).json({
        //409 artinya ada conflict, emailnya sudah ada di dataase / tidak oleh double
        status: "error",
        message: "Email Telah Terdaftar",
      });
    }
  } catch (e) {
    return res.status(404).json({
      status: "error",
      message: e,
    });
  }

  //bisa tidak pakai try catch.. tp lebih baik pakai try catch

  const password = await bycrpt.hash(req.body.password, 10);

  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: "student",
  };

  const createUser = await User.create(data);

  return res.status(200).json({
    status: "success",
    data: {
      id: createUser.id,
    },
  });
};
