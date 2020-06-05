// User Validation
const Joi = require("@hapi/joi");

// Register validation

exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
exports.forgetPasswordValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
exports.resetPasswordValidation = (data) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
