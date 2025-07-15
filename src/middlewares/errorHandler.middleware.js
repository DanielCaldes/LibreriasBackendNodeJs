function errorHandler(err, req, res, next) {  
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Error de validación',
      details: err.details.map(detail => detail.message)
    });
  }

  console.error(err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
}

module.exports = errorHandler;