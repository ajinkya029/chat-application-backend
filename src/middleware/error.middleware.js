const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A record with that value already exists."
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map((e) => e.message).join(", ")
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error."
  });
};

module.exports = errorHandler;
