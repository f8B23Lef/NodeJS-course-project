import Joi from 'joi';

const authSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export default authSchema;
