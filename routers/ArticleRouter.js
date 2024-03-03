const { Router } = require("express");
const router = Router();

const multer = require("multer");

const almacenamiento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imagenes/articles/");
  },
  filename: function (req, file, cb) {
    cb(null, "article" + Date.now() + file.originalname);
  },
});

const subidas = multer({ storage: almacenamiento });

const {
  getAll,
  getById,
  create,
  remove,
  update,
  upload,
  imagen,
  buscardor,
} = require("../controllers/ArticleController");

// ruta util

router.get("/articles", getAll);
router.get("/articles/:id", getById);
router.post("/articles/create", create);
router.put("/articles/:id", update);
router.delete("/articles/:id", remove);
router.post("/upload-imagen/:id", [subidas.single("file0")], upload);
router.get("/imagen/:fichero", imagen);
router.get("/buscar/:busqueda", buscardor);


module.exports = router;
