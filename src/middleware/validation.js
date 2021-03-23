function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({
        errors: error.details.map(({ path, message }) => ({ path, message })),
      });
    } else {
      next();
    }
  };
}

function validateUserQuery(req, res, next) {
  if (
    !req.query.hasOwnProperty('loginSubstring') ||
    !req.query.hasOwnProperty('limit')
  ) {
    res.status(400).json({
      message:
        'To see a list of autosuggested users you must provide ' +
        "'loginSubstring' and 'limit' query params. " +
        "For example: '/users?loginSubstring=abc&limit=5'",
    });
  } else {
    next();
  }
}

export { validateSchema, validateUserQuery };
