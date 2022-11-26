const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    email: "email|empty:false",
    password: "string|min:6",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    //jika ada error
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    //jika email tidak ada
    return res.status(404).json({
      status: "error",
      message: "user not found!",
    });
  }

  const isValidPassowrd = await bcrypt.compare(
    req.body.password,
    user.password
  );

  //cek password dengan yang ada di database
  if (!isValidPassowrd) {
    //jika password salah
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  //ambil semua datanya
  res.json({
    status: "success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      profession: user.profession,
    },
  });
};
