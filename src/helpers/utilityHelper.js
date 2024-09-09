const errorResponseHelper = (res, error, code = 400) => {
  console.log("@Error-Response-Log", error);
  res.status(200).json({
    success: false,
    error: {
      code: code,
      message: error?.message || error?.error || "Bad Request",
      description: error?.message || "Bad Request!",
    },
  });
};

const serverErrorHelper = (res, error, code = 500) => {
  console.log("@Server-Error-Log:", error);
  res.status(200).json({
    success: false,
    error: {
      message: "Internal Server Error!",
      code: error?.code || code,
      description: error?.message || error?.error || "Internal Server Error!",
    },
  });
};

const successResponseHelper = (res, data) => {
  res.status(200).json({
    success: true,
    data,
  });
};

export { errorResponseHelper, successResponseHelper, serverErrorHelper };
