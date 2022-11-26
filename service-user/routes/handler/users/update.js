const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
    avatar: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  //cek user apakah ada di database apakah tidak.. agar tidak update asal2an
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (!user) {
    //jika user tidak ada
    return res.status(404).json({
      status: "error",
      message: "User Not Found",
    });
  }

  // cek apakah emailnya duplikat
  const email = req.body.email;
  console.log(email);

  if (email) {
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail && email !== user.email) {
      //cek,jika checkEmail true maka akan dilakukan cek email yang dimasukan apakah sama dengan email yang ada didatabase, jika sama maka akan lanjut, jika tidak sama berarti ada email yang sudah ada di database
      return res.status(409).json({
        status: "error",
        message: "Email Already Exist",
      });
    }
  }

  const password = await bcrypt.hash(req.body.password, 10);
  const { name, profession, avatar } = req.body;

  await user.update({
    //mengambil dari primary keynya
    email,
    password,
    name,
    profession,
    avatar,
  });

  return res.status(200).json({
    status: "success",
    data: {
      id: user.id,
      name,
      email,
      profession,
      avatar,
    },
  });
};
