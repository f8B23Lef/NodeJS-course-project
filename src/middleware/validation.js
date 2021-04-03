function validateSchema(schema, isBody = true) {
  return (req, res, next) => {
    const validationParam = isBody ? req.body : req.query;
    const { error } = schema.validate(validationParam, {
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

export default validateSchema;
