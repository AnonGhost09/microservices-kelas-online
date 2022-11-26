const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const fs = require("fs");

const { Media } = require("../models");

router.get("/", async (req, res) => {
  const media = await Media.findAll({ attributes: ["id", "image"] });

  const mappedMedia = media.map(m => {
    //agar ada localhostnya tidak hanya nama image
    m.image = `${req.get("host")}/images/${m.image}`;
    return m;
  });

  return res.status(200).json({
    status: "success",
    data: mappedMedia,
  });
});

router.post("/", (req, res) => {
  const image = req.body.image;

  //mimeRequired artinya base64 ini harus mengandung  mime... (data:image/png) ini namanya mime
  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({
      status: "error",
      message: "invalid base64",
    });
  }

  //Date.now()adalah naama filenya
  base64Img.img(
    image,
    "./public/images",
    "DIPA" + Date.now(),
    async (err, filepath) => {
      if (err) {
        return res.status(400).json({ status: "error", message: err.message });
      }

      const fileName = filepath.split("\\").pop().split("/").pop(); //mengambil nama file nya
      console.log(filepath);

      const media = await Media.create({
        image: fileName,
      });

      return res.json({
        //req.get('host') mengambil host kita yaitu localhist:port
        status: "success",
        data: {
          id: media.id,
          image: `${req.get("host")}/images/${fileName}`, //tidak pakai public/images karena public itu sudah diluar jadi langsung saja ke foldernyas
        },
      });
    }
  );
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const media = await Media.findByPk(id);

  if (!media) {
    return res.status(404).json({
      status: "Error",
      message: "Media Not Found",
    });
  }
  //untuk menghapus imagesnya
  fs.unlink(`./public/images/${media.image}`, async err => {
    if (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }

    await media.destroy();

    return res.json({ status: "success", message: "image deleted" });
  });
});
module.exports = router;
