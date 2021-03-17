import Joi from 'joi';

const userPutSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().email().required(),
  password: Joi.string()
    .regex(/([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)/)
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

const userPostSchema = Joi.object({
  login: Joi.string().email().required(),
  password: Joi.string()
    .regex(/([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)/)
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

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

export { userPutSchema, userPostSchema, validateSchema };
