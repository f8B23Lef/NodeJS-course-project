import Joi from 'joi';

const userPutSchema = Joi.object({
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

const userGetAutosuggestSchema = Joi.object({
  loginSubstring: Joi.string().required(),
  limit: Joi.number().integer().min(1).required(),
});

export { userPutSchema, userPostSchema, userGetAutosuggestSchema };
