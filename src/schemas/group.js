import Joi from 'joi';

const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array()
    .items(
      Joi.string()
        .valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
        .required(),
    )
    .required(),
});

const addUsersToGroupSchema = Joi.object({
  userIds: Joi.array().items(Joi.number().integer().required()).required(),
});

export { groupSchema, addUsersToGroupSchema };
