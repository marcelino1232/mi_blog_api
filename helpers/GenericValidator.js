const validator = require("validator");

const validarArticle = (params) => {
  let status = true;
  try {
    let validar_title =
      !validator.isEmpty(params.title) &&
      validator.isLength(params.title, { min: 5, max: 50 });

    let validar_context =
      !validator.isEmpty(params.context) &&
      validator.isLength(params.context, { min: 5, max: 200 });

    if (!validar_title || !validar_context) {
      throw new Error("No se ha validado la informacion");
    }
    return status;
  } catch (error) {
    return !status;
  }
};

module.exports = {
  validarArticle,
};
