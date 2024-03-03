const StatusCode = (res, status, response = null, message = null) => {
  if (status === 200) {
    if (message === null) {
      return res.status(200).json({
        status: "success",
        data: response,
      });
    }
    return res.status(200).json({
      status: "success",
      data: response,
      message: typeof message === "boolean" ? "Se ha Realizado la transacion con exito!!" : message,
    });
  }

  if (status === 400) {
    return res.status(400).json({
      status: "error",
      message: message === null ? "Faltan datos por enviar" : message,
    });
  }

  if (status === 404) {
    return res.status(404).json({
      status: "error",
      message:  message === null ? "El Recurso solicitado no fue encontrado": message,
    });
  }

  if (status === 500) {
    return res.status(500).json({
      status: "error",
      message: message === null ? "Problema en el servidor" : message,
    });
  }
};

module.exports = StatusCode;
