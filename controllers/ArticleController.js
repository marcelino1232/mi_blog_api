const Article = require("../models/Article");
const StatusCode = require("../helpers/StatusCode");
const { validarArticle } = require("../helpers/GenericValidator");
const fs = require("fs");
const path = require("path");
const { error } = require("console");

const getAll = (req, res) => {
  let consulta = Article.find({});
  //consulta.limit(3);
  consulta
    .sort({ Date: -1 })
    .exec()
    .then((articles) =>
      !articles ? StatusCode(res, 400) : StatusCode(res, 200, articles)
    )
    .catch((error) => StatusCode(res, 500));
};

const getById = (req, res) => {
  let id = req.params.id;
  Article.findById(id)
    .then((article) =>
      !article ? StatusCode(res, 404) : StatusCode(res, 200, article)
    )
    .catch((error) => StatusCode(res, 500));
};

const create = (req, res) => {
  let params = req.body;

  if (!validarArticle(params)) {
    return StatusCode(res, 400);
  }

  const article = new Article(params);

  article
    .save()
    .then((articleGuardado) =>
      !articleGuardado
        ? StatusCode(res, 500, null, "No se ha guardado el article")
        : StatusCode(res, 200, articleGuardado, true)
    )
    .catch((error) => StatusCode(res, 500));
};

const update = (req, res) => {
  let id = req.params.id;

  let params = req.body;

  if (!validarArticle(params)) {
    return StatusCode(res, 400);
  }

  Article.findOneAndUpdate({ _id: id }, params, { new: true })
    .then((articleUpdate) =>
      !articleUpdate
        ? StatusCode(res, 500, null, "No se ha actualizado con exito!!")
        : StatusCode(res, 200, articleUpdate, true)
    )
    .catch((error) => StatusCode(res, 500));
};

const remove = (req, res) => {
  let id = req.params.id;

  Article.findOneAndDelete({ _id: id })
    .exec()
    .then((articleBorrado) =>
      !articleBorrado
        ? StatusCode(res, 500, null, "No se puedo Borrar el article")
        : StatusCode(res, 200, articleBorrado, true)
    )
    .catch((error) => StatusCode(res, 500));
};

const upload = (req, res) => {
  if (!req.file && !req.files) {
    return StatusCode(res, 404, null, "Peticion invalida");
  }

  let archivo = req.file.originalname;

  let archivo_split = archivo.split(".");

  let archivo_extension = archivo_split[1];

  if (
    archivo_extension != "png" &&
    archivo_extension != "jpg" &&
    archivo_extension != "jpeg" &&
    archivo_extension != "gif"
  ) {
    fs.unlink(req.file.path, (error) => {
      return StatusCode(res, 400, null, "Imagen invalida");
    });
  } else {
    let id = req.params.id;

    Article.findOneAndUpdate(
      { _id: id },
      { imagen: req.file.filename },
      { new: true }
    )
      .then((articleUpdate) =>
        !articleUpdate
          ? StatusCode(res, 500, null, "No se ha actualizado con exito!!")
          : StatusCode(res, 200, articleUpdate, true)
      )
      .catch((error) => StatusCode(res, 500));
  }
};

const imagen = (req, res) => {
  let fichero = req.params.fichero;
  let ruta_fisica = "./imagenes/articles/" + fichero;
  fs.stat(ruta_fisica, (error, existe) => {
    if (existe) {
      return res.sendFile(path.resolve(ruta_fisica));
    } else {
      return StatusCode(res, 404);
    }
  });
};

const buscardor = (req, res) => {
  let busqueda = req.params.busqueda;

  Article.find({
    $or: [
      { title: { $regex: busqueda, $options: "i" } },
      { context: { $regex: busqueda, $options: "i" } },
    ],
  })
    .sort({ Date: -1 })
    .exec()
    .then((articles) =>
      !articles || articles.length <= 0 ? StatusCode(res, 404) : StatusCode(res, 200, articles)
    )
    .catch((error) => StatusCode(res, 500));
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  upload,
  imagen,
  buscardor,
};
